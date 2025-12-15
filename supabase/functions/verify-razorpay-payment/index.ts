import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schema for payment verification
const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1).max(50).refine(
    (val) => val.startsWith('order_'), 
    { message: 'Invalid Razorpay order ID format' }
  ),
  razorpay_payment_id: z.string().min(1).max(50).refine(
    (val) => val.startsWith('pay_'), 
    { message: 'Invalid Razorpay payment ID format' }
  ),
  razorpay_signature: z.string().length(64).regex(
    /^[a-f0-9]{64}$/, 
    'Invalid signature format'
  ),
  order_id: z.string().uuid('Invalid order ID format')
});

// HMAC-SHA256 signature verification
async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return expectedSignature === signature;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    console.log('Incoming request to verify-razorpay-payment:', {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent') ?? 'unknown',
      body,
    });

    // Validate input
    const validationResult = verifyPaymentSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          status: 'validation_failed',
          details: validationResult.error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = validationResult.data;

    console.log('Verifying payment:', { razorpay_order_id, razorpay_payment_id, order_id });

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keySecret) {
      throw new Error('Payment gateway not configured');
    }

    // Verify signature
    const signatureBody = razorpay_order_id + '|' + razorpay_payment_id;
    const isValid = await verifySignature(signatureBody, razorpay_signature, keySecret);

    if (!isValid) {
      console.error('Invalid payment signature');
      return new Response(JSON.stringify({ status: 'verification_failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Payment verified successfully');

    // Update order status in database using service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from('orders')
      .update({ order_status: 'Paid', updated_at: new Date().toISOString() })
      .eq('id', order_id);

    if (updateError) {
      console.error('Error updating order status:', updateError);
    }

    return new Response(JSON.stringify({ status: 'ok', payment_id: razorpay_payment_id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error verifying payment:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ status: 'error', message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
