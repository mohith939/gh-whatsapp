// Form submission utility for Google Apps Script integration
// Replace this URL with your deployed Google Apps Script web app URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySRQ1IkYVK8Adf34vDjYOk4_iNstXo7tcrL4kXSKsFLH_tYpWBOTLNpv2OLaNd9iYm/exec';

export interface FormSubmissionData {
  formType: 'bulk_inquiry' | 'contact' | 'newsletter';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  businessName?: string;
  location?: string;
  productsRequired?: string[];
  quantity?: string;
  frequency?: string;
  notes?: string;
}

export const submitFormXHR = async (data: FormSubmissionData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Convert data to URL-encoded format for Google Apps Script compatibility
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.append(key, JSON.stringify(value)); // Convert arrays to JSON strings
      } else {
        params.append(key, String(value));
      }
    });

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      signal: controller.signal,
      // Remove mode: 'cors' as Google Apps Script doesn't support CORS
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Form submission error:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      // Try JSONP fallback for timeout
      return new Promise((resolve) => {
        submitFormJSONP(data, (result) => {
          resolve(result);
        });
      });
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
};

// Alternative submission method using JSONP for CORS issues
export const submitFormJSONP = (data: FormSubmissionData, callback: (result: { success: boolean; error?: string }) => void) => {
  const script = document.createElement('script');
  const callbackName = 'formSubmissionCallback_' + Date.now();

  // Create global callback function
  (window as any)[callbackName] = (result: any) => {
    callback(result);
    // Clean up
    delete (window as any)[callbackName];
    document.body.removeChild(script);
  };

  // Build URL with data
  const params = new URLSearchParams({
    callback: callbackName,
    data: JSON.stringify(data)
  });

  script.src = `${GOOGLE_APPS_SCRIPT_URL}?${params}`;
  script.onerror = () => {
    callback({ success: false, error: 'Script loading failed' });
    document.body.removeChild(script);
  };

  document.body.appendChild(script);
};
