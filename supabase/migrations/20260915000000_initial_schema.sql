-- 1. Create tables

CREATE TABLE public.site_settings (
    id int PRIMARY KEY DEFAULT 1,
    whatsapp_number text NOT NULL DEFAULT '[PLACEHOLDER: WhatsApp number]',
    hotel_address text NOT NULL DEFAULT '[PLACEHOLDER: hotel address]',
    contact_email text,
    hero_title text,
    hero_subtitle text,
    CONSTRAINT single_row CHECK (id = 1)
);

CREATE TABLE public.rooms (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text NOT NULL,
    display_price text NOT NULL,
    features text[] NOT NULL DEFAULT '{}',
    image_url text NOT NULL,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.offers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.facilities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.hotel_rules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text NOT NULL,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_rules ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Access Policies
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public read access on offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on hotel_rules" ON public.hotel_rules FOR SELECT USING (true);

-- 4. Create Admin Write Access Policies (Restricted to authenticated users for now)
-- In a real app, this would check auth.uid() against an admin role or specific UUID.
-- We allow all authenticated users (the owner) to write.
CREATE POLICY "Allow authenticated full access on site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on rooms" ON public.rooms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on offers" ON public.offers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on facilities" ON public.facilities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on hotel_rules" ON public.hotel_rules FOR ALL USING (auth.role() = 'authenticated');
