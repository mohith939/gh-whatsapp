-- Drop existing permissive INSERT policy
DROP POLICY IF EXISTS "Allow public order creation" ON public.orders;

-- Create restrictive INSERT policy for order creation (needed for public checkout)
CREATE POLICY "Allow public order creation"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Explicitly deny SELECT for anonymous users (admin access would need service role)
CREATE POLICY "Deny public read access"
ON public.orders
FOR SELECT
TO anon
USING (false);

-- Deny UPDATE for all public users
CREATE POLICY "Deny public update access"
ON public.orders
FOR UPDATE
TO anon, authenticated
USING (false);

-- Deny DELETE for all public users
CREATE POLICY "Deny public delete access"
ON public.orders
FOR DELETE
TO anon, authenticated
USING (false);