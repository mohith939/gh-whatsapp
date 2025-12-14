-- Fix RLS policy for orders table to allow public inserts
DROP POLICY IF EXISTS "Allow public order creation" ON public.orders;

-- Allow anyone to insert orders (for guest checkout)
CREATE POLICY "Allow public order creation" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Also allow reading orders (for order confirmation)
CREATE POLICY "Allow public order reading" ON public.orders
  FOR SELECT USING (true);
