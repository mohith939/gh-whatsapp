CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



SET default_table_access_method = heap;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    customer_name text NOT NULL,
    phone text NOT NULL,
    email text,
    address_line1 text NOT NULL,
    address_line2 text,
    city text NOT NULL,
    state text NOT NULL,
    pincode text NOT NULL,
    order_notes text,
    items jsonb NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    shipping_charge numeric(10,2) DEFAULT 0,
    total numeric(10,2) NOT NULL,
    payment_method text DEFAULT 'COD'::text,
    order_status text DEFAULT 'Received'::text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: idx_orders_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_created_at ON public.orders USING btree (created_at DESC);


--
-- Name: idx_orders_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_phone ON public.orders USING btree (phone);


--
-- Name: orders Deny public delete access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny public delete access" ON public.orders FOR DELETE TO authenticated, anon USING (false);


--
-- Name: orders Deny public insert access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny public insert access" ON public.orders FOR INSERT WITH CHECK (false);


--
-- Name: orders Deny public read access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny public read access" ON public.orders FOR SELECT TO anon USING (false);


--
-- Name: orders Deny public update access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny public update access" ON public.orders FOR UPDATE USING (false);


--
-- Name: orders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;