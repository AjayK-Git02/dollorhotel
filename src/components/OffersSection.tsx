import { supabase } from '@/utils/supabase';

export async function OffersSection() {
  const { data: offers } = await supabase.from('offers').select('*').eq('is_active', true);
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
  const waNumber = settings?.whatsapp_number?.replace(/\D/g, '') || '';

  return (
    <section className="relative py-20 lg:py-32 bg-[#1b2230] overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e85d38]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c5a880]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-6">
          <div>
            <span className="text-xs lg:text-sm uppercase tracking-[0.3em] text-[#e85d38] font-bold block mb-3 lg:mb-4">Curated Experiences</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-normal">Exclusive Offers</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers?.map((offer, index) => (
            <div 
              key={offer.id} 
              className={`group relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-4 ${index === 1 ? 'lg:mt-16' : ''} ${index === 2 ? 'lg:mt-32' : ''}`}
            >
              {/* Background Image */}
              <img 
                src={offer.image_url} 
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-50"
              />
              
              {/* Glassmorphism Content Box */}
              <div className="absolute inset-x-4 bottom-4 p-5 lg:p-6 rounded-2xl backdrop-blur-xl bg-[#1b2230]/70 lg:bg-white/10 border border-white/20 text-white transform transition-all duration-500 lg:translate-y-4 lg:group-hover:translate-y-0 shadow-xl">
                <h3 className="text-xl lg:text-2xl font-serif mb-2">{offer.title}</h3>
                <p className="text-sm text-white/90 lg:text-white/80 line-clamp-3 mb-4 lg:mb-6 transition-all duration-500 opacity-100 h-auto lg:opacity-0 lg:group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto">
                  {offer.description}
                </p>
                <a 
                  href={`https://wa.me/${waNumber}?text=Inquiry%20regarding%20offer:%20${encodeURIComponent(offer.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center py-3 bg-[#e85d38] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}