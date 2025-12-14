-- Drop the overly restrictive update policy
DROP POLICY IF EXISTS "Deny public update access" ON public.orders;

-- The service role (used in edge functions) bypasses RLS, so no additional policy needed
-- But we keep the table secure from direct client-side updates