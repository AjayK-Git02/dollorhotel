import { supabase } from '@/utils/supabase';

export async function Amenities() {
  const { data: facilities } = await supabase.from('facilities').select('*');
  const { data: rules } = await supabase.from('hotel_rules').select('*').order('sort_order', { ascending: true });

  return (
    <section className="relative py-20 lg:py-32 bg-[#f4ece3] overflow-hidden border-t border-[#1b2230]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Facilities - Floating Pills */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#e85d38] font-bold block mb-4">The Experience</span>
            <h2 className="font-serif text-5xl text-[#1b2230] mb-12">Curated Amenities</h2>
            
            <div className="flex flex-wrap gap-4">
              {facilities?.map((facility) => (
                <div 
                  key={facility.id} 
                  className="px-6 py-4 rounded-full bg-white/50 backdrop-blur-md border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-sm font-bold text-[#1b2230]">{facility.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules - Layered Cards */}
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e85d38] font-bold block mb-4">House Protocol</span>
            <h2 className="font-serif text-5xl text-[#1b2230] mb-12">Sanctuary Rules</h2>
            
            <div className="space-y-6 relative">
              {/* Decorative line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1b2230]/10"></div>
              
              {rules?.map((rule, index) => (
                <div 
                  key={rule.id} 
                  className="relative pl-16 py-4"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1b2230] text-white flex items-center justify-center font-serif text-xl shadow-lg z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-[#1b2230]/5 hover:scale-[1.02] transition-transform">
                    <p className="text-sm text-[#1b2230]/80 leading-relaxed font-medium">
                      {rule.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}