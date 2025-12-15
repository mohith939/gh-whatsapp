import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validation schemas
const orderItemSchema = z.object({
  product_id: z.string().min(1).max(100),
  product_name: z.string().min(1).max(200),
  variant: z.string().min(1).max(50),
  price: z.number().positive().max(100000),
  quantity: z.number().int().positive().max(100),
  image: z.string().max(500).optional()
})

const orderSchema = z.object({
  customer_name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().email().max(255).optional().or(z.literal('')).or(z.null()),
  address_line1: z.string().min(1).max(200),
  address_line2: z.string().max(200).optional().or(z.literal('')).or(z.null()),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  order_notes: z.string().max(500).optional().or(z.literal('')).or(z.null()),
  items: z.array(orderItemSchema).min(1).max(50),
  subtotal: z.number().positive().max(10000000),
  shipping_charge: z.number().min(0).max(10000).optional().or(z.null()),
  total: z.number().positive().max(10000000),
  payment_method: z.enum(['COD', 'Razorpay']).optional(),
  order_status: z.string().min(1).max(50).optional()
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Incoming request to create-order:', {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent') ?? 'unknown',
    })

    const body = await req.json()
    const { orderData } = body

    // Validate input
    const validationResult = orderSchema.safeParse(orderData)
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors)
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validationResult.error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    const validatedData = validationResult.data

    console.log('Creating order for:', validatedData.customer_name)

    const { data, error } = await supabaseClient
      .from('orders')
      .insert(validatedData)
      .select('id')
      .single()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    console.log('Order created:', data.id)

    return new Response(
      JSON.stringify({ orderId: data.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: unknown) {
    console.error('Error creating order:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
