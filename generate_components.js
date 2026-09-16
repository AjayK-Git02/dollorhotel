const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const components = {
  "Navigation.tsx": `
import { Phone } from "lucide-react";

export function Navigation() {
  return (
    <header className="fixed top-0 w-full z-50 bg-brand-background/80 backdrop-blur-md border-b border-brand-surface-light/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-display tracking-tight text-brand-text-light">
          Dollar Hotel
        </div>
        <nav className="hidden md:flex space-x-8 text-sm text-brand-text-light/70 uppercase tracking-widest">
          <a href="#property" className="hover:text-brand-gold transition-colors">The Property</a>
          <a href="#rooms" className="hover:text-brand-gold transition-colors">Accommodations</a>
          <a href="#location" className="hover:text-brand-gold transition-colors">Location</a>
        </nav>
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold/80 transition-colors group">
          <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline uppercase tracking-widest">WhatsApp Concierge</span>
        </a>
      </div>
    </header>
  );
}`,
  "Hero.tsx": `
export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background visual (Placeholder until 3D is added) */}
      <div className="absolute inset-0 bg-brand-surface-light/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-transparent to-brand-background/80" />
      
      <div className="relative z-10 text-center px-6 mt-20">
        <h2 className="text-brand-gold uppercase tracking-[0.2em] text-sm md:text-base mb-6 font-medium">An Intimate Sanctuary</h2>
        <h1 className="text-6xl md:text-8xl lg:text-[120px] font-display text-brand-text-light mb-8 font-light leading-none">
          Dollar Hotel
        </h1>
        <p className="text-brand-text-light/70 max-w-xl mx-auto text-lg font-light">
          An unhurried boutique escape crafted for serenity and timeless comfort.
        </p>
      </div>
    </section>
  );
}`,
  "IntroStrip.tsx": `
import { Clock, Wifi, Coffee, Heart } from "lucide-react";

export function IntroStrip() {
  const highlights = [
    { icon: Clock, label: "24/7 Dedicated Concierge" },
    { icon: Wifi, label: "High-Speed Fiber Connectivity" },
    { icon: Coffee, label: "Artisanal Amenities" },
    { icon: Heart, label: "Bespoke Hospitality" },
  ];

  return (
    <section id="property" className="py-24 px-6 bg-brand-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl md:text-3xl font-display text-brand-text-light leading-relaxed mb-16 text-brand-text-light/90">
          Step into a world where time slows down. Dollar Hotel is designed for the discerning traveler seeking a quiet, refined sanctuary away from the city's pulse.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <h.icon className="w-6 h-6 text-brand-gold opacity-80" />
              <span className="text-sm text-brand-text-light/60 uppercase tracking-widest">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  "RoomsSection.tsx": `
export function RoomsSection() {
  const rooms = [
    {
      title: "Standard Room",
      desc: "Generous natural light, king bedding, minimalist work sanctuary, rain shower, and precise climate control.",
      features: ["King Bed", "Rain Shower", "Work Desk"],
    },
    {
      title: "Premium Room",
      desc: "Panoramic views, extended bespoke living lounge, soaking tub, king posturepedic mattress, evening turndown attention.",
      features: ["Panoramic View", "Soaking Tub", "Lounge Area"],
    }
  ];

  return (
    <section id="rooms" className="py-32 px-6 bg-brand-surface-light text-brand-text-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display mb-4">Suites & Accommodations</h2>
          <p className="text-brand-text-dark/70 uppercase tracking-widest text-sm">Crafted for Serenity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {rooms.map((room, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-[#E8E6E0] mb-8 overflow-hidden relative">
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-brand-text-dark/20 font-display text-2xl">
                  [Image: {room.title}]
                </div>
              </div>
              <h3 className="text-2xl font-display mb-4">{room.title}</h3>
              <p className="text-brand-text-dark/70 mb-6 font-light leading-relaxed">{room.desc}</p>
              <div className="flex gap-4 mb-8">
                {room.features.map((f, j) => (
                  <span key={j} className="text-xs uppercase tracking-widest border-b border-brand-text-dark/20 pb-1">{f}</span>
                ))}
              </div>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-block border border-brand-text-dark/30 px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand-text-dark hover:text-brand-surface-light transition-colors">
                Ask on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  "OffersSection.tsx": `
export function OffersSection() {
  const offers = [
    { title: "Diwali Light Sojourn", desc: "Experience the festival of lights with curated amenities and late checkout." },
    { title: "Weekend Sanctuary", desc: "A quiet two-night escape designed to restore and rejuvenate." }
  ];

  return (
    <section className="py-32 px-6 bg-brand-background text-brand-text-light border-t border-brand-surface-light/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display mb-16 text-center">Seasonal Offers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, i) => (
            <div key={i} className="border border-brand-gold/20 p-12 hover:border-brand-gold/50 transition-colors text-center flex flex-col items-center">
              <h3 className="text-2xl font-display mb-4 text-brand-gold">{offer.title}</h3>
              <p className="text-brand-text-light/70 mb-8 max-w-sm">{offer.desc}</p>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest border-b border-brand-gold text-brand-gold pb-1 hover:text-brand-text-light hover:border-brand-text-light transition-colors">
                Inquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  "Facilities.tsx": `
export function Facilities() {
  const facilities = ["Valet Arrival", "High-Speed Wi-Fi", "Daily Housekeeping", "In-Room Dining Service", "Power Backup", "24/7 Security"];
  
  return (
    <section className="py-24 px-6 bg-brand-background border-t border-brand-surface-light/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-16">Provisions & Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
          {facilities.map((f, i) => (
            <div key={i} className="text-brand-text-light/80 font-light tracking-wide">{f}</div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  "LocationMap.tsx": `
export function LocationMap() {
  return (
    <section id="location" className="py-32 px-6 bg-brand-surface-light text-brand-text-dark text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-display mb-8">The Address</h2>
        <p className="text-brand-text-dark/70 mb-12">[PLACEHOLDER: Hotel Address, City, Region]</p>
        <div className="aspect-[21/9] bg-[#E8E6E0] mb-12 flex items-center justify-center">
           <span className="text-brand-text-dark/40 uppercase tracking-widest font-display text-xl">[Styled Map Graphic]</span>
        </div>
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-block border border-brand-text-dark px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand-text-dark hover:text-brand-surface-light transition-colors">
          Request Directions
        </a>
      </div>
    </section>
  );
}`,
  "HouseRules.tsx": `
export function HouseRules() {
  return (
    <section className="py-24 px-6 bg-brand-background border-t border-brand-surface-light/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-lg font-display text-brand-text-light/60 mb-8">Quiet Guidelines</h2>
        <div className="text-brand-text-light/40 text-sm font-light space-y-4">
          <p>Check-in: 14:00 | Check-out: 11:00</p>
          <p>To preserve the tranquility of our sanctuary, we respectfully request noise levels be kept to a minimum in all corridors and shared spaces.</p>
        </div>
      </div>
    </section>
  );
}`,
  "Footer.tsx": `
export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a0909] text-center border-t border-brand-surface-light/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display text-brand-gold mb-8">Dollar Hotel</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 text-sm text-brand-text-light/50 uppercase tracking-widest">
          <span>[PLACEHOLDER: Address]</span>
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp: +[PLACEHOLDER]</a>
        </div>
        <div className="text-xs text-brand-text-light/30">
          &copy; {new Date().getFullYear()} Dollar Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}`,
  "FloatingWhatsApp.tsx": `
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-brand-gold text-[#141313] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 transition-transform duration-300 group flex items-center gap-3 overflow-hidden"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap uppercase tracking-widest text-xs font-semibold">
        Concierge
      </span>
    </a>
  );
}`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(dir, filename), content.trim());
}
console.log('Components generated.');
