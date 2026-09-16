export function Gallery() {
  return (
    <>
{/* 4. GALLERY (Sophisticated Masonry / Asymmetrical Grid) */}
<section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto" id="gallery">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-medium block mb-2">Visual Narrative</span>
<h2 className="font-serif text-3xl sm:text-5xl text-[#f4ede4]">Atmospheric Glimpses</h2>
<p className="text-sm text-[#9b948c] mt-4 font-light">
        A tactile journey through natural wood, hand-carved stone, ambient lamplight, and quiet corners.
      </p>
</div>
{/* Asymmetrical Grid: 5 images with varied landscape/portrait ratios */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
{/* Item 1: Tall Portrait (Span 4 cols) */}
<div className="md:col-span-4 relative overflow-hidden rounded-sm group border border-[#202026] aspect-[3/4]">
<img alt="Intimate Bedding and Texture" className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1000"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-70"></div>
<div className="absolute bottom-4 left-4 right-4">
<p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">Texture &amp; Form</p>
<p className="font-serif text-sm text-[#f4ede4]">Handcrafted Egyptian Percale</p>
</div>
</div>
{/* Item 2 & 3: Stacked in Span 5 cols */}
<div className="md:col-span-5 flex flex-col gap-6">
{/* Top Landscape */}
<div className="relative overflow-hidden rounded-sm group border border-[#202026] aspect-[16/9]">
<img alt="Warm Hotel Courtyard" className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-60"></div>
<div className="absolute bottom-4 left-4">
<p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">Courtyard</p>
<p className="font-serif text-sm text-[#f4ede4]">Secluded Stone Veranda</p>
</div>
</div>
{/* Bottom Landscape with soaking ambiance */}
<div className="relative overflow-hidden rounded-sm group border border-[#202026] aspect-[16/9]">
<img alt="Boutique Bath Sanctuary" className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-60"></div>
<div className="absolute bottom-4 left-4">
<p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">Sanctuary Bath</p>
<p className="font-serif text-sm text-[#f4ede4]">Natural Marble &amp; Rain Faucets</p>
</div>
</div>
</div>
{/* Item 4: Tall Portrait (Span 3 cols) */}
<div className="md:col-span-3 relative overflow-hidden rounded-sm group border border-[#202026] aspect-[3/4] md:aspect-auto">
<img alt="Warm Ambient Living Architecture" className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-70"></div>
<div className="absolute bottom-4 left-4 right-4">
<p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">Aesthetics</p>
<p className="font-serif text-sm text-[#f4ede4]">Quiet Luminary Shadows</p>
</div>
</div>
</div>
{/* Gallery bottom CTA */}
<div className="mt-12 text-center">
<a className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#c5a880] hover:text-[#f4ede4] transition-colors border-b border-[#c5a880]/40 pb-1" href="https://wa.me/[PLACEHOLDER: WhatsApp number]?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary" rel="noopener noreferrer" target="_blank">
<span>Request High-Resolution Photo Folio via WhatsApp</span>
<span>→</span>
</a>
</div>
</section>
    </>
  );
}