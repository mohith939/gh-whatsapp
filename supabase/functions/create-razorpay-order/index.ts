import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || '';
const getCorsHeaders = () => {
  return {
    'Access-Control-Allow-Origin': FRONTEND_URL || 'null',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
};

// Validation schema for Razorpay order creation
const razorpayOrderSchema = z.object({
  amount: z.number().positive().max(10000000, 'Amount cannot exceed 10 million'),
  currency: z.string().length(3).regex(/^[A-Z]{3}$/, 'Invalid currency code').default('INR'),
  receipt: z.string().min(1).max(40, 'Receipt ID too long'),
  notes: z.record(z.string().max(256)).optional()
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders() });
  }

  try {
    const body = await req.json();

    console.log('Incoming request to create-razorpay-order:', {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent') ?? 'unknown',
      body,
    });

    // Validate input
    const validationResult = razorpayOrderSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validationResult.error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        }),
        { 
          status: 400, 
          headers: { ...getCorsHeaders(), 'Content-Type': 'application/json' } 
        }
      );
    }

    const { amount, currency, receipt, notes } = validationResult.data;

    console.log('Creating Razorpay order:', { amount, currency, receipt });

    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured');
      throw new Error('Payment gateway not configured');
    }

    const auth = btoa(`${keyId}:${keySecret}`);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency || 'INR',
        receipt,
        notes,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Razorpay API error response:', errorData);
      console.error('Request details:', {
        amount: Math.round(amount * 100),
        currency: currency || 'INR',
        receipt,
        notes,
        url: 'https://api.razorpay.com/v1/orders',
        method: 'POST'
      });
      throw new Error(`Failed to create order with payment gateway: ${errorData}`);
    }

    const order = await response.json();
    console.log('Razorpay order created:', order.id);

    // Only return the public key_id; never return the secret.
    return new Response(JSON.stringify({ ...order, key_id: keyId }), {
      headers: { ...getCorsHeaders(), 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error creating Razorpay order:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...getCorsHeaders(), 'Content-Type': 'application/json' },
    });
  }
});
