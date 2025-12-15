import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// HMAC-SHA256 function using Web Crypto API
async function hmacSHA256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse form data from Razorpay POST callback
    const formData = await req.formData();
    const razorpay_order_id = formData.get('razorpay_order_id') as string;
    const razorpay_payment_id = formData.get('razorpay_payment_id') as string;
    const razorpay_signature = formData.get('razorpay_signature') as string;

    console.log('Razorpay callback received:', {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent') ?? 'unknown',
      razorpay_order_id,
      razorpay_payment_id,
    });

    // Get the frontend URL from environment
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://goldenharvestrawpowders.com';

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing required payment fields');
      return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=missing_fields`, 302);
    }

    // Verify signature
    const secret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET not configured');
      return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=config_error`, 302);
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = await hmacSHA256(secret, body);

    if (expectedSignature !== razorpay_signature) {
      console.error('Signature verification failed');
      return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=signature_invalid`, 302);
    }

    console.log('Signature verified successfully');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Query orders table to find matching pending order
    const { data: orders, error: queryError } = await supabase
      .from('orders')
      .select('id')
      .eq('order_status', 'Payment Pending')
      .order('created_at', { ascending: false })
      .limit(10);

    if (queryError || !orders || orders.length === 0) {
      console.error('No pending orders found:', queryError);
      return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=order_not_found`, 302);
    }

    // Update the most recent pending order
    const orderId = orders[0].id;

    // Update order status to 'Paid'
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        order_status: 'Paid',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=update_failed`, 302);
    }

    console.log('Order updated successfully:', orderId);

    // Redirect to order confirmation page
    return Response.redirect(`${frontendUrl}/order-confirmation?orderId=${orderId}&payment_status=success`, 302);

  } catch (error) {
    console.error('Callback processing error:', error);
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://goldenharvestrawpowders.com';
    return Response.redirect(`${frontendUrl}/checkout?payment_status=failed&reason=server_error`, 302);
  }
});
