export function Navigation() {
  return (
    <>
{/* STICKY GLASSMORPHISM NAVIGATION BAR */}
<header className="sticky top-0 z-50 w-full bg-[#121417] border-b border-[#c5a880]/10 glass-nav transition-all duration-300">
<div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
{/* Brand Monogram & Name */}
<a className="group flex items-center space-x-3.5 focus:outline-none" href="#hero">
<div className="w-10 h-10 rounded border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] font-cinzel text-lg tracking-widest group-hover:border-[#c5a880] transition-colors">
          D
        </div>
<div className="flex flex-col">
<span className="font-cinzel text-xl tracking-[0.28em] text-[#f4ede4] uppercase font-medium">Dollar Hotel</span>
<span className="text-[9px] tracking-[0.35em] text-[#9e8563] uppercase -mt-0.5">Boutique Residence</span>
</div>
</a>
{/* Center Links */}
<nav className="hidden lg:flex items-center space-x-10 text-[11px] tracking-[0.22em] uppercase font-medium text-[#c4bcb2]">
<a className="hover:text-[#c5a880] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all" href="#story">Philosophy</a>
<a className="hover:text-[#c5a880] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all" href="#accommodations">Sanctuaries</a>
<a className="hover:text-[#c5a880] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all" href="#amenities">Amenities</a>
<a className="hover:text-[#c5a880] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all" href="#gallery">Journal &amp; Glimpse</a>
<a className="hover:text-[#c5a880] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all" href="#offers">Offers</a>
</nav>
{/* WhatsApp Direct CTA */}
<div className="flex items-center space-x-4">
<a className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-[#c5a880]/60 bg-[#c5a880]/10 hover:bg-[#c5a880] text-[#f4ede4] hover:text-[#0c0c0e] text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 group shadow-lg shadow-black/40" href="https://wa.me/[PLACEHOLDER: WhatsApp number]?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary" rel="noopener noreferrer" target="_blank">
<svg className="w-4 h-4 text-[#c5a880] group-hover:text-[#0c0c0e] transition-colors fill-current" viewBox="0 0 24 24">
<path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.974.553 1.838.835 2.781.836h.001c3.181 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.769-5.77-5.77zm4.184 8.211c-.173.486-.867.925-1.246.969-.379.043-.87.062-2.827-.723-1.638-.657-2.73-2.317-2.812-2.427-.082-.109-.667-.887-.667-1.691 0-.804.422-1.2.572-1.353.151-.153.33-.191.44-.191.11 0 .22.001.316.006.103.004.241-.039.377.288.14.337.478 1.164.519 1.249.042.084.07.182.014.294-.056.111-.084.182-.168.279-.084.098-.178.219-.254.294-.084.085-.172.176-.074.345.098.169.435.717.933 1.16 1.03.916 1.349.914 1.542 1.01.194.098.307.085.422-.047.114-.131.488-.567.618-.762.13-.194.26-.162.436-.098.177.065 1.121.528 1.313.624.192.096.32.143.367.225.048.082.048.475-.125.961zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.443 5.176L2 22l4.98-1.305A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
</svg>
<span>WhatsApp Concierge</span>
</a>
</div>
</div>
</header>
    </>
  );
}