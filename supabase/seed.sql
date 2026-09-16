-- Insert global site settings
INSERT INTO public.site_settings (id, whatsapp_number, hotel_address, contact_email, hero_title, hero_subtitle)
VALUES (
    1, 
    '+91 98765 43210', -- Default demo number
    'Plot 14, Serenity Boulevard, Financial Arts Enclave, Mumbai 400001',
    'reservations@dollarhotel.example.com',
    'Quiet contemplation, effortless grace.',
    'An Intimate Urban Sanctuary'
) ON CONFLICT (id) DO UPDATE SET
    whatsapp_number = EXCLUDED.whatsapp_number,
    hotel_address = EXCLUDED.hotel_address,
    contact_email = EXCLUDED.contact_email,
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle;

-- Insert Rooms
INSERT INTO public.rooms (name, slug, description, display_price, features, image_url, sort_order)
VALUES 
(
    'Standard Room', 
    'standard', 
    'A quiet haven defined by its restorative minimalism. Designed for those seeking respite from the city, the Standard Room features ambient architectural lighting, organic linen textures, and a deeply comfortable bespoke bed.', 
    'From ₹3,000 / Night', 
    '{"Premium AC", "Complimentary Wi-Fi", "En-suite Bath", "Daily Housekeeping"}', 
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000', 
    1
),
(
    'Premium Room', 
    'premium', 
    'Our most expansive offering. The Premium Room commands wider vistas and features an elevated sitting area, a freestanding soaking tub, and curated art pieces that echo the enclave''s cinematic architecture.', 
    'From ₹5,000 / Night', 
    '{"Panoramic Views", "Freestanding Tub", "Premium AC", "Extended Seating Area"}', 
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200', 
    2
);

-- Insert Offers
INSERT INTO public.offers (title, description, image_url, is_active)
VALUES
(
    'Winter Solstice Escape',
    'A curated 3-night stay inclusive of priority early check-in and an evening turndown service featuring artisanal botanicals.',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'The Urban Retreat',
    'For the business traveler requiring seamless transition from work to rest. Includes complimentary pressing and extended late checkout.',
    'https://images.unsplash.com/photo-1590490359854-dfba196ceaca?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'Extended Sanctuary',
    'Book 5 nights or more and receive a complimentary upgrade to the Premium Room, subject to availability upon your private arrival.',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    true
);

-- Insert Facilities
INSERT INTO public.facilities (name, category)
VALUES
('Zero Lobby Lines', 'Service'),
('Dedicated Chat Host', 'Service'),
('Bespoke Architectural Lighting', 'Ambiance'),
('Organic Linen Textures', 'Comfort'),
('High-Speed WiFi Access', 'Amenities');

-- Insert Hotel Rules
INSERT INTO public.hotel_rules (content, sort_order)
VALUES
('Check-in is at 2:00 PM, and checkout is at 11:00 AM. Early arrivals and late departures can be arranged with your host.', 1),
('To preserve the sanctuary atmosphere, we maintain a strict quiet protocol in all corridors after 10:00 PM.', 2),
('As a boutique residence, our spaces are designed for registered guests only. Outside visitors require prior notification.', 3),
('The property is entirely smoke-free. A dedicated outdoor terrace is available for this purpose.', 4);
