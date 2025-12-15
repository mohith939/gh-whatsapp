// Google Apps Script Code for handling form submissions
// Instructions:
// 1. Create a new Google Sheet
// 2. Add three tabs: "BulkInquiries", "Contacts", "Newsletter"
// 3. Go to Extensions > Apps Script
// 4. Replace the default code with this script
// 5. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 6. Copy the deployment URL and use it in your frontend forms

function doPost(e) {
  try {
    let data = {};

    // Log the incoming request for debugging
    console.log('Received request:', JSON.stringify(e));

    // Handle raw POST data (FormData sent as multipart/form-data)
    if (e.postData && e.postData.contents) {
      // Parse as multipart form data
      const contentType = e.postData.type || '';
      const boundaryMatch = contentType.match(/boundary=(.+)/);
      if (boundaryMatch) {
        // Multipart form data
        const boundary = boundaryMatch[1];
        const parts = e.postData.contents.split('--' + boundary);
        for (let part of parts) {
          if (part.includes('Content-Disposition: form-data;')) {
            const nameMatch = part.match(/name="([^"]+)"/);
            if (nameMatch) {
              const name = nameMatch[1];
              const value = part.split('\r\n\r\n')[1]?.replace(/\r\n$/, '') || '';
              try {
                data[name] = JSON.parse(value);
              } catch {
                data[name] = value;
              }
            }
          }
        }
      } else {
        // Try URL-encoded format
        const params = e.postData.contents.split('&');
        for (let param of params) {
          const [key, value] = param.split('=');
          const decodedKey = decodeURIComponent(key);
          const decodedValue = decodeURIComponent(value || '');
          try {
            data[decodedKey] = JSON.parse(decodedValue);
          } catch {
            data[decodedKey] = decodedValue;
          }
        }
      }
    }
    // Fallback to e.parameter
    else if (e.parameter) {
      for (let key in e.parameter) {
        const value = e.parameter[key];
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    } else {
      throw new Error('No data received');
    }

    console.log('Parsed data:', JSON.stringify(data));

    const formType = data.formType;

    // Get the spreadsheet (single spreadsheet with multiple sheets)
    const spreadsheetId = '13Buw80Q0feQAQ2beSCEZs1S6SmL081T9EJzs24ffjjA';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    let sheet;
    let emailSubject;
    let emailBody;

    switch(formType) {
      case 'bulk_inquiry':
        sheet = spreadsheet.getSheetByName('BulkInquiries');
        if (!sheet) {
          sheet = spreadsheet.insertSheet('BulkInquiries');
          // Add headers
          sheet.appendRow(['Timestamp', 'Name', 'Business Name', 'Phone', 'Email', 'Location', 'Products Required', 'Quantity', 'Frequency', 'Notes']);
        }
        emailSubject = 'New Bulk Inquiry Received';
        emailBody = generateBulkInquiryEmail(data);
        break;

      case 'contact':
        sheet = spreadsheet.getSheetByName('Contacts');
        if (!sheet) {
          sheet = spreadsheet.insertSheet('Contacts');
          // Add headers
          sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message']);
        }
        emailSubject = 'New Contact Form Submission';
        emailBody = generateContactEmail(data);
        break;

      case 'newsletter':
        sheet = spreadsheet.getSheetByName('Newsletter');
        if (!sheet) {
          sheet = spreadsheet.insertSheet('Newsletter');
          // Add headers
          sheet.appendRow(['Timestamp', 'Email', 'Name']);
        }
        emailSubject = 'New Newsletter Subscription';
        emailBody = generateNewsletterEmail(data);
        break;

      case 'order':
        sheet = spreadsheet.getSheetByName('Orders');
        if (!sheet) {
          sheet = spreadsheet.insertSheet('Orders');
          // Add headers
          sheet.appendRow(['Timestamp', 'Order ID', 'Customer Name', 'Phone', 'Email', 'Address Line 1', 'Address Line 2', 'City', 'State', 'Pincode', 'Order Notes', 'Items', 'Subtotal', 'Shipping Charge', 'Total', 'Payment Method', 'Order Status']);
        }
        emailSubject = 'New Order Received';
        emailBody = generateOrderEmail(data);
        break;

      default:
        return ContentService
          .createTextOutput(JSON.stringify({success: false, error: 'Invalid form type'}))
          .setMimeType(ContentService.MimeType.JSON);
    }

    // Add timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Prepare row data based on form type
    let rowData;
    switch(formType) {
      case 'bulk_inquiry':
        rowData = [
          timestamp,
          data.name || '',
          data.businessName || '',
          data.phone || '',
          data.email || '',
          data.location || '',
          Array.isArray(data.productsRequired) ? data.productsRequired.join(', ') : '',
          data.quantity || '',
          data.frequency || '',
          data.notes || ''
        ];
        break;

      case 'contact':
        rowData = [
          timestamp,
          data.name || '',
          data.email || '',
          data.phone || '',
          data.subject || '',
          data.message || ''
        ];
        break;

      case 'newsletter':
        rowData = [
          timestamp,
          data.email || '',
          data.name || ''
        ];
        break;

      case 'order':
        const itemsString = Array.isArray(data.items)
          ? data.items.map(item => `${item.product_name} (${item.variant}) x${item.quantity} - ₹${item.price}`).join('; ')
          : '';

        rowData = [
          timestamp,
          data.orderId || '',
          data.customer_name || '',
          data.phone || '',
          data.email || '',
          data.address_line1 || '',
          data.address_line2 || '',
          data.city || '',
          data.state || '',
          data.pincode || '',
          data.order_notes || '',
          itemsString,
          data.subtotal || 0,
          data.shipping_charge || 0,
          data.total || 0,
          data.payment_method || '',
          data.order_status || ''
        ];
        break;
    }

    // Append to sheet
    sheet.appendRow(rowData);

    // Send email notification
    const recipientEmail = 'mailtrah939@gmail.com';
    try {
      MailApp.sendEmail({
        to: recipientEmail,
        subject: emailSubject,
        htmlBody: emailBody
      });
      console.log('Email sent successfully to:', recipientEmail);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue with success response even if email fails
      // This ensures the form submission still works
    }

    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Form submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing form submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml(input) {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeValue(value, fallback = 'N/A') {
  if (value === null || value === undefined) return fallback;
  return escapeHtml(value);
}

function sanitizeArray(arr) {
  if (!Array.isArray(arr)) return '';
  return arr.map(item => escapeHtml(item)).join(', ');
}

function generateBulkInquiryEmail(data) {
  return `
    <h2>New Bulk Inquiry Received</h2>
    <p><strong>Name:</strong> ${sanitizeValue(data.name, 'N/A')}</p>
    <p><strong>Business Name:</strong> ${sanitizeValue(data.businessName, 'N/A')}</p>
    <p><strong>Phone:</strong> ${sanitizeValue(data.phone, 'N/A')}</p>
    <p><strong>Email:</strong> ${sanitizeValue(data.email, 'N/A')}</p>
    <p><strong>Location:</strong> ${sanitizeValue(data.location, 'N/A')}</p>
    <p><strong>Products Required:</strong> ${sanitizeArray(data.productsRequired)}</p>
    <p><strong>Quantity:</strong> ${sanitizeValue(data.quantity, 'N/A')}</p>
    <p><strong>Frequency:</strong> ${sanitizeValue(data.frequency, 'N/A')}</p>
    <p><strong>Notes:</strong> ${sanitizeValue(data.notes || 'None', 'None')}</p>
    <hr>
    <p>Please respond within 2-4 hours as per our policy.</p>
  `;
}

function generateContactEmail(data) {
  const safeMessage = escapeHtml((data.message || 'N/A')).replace(/\n/g, '<br>');
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitizeValue(data.name, 'N/A')}</p>
    <p><strong>Email:</strong> ${sanitizeValue(data.email, 'N/A')}</p>
    <p><strong>Phone:</strong> ${sanitizeValue(data.phone, 'N/A')}</p>
    <p><strong>Subject:</strong> ${sanitizeValue(data.subject, 'N/A')}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
    <hr>
    <p>Please respond within 24 hours as per our policy.</p>
  `;
}

function generateNewsletterEmail(data) {
  return `
    <h2>New Newsletter Subscription</h2>
    <p><strong>Email:</strong> ${sanitizeValue(data.email, 'N/A')}</p>
    <p><strong>Name:</strong> ${sanitizeValue(data.name, 'Not provided')}</p>
    <hr>
    <p>New subscriber added to the newsletter list.</p>
  `;
}

function generateOrderEmail(data) {
  const itemsList = Array.isArray(data.items)
    ? data.items.map(item => `${escapeHtml(item.product_name)} (${escapeHtml(item.variant)}) x${escapeHtml(item.quantity)} - ₹${escapeHtml(item.price)}`).join('<br>')
    : 'No items';

  return `
    <h2>New Order Received</h2>
    <p><strong>Order ID:</strong> ${sanitizeValue(data.orderId, 'N/A')}</p>
    <p><strong>Customer Name:</strong> ${sanitizeValue(data.customer_name, 'N/A')}</p>
    <p><strong>Phone:</strong> ${sanitizeValue(data.phone, 'N/A')}</p>
    <p><strong>Email:</strong> ${sanitizeValue(data.email, 'N/A')}</p>
    <p><strong>Address:</strong><br>
    ${sanitizeValue(data.address_line1, '')}${data.address_line2 ? '<br>' + sanitizeValue(data.address_line2, '') : ''}<br>
    ${sanitizeValue(data.city, '')}, ${sanitizeValue(data.state, '')} - ${sanitizeValue(data.pincode, '')}</p>
    <p><strong>Order Notes:</strong> ${sanitizeValue(data.order_notes || 'None', 'None')}</p>
    <p><strong>Items:</strong><br>${itemsList}</p>
    <p><strong>Subtotal:</strong> ₹${sanitizeValue(data.subtotal, '0')}</p>
    <p><strong>Shipping Charge:</strong> ₹${sanitizeValue(data.shipping_charge, '0')}</p>
    <p><strong>Total:</strong> ₹${sanitizeValue(data.total, '0')}</p>
    <p><strong>Payment Method:</strong> ${sanitizeValue(data.payment_method, 'N/A')}</p>
    <p><strong>Order Status:</strong> ${sanitizeValue(data.order_status, 'N/A')}</p>
    <hr>
    <p>Please process this order promptly.</p>
  `;
}
