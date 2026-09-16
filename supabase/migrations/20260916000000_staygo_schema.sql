-- StayGo Frontend Schema

CREATE TABLE public.staygo_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_watermark text NOT NULL DEFAULT 'StayGo',
  hero_title text NOT NULL DEFAULT 'Find Your Perfect Stay at the Best Price',
  hero_bg_image text NOT NULL DEFAULT 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
  story_title text NOT NULL DEFAULT 'Our Story',
  story_desc text NOT NULL DEFAULT 'Trusted by over 10 million travelers worldwide, we''re proud to deliver top-rated stays with an average rating of 4.8★.',
  reading_text text NOT NULL DEFAULT 'From city escapes to beachside retreats, we connect you with hotels that fit your lifestyle wherever the journey takes you.',
  footer_title text NOT NULL DEFAULT 'Discover Places You''ll Never Want to Leave',
  footer_desc text NOT NULL DEFAULT 'Your next great stay is waiting. Explore a wide range of handpicked hotels and cozy stays, all tailored to make your journey smooth and memorable. Booking has never been this easy.',
  footer_phone text NOT NULL DEFAULT '+1 (212) 555-0134',
  footer_email text NOT NULL DEFAULT 'support@staygo.com',
  footer_address text NOT NULL DEFAULT '45 Grandview Avenue, New York, NY 10001, USA',
  company_name text NOT NULL DEFAULT 'StayGo Inc.',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.staygo_destinations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text,
  rating text,
  image_url text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.staygo_slider_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  price text NOT NULL,
  image_url text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.staygo_testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name text NOT NULL,
  author_image text NOT NULL,
  rating_text text NOT NULL,
  overall_title text NOT NULL,
  overall_desc text NOT NULL,
  quote text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.staygo_faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.staygo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staygo_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staygo_slider_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staygo_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staygo_faqs ENABLE ROW LEVEL SECURITY;

-- Policies (Public read, authenticated write)
CREATE POLICY "Public Read Settings" ON public.staygo_settings FOR SELECT USING (true);
CREATE POLICY "Admin All Settings" ON public.staygo_settings USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Destinations" ON public.staygo_destinations FOR SELECT USING (true);
CREATE POLICY "Admin All Destinations" ON public.staygo_destinations USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Slider Items" ON public.staygo_slider_items FOR SELECT USING (true);
CREATE POLICY "Admin All Slider Items" ON public.staygo_slider_items USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Testimonials" ON public.staygo_testimonials FOR SELECT USING (true);
CREATE POLICY "Admin All Testimonials" ON public.staygo_testimonials USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read FAQs" ON public.staygo_faqs FOR SELECT USING (true);
CREATE POLICY "Admin All FAQs" ON public.staygo_faqs USING (auth.role() = 'authenticated');

-- Insert default settings row
INSERT INTO public.staygo_settings (id) VALUES (gen_random_uuid());

-- Insert Demo Data
INSERT INTO public.staygo_destinations (title, location, rating, image_url, sort_order) VALUES
('Vista Grand Suites', 'Phuket, Thailand', '⭐ 5.0 out of 5', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop', 1),
('Mountain Peak Lodge', NULL, NULL, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop', 2),
('Ocean View Resort', 'Bali, Indonesia', '⭐ 4.8', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop', 3);

INSERT INTO public.staygo_slider_items (title, location, price, image_url, sort_order) VALUES
('City Center Apartments', 'New York, NY', '$150,000', 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop', 1),
('Tropical Paradise Resort', 'Maui, Hawaii', '$110,000', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop', 2),
('Pinecone Lodge', 'Lake Tahoe, CA', '$85,000', 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=600&auto=format&fit=crop', 3);

INSERT INTO public.staygo_faqs (question, answer, sort_order) VALUES
('How do I find the best deals on StayGo?', 'We compare prices from hundreds of trusted travel sites in real-time.', 1),
('Is it safe to book through StayGo?', 'Yes, all transactions are securely encrypted.', 2),
('Can I cancel or change my reservation?', 'Cancellation policies depend on the individual hotel.', 3),
('Do I need an account to book?', 'No, guest checkout is available.', 4),
('Are taxes and fees included in the prices shown?', 'Prices shown typically exclude local city taxes.', 5),
('How do I contact customer support?', 'Reach out to support@staygo.com 24/7.', 6);

INSERT INTO public.staygo_testimonials (author_name, author_image, rating_text, overall_title, overall_desc, quote, sort_order) VALUES
('Sarah Ahmed', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', '⭐ 5 out of 5', 'Exactly What We Needed — Smooth & Stress-Free!', 'The booking process was incredibly smooth, and the hotel was exactly as shown. Clean, comfortable, and located right where we needed. This platform made our vacation stress-free!', '“', 1);
