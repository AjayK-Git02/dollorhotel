CREATE TABLE public.staygo_rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text,
  description text,
  main_image text NOT NULL,
  gallery jsonb DEFAULT '[]'::jsonb,
  base_price text NOT NULL,
  has_offer boolean DEFAULT false,
  offer_price text,
  rating text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.staygo_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Rooms" ON public.staygo_rooms FOR SELECT USING (true);
CREATE POLICY "Admin All Rooms" ON public.staygo_rooms USING (auth.role() = 'authenticated');

-- Insert Demo Data
INSERT INTO public.staygo_rooms (title, location, description, main_image, gallery, base_price, has_offer, offer_price, rating, is_featured, sort_order) VALUES
('Vista Grand Suites', 'Phuket, Thailand', 'Experience unparalleled luxury in our Vista Grand Suites. Featuring panoramic ocean views and private plunge pools, this is the ultimate tropical escape.', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop"]'::jsonb, '$150/night', true, '$120/night', '⭐ 5.0 out of 5', false, 1),
('Mountain Peak Lodge', 'Swiss Alps', 'Nestled high in the mountains, our lodge offers cozy fireplace warmth after a long day on the slopes.', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop', '[]'::jsonb, '$200/night', false, null, '⭐ 4.9 out of 5', false, 2),
('Ocean View Resort', 'Bali, Indonesia', 'Step directly from your room onto the pristine white sands of Bali.', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop', '[]'::jsonb, '$90/night', false, null, '⭐ 4.8 out of 5', false, 3),
('City Center Apartments', 'New York, NY', 'Modern luxury right in the heart of Manhattan.', 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop', '[]'::jsonb, '$300/night', true, '$250/night', '⭐ 4.7', true, 4),
('Tropical Paradise Resort', 'Maui, Hawaii', 'Your secluded slice of paradise.', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop', '[]'::jsonb, '$110,000', false, null, '⭐ 4.9', true, 5),
('Pinecone Lodge', 'Lake Tahoe, CA', 'A tranquil cabin retreat in the woods.', 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=600&auto=format&fit=crop', '[]'::jsonb, '$85,000', false, null, '⭐ 4.6', true, 6);
