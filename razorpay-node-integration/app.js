const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Replace with your Razorpay credentials
const razorpay = new Razorpay({
  key_id: 'rzp_live_RrVpmeZTLVkGIY',
  key_secret: '44njreYPQvZ80My3VBZp1G0F',
});

// Function to read data from JSON file
const readData = () => {
  if (fs.existsSync('orders.json')) {
    const data = fs.readFileSync('orders.json');
    return JSON.parse(data);
  }
  return [];
};

// Function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync('orders.json')) {
  writeData([]);
}

// Route to handle order creation
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    // Read current orders, add new order, and write back to the file
    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
    });

    writeData(orders);

    // Send order details to frontend, including order ID
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// Route to handle payment verification
app.post('/verify-payment', (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const secret = razorpay.key_secret;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSignature) {
      // Update the order with payment details
      const orders = readData();
      const order = orders.find(o => o.order_id === razorpay_order_id);

      if (order) {
        order.status = 'paid';
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }

      res.status(200).json({ status: 'ok' });
      console.log('Payment verification successful');
    } else {
      res.status(400).json({ status: 'verification_failed' });
      console.log('Payment verification failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error verifying payment'
    });
  }
});

// Route to store order data
app.post('/store-order', (req, res) => {
  try {
    const orderData = req.body;

    // Read current orders, add new order, and write back to the file
    const orders = readData();
    orders.push({
      ...orderData,
      created_at: new Date().toISOString(),
    });

    writeData(orders);

    res.status(200).json({ success: true, message: 'Order stored successfully' });
  } catch (error) {
    console.error('Error storing order:', error);
    res.status(500).json({ success: false, error: 'Failed to store order' });
  }
});

// Route to serve the success page
app.get('/payment-success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
