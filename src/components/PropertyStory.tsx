export function PropertyStory() {
  return (
    <>
{/* 2. PROPERTY STORY (Asymmetrical Editorial Layout with Overlapping Vertical Imagery) */}
<section className="py-28 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto relative" id="story">
{/* Background atmospheric watermark */}
<div className="absolute right-0 top-12 font-cinzel text-[140px] lg:text-[220px] font-bold text-[#ffffff]/[0.015] select-none pointer-events-none tracking-widest leading-none">
      EST. 2024
    </div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
{/* Left Column: Large Overlapping Vertical Imagery with Offset Frame */}
<div className="lg:col-span-6 relative">
<div className="relative z-10 w-full max-w-md mx-auto lg:max-w-none">
{/* Outer border offset accent */}
<div className="absolute -top-4 -left-4 w-full h-full border border-[#c5a880]/25 pointer-events-none hidden sm:block"></div>
{/* Main Vertical Image */}
<div className="relative overflow-hidden aspect-[4/5] shadow-2xl rounded-sm border border-[#2a2930]">
<img alt="Warm tactile boutique ambiance" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700 ease-out" src="https://images.unsplash.com/photo-1590490359854-dfba196ceaca?auto=format&fit=crop&q=80&w=800"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/80 via-transparent to-transparent"></div>
<div className="absolute bottom-6 left-6 right-6">
<p className="font-cinzel text-xs tracking-[0.25em] text-[#c5a880] uppercase">Sanctuary Detail</p>
<p className="font-serif text-lg text-[#f4ede4] italic">Hand-burnished brass, soundproof masonry, curated calm.</p>
</div>
</div>
{/* Small Floating Detail Card (Overlapping) */}
<div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 glass-card p-6 rounded shadow-2xl max-w-[260px] hidden sm:block border-l-2 border-[#c5a880]">
<div className="text-[#c5a880] font-cinzel text-2xl font-light">1:1</div>
<div className="text-[11px] uppercase tracking-[0.2em] text-[#eae2d8] mt-1 font-medium">Bespoke Protocol</div>
<p className="text-[12px] text-[#9b948c] mt-2 leading-relaxed">No shared front desk. Your digital concierge is assigned upon your first hello.</p>
</div>
</div>
</div>
{/* Right Column: Editorial Text Block with Varied Typographic Hierarchy */}
<div className="lg:col-span-6 lg:pl-10 relative z-10">
<div className="space-y-4">
<div className="flex items-center space-x-3">
<span className="h-[1px] w-6 bg-[#c5a880]"></span>
<span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-medium">The Architectural Philosophy</span>
</div>
<h2 className="font-serif text-3xl sm:text-5xl text-[#f4ede4] font-normal leading-[1.2]">
            Hospitality stripped of <br className="hidden sm:inline"/>
<span className="italic text-[#c5a880] font-light">superficial noise.</span>
</h2>
</div>
<div className="mt-8 space-y-6 text-[#b8b1a8] text-base leading-relaxed font-light">
<p className="first-letter:font-serif first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-[#c5a880] first-letter:leading-none">
            Dollar Hotel was created for travelers who find luxury not in grand ballroom chandeliers, but in unhurried mornings, acoustically insulated walls, and direct, friction-free service. We dismantled the cumbersome machinery of conventional 100-key establishments to foster two pure residential sanctuaries.
          </p>
<p>
            Here, every interaction happens with precision. Keyless entry, direct private chauffeur coordination, and custom culinary provisions are orchestrated effortlessly via WhatsApp.
          </p>
</div>
{/* Metric highlights */}
<div className="mt-10 grid grid-cols-2 gap-6 pt-8 border-t border-[#26252b]">
<div>
<div className="font-cinzel text-3xl text-[#f4ede4]">38 dB</div>
<div className="text-[11px] uppercase tracking-[0.2em] text-[#9b948c] mt-1">Acoustic Shielding</div>
</div>
<div>
<div className="font-cinzel text-3xl text-[#c5a880]">100%</div>
<div className="text-[11px] uppercase tracking-[0.2em] text-[#9b948c] mt-1">Direct WhatsApp Concierge</div>
</div>
</div>
<div className="mt-10">
<a className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#c5a880] hover:text-[#f4ede4] group font-medium transition-colors" href="https://wa.me/[PLACEHOLDER: WhatsApp number]?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary" rel="noopener noreferrer" target="_blank">
<span>Speak with the House Concierge</span>
<span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
</a>
</div>
</div>
</div>
</section>
    </>
  );
}