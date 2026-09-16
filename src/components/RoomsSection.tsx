import { supabase } from '@/utils/supabase';
import { GlassRoomCard } from './ui/elite-plan-card';

export async function RoomsSection() {
  const { data: rooms } = await supabase.from('rooms').select('*').order('sort_order', { ascending: true });
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
  const waNumber = settings?.whatsapp_number?.replace(/\D/g, '') || '';

  return (
    <section className="relative min-h-screen py-20 lg:py-32 flex items-center" id="accommodations">
      
      {/* Full Bleed Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542314831-c53cd4b85d05?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinematic Hotel Exterior" 
          className="w-full h-full object-cover filter brightness-[0.4]"
        />
        {/* Gradient overlay to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#f4ece3]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="text-center mb-12 lg:mb-20">
          <span className="text-xs lg:text-sm uppercase tracking-[0.4em] text-white/70 font-medium block mb-3 lg:mb-4">Book Your Luxury Rooms</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-normal drop-shadow-xl">Rest In Elegance</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {rooms?.map((room, index) => {
            return (
              <div key={room.id} className={`w-full ${index % 2 !== 0 ? 'lg:mt-24' : ''}`}>
                <GlassRoomCard 
                  title={room.name}
                  subtitle={index === 0 ? "Category I" : "Signature Suite"}
                  description={room.description}
                  highlights={room.features}
                  ctaUrl={`https://wa.me/${waNumber}?text=Inquiry%20regarding%20${encodeURIComponent(room.name)}`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
