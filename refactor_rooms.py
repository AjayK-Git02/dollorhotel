import os

rooms_path = r"C:\Users\ajayk\OneDrive\Desktop\hotle(taj)\src\components\RoomsSection.tsx"

new_code = """import { supabase } from '@/utils/supabase';

export async function RoomsSection() {
  const { data: rooms } = await supabase.from('rooms').select('*').order('sort_order', { ascending: true });
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
  const waNumber = settings?.whatsapp_number?.replace(/\D/g, '') || '';

  return (
    <>
{/* 3. ACCOMMODATIONS (Differentiated Standard vs. Premium Room Showcase) */}
<section className="py-24 bg-[#09090b] border-y border-[#1f1e24] relative" id="accommodations">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/* Section Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
<div>
<span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-medium block mb-2">Living Sanctuaries</span>
<h2 className="font-serif text-3xl sm:text-5xl text-[#f4ede4] font-normal">Two Discerning Chambers</h2>
</div>
<p className="max-w-md text-sm text-[#9b948c] font-light leading-relaxed">
          Intentionally restricted to two refined room categories, ensuring an unhurried, tailor-made stay without compromises.
        </p>
</div>

{rooms?.map((room, index) => {
  const isEven = index % 2 === 0;
  return (
    <div key={room.id} className={`mb-20 glass-card rounded-sm overflow-hidden border ${isEven ? 'border-[#26252c] hover:border-[#c5a880]/40' : 'border-[#2a2933] hover:border-[#c5a880]/60'} transition-all group relative`}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Content Column */}
        <div className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between ${isEven ? 'bg-[#111114]' : 'bg-[#131317] order-2 lg:order-1'}`}>
          <div>
            {isEven ? (
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f4ede4]">{room.name}</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#9b948c]">Private Retreat</span>
              </div>
            ) : (
              <>
                <div className="inline-block px-3 py-1 bg-[#c5a880]/15 border border-[#c5a880]/40 rounded-sm text-[10px] uppercase tracking-[0.25em] text-[#e4ceb0] mb-4">
                  Signature Suite
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#f4ede4] mb-3">{room.name}</h3>
              </>
            )}
            
            <p className="text-sm text-[#ada69c] font-light leading-relaxed mb-8">
              {room.description}
            </p>
            
            {/* Amenities tags */}
            <div className="space-y-3 pb-8 border-b border-[#232228]">
              {room.features?.map((feature: string, fIdx: number) => (
                <div key={fIdx} className="flex items-center space-x-3 text-xs text-[#c9c2b8]">
                  <span className="text-[#c5a880]">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Row */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7d7974] block">Availability</span>
              <span className="text-xs text-[#c5a880] tracking-wide">{room.display_price}</span>
            </div>
            <a 
              className={isEven 
                ? "px-6 py-3 bg-transparent hover:bg-[#c5a880] border border-[#c5a880] text-[#c5a880] hover:text-[#0c0c0e] rounded-sm text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
                : "px-7 py-3.5 bg-[#c5a880] hover:bg-[#e4ceb0] text-[#0c0c0e] rounded-sm text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg shadow-black/40"
              } 
              href={`https://wa.me/${waNumber}?text=Inquiry%20regarding%20${encodeURIComponent(room.name)}`} 
              rel="noopener noreferrer" 
              target="_blank"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className={`lg:col-span-7 relative ${isEven ? 'min-h-[380px] lg:min-h-[460px]' : 'min-h-[420px] lg:min-h-[520px] order-1 lg:order-2'} overflow-hidden`}>
          <img alt={room.name} className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out" src={room.image_url}/>
          {isEven ? (
            <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-[#0c0c0e]/80 backdrop-blur-md border border-[#c5a880]/30 rounded-sm text-[10px] uppercase tracking-[0.25em] text-[#c5a880]">
              Category I
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/60 via-transparent to-transparent"></div>
          )}
        </div>

      </div>
    </div>
  );
})}

</div>
</section>
    </>
  );
}
"""

with open(rooms_path, 'w', encoding='utf-8') as f:
    f.write(new_code)

print("RoomsSection updated")
