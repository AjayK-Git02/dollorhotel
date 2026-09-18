import { supabase } from "@/utils/supabase";
import { StayGoAnimations } from "@/components/StayGoAnimations";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  // Fetch data with fallbacks if DB fails
  let settings: any = null;
  let destinations: any[] = [];
  let sliders: any[] = [];
  let faqs: any[] = [];
  let testimonials: any[] = [];

  try {
    const [setRes, destRes, faqRes, testRes] = await Promise.all([
      (supabase as any).from("staygo_settings").select("*").single(),
      (supabase as any).from("staygo_rooms").select("*").order("sort_order"),
      (supabase as any).from("staygo_faqs").select("*").order("sort_order"),
      (supabase as any).from("staygo_testimonials").select("*").order("sort_order"),
    ]);
    settings = setRes.data;
    destinations = destRes.data?.filter((r: any) => !r.is_featured) || [];
    sliders = destRes.data?.filter((r: any) => r.is_featured) || [];
    faqs = faqRes.data || [];
    testimonials = testRes.data || [];
  } catch (error) {
    console.error("DB connection error, using fallback data", error);
  }

  // Fallback defaults matching exactly the provided HTML
  const heroWatermark = settings?.company_name || "Dollar Hotel";
  const heroTitle = settings?.hero_title || "Find Your Perfect Stay\nat the Best Price";
  const heroBg = settings?.hero_bg_image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop";
  const storyTitle = settings?.story_title || "Our Story";
  const storyDesc = settings?.story_desc || "Trusted by over 10 million travelers worldwide, we're proud to deliver top-rated stays with an average rating of 4.8★.";
  const readingText = settings?.reading_text || "From city escapes to beachside retreats, we connect you with hotels that fit your lifestyle wherever the journey takes you.";
  const footerTitle = settings?.footer_title || "Discover Places You'll\nNever Want to Leave";
  const footerDesc = settings?.footer_desc || "Your next great stay is waiting. Explore a wide range of handpicked hotels and cozy stays, all tailored to make your journey smooth and memorable. Booking has never been this easy.";
  
  const destData = destinations.length > 0 ? destinations : [
    { id: "demo-1", title: "Vista Grand Suites", location: "Phuket, Thailand", rating: "⭐ 5.0 out of 5", image_url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop" },
    { id: "demo-2", title: "Mountain Peak Lodge", location: null, rating: null, image_url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop" },
    { id: "demo-3", title: "Ocean View Resort", location: "Bali, Indonesia", rating: "⭐ 4.8", image_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop" }
  ];

  const sliderData = sliders.length > 0 ? sliders : [
    { id: "demo-4", title: "City Center Apartments", location: "New York, NY", base_price: "$150,000", image_url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop" },
    { id: "demo-5", title: "Tropical Paradise Resort", location: "Maui, Hawaii", base_price: "$110,000", image_url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop" },
    { id: "demo-6", title: "Pinecone Lodge", location: "Lake Tahoe, CA", base_price: "$85,000", image_url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=600&auto=format&fit=crop" }
  ];

  const faqData = faqs.length > 0 ? faqs : [
    { question: "How do I find the best deals on StayGo?", answer: "We compare prices from hundreds of trusted travel sites in real-time." },
    { question: "Is it safe to book through StayGo?", answer: "Yes, all transactions are securely encrypted." },
    { question: "Can I cancel or change my reservation?", answer: "Cancellation policies depend on the individual hotel." },
    { question: "Do I need an account to book?", answer: "No, guest checkout is available." },
    { question: "Are taxes and fees included in the prices shown?", answer: "Prices shown typically exclude local city taxes." },
    { question: "How do I contact customer support?", answer: "Reach out to support@staygo.com 24/7." }
  ];

  return (
    <>
      <StayGoAnimations />
      {/* NAVBAR */}
      <nav id="navbar" className="staygo-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="staygo-nav-links">
          <Link href="#">Explore Rooms</Link>
          <Link href="/offers">Deals & Offers</Link>
        </div>
        <a href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^0-9]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors font-medium staygo-wa-btn" style={{ backgroundColor: 'var(--primary)' }}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </a>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="hero-container" style={{ "--hero-bg": `url('${heroBg}')` } as any}>
        <div className="hero-watermark" id="hero-watermark">{heroWatermark}</div>
        <div className="hero-bottom" id="hero-bottom">
          <h1 dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\n/g, '<br>') }} />
        </div>
      </section>

      {/* WRAPPER THAT SLIDES OVER HERO */}
      <div className="main-content">
        
        {/* 2. OUR STORY (Reading Animation) */}
        <section className="staygo-section our-story">
          <div className="story-left fade-up">
            <h3>{storyTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: storyDesc.replace(/10 million travelers/g, '<strong>10 million travelers</strong>').replace(/rating of 4.8★/g, '<strong>rating of 4.8★</strong>') }} />
          </div>
          <div className="story-right fade-up">
            <h2 className="reading-text" id="reading-text">{readingText}</h2>
          </div>
        </section>

        {/* 3. AMAZING DESTINATIONS (ROOMS) */}
        <section className="staygo-section destinations">
          <div className="dest-header fade-up">
            <h2>Our most Amazing Rooms</h2>
          </div>
          <div className="dest-grid fade-up">
            {destData[0] && (
              <Link href={`/room/${destData[0].id}`}>
                <div className="dest-card cursor-pointer">
                  <img src={destData[0].image_url || destData[0].main_image} alt={destData[0].title} />
                  <div className="dest-info">
                    <h4>{destData[0].title}</h4>
                    {(destData[0].location || destData[0].rating) && (
                      <p>📍 {destData[0].location} • {destData[0].rating}</p>
                    )}
                  </div>
                </div>
              </Link>
            )}
            <div className="dest-right">
              {destData.slice(1, 3).map((dest: any, idx: number) => (
                <Link href={`/room/${dest.id}`} key={idx}>
                  <div className="dest-card cursor-pointer">
                    <img src={dest.image_url || dest.main_image} alt={dest.title} />
                    <div className="dest-info">
                      <h4>{dest.title}</h4>
                      {(dest.location || dest.rating) && (
                        <p>📍 {dest.location} • {dest.rating}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. IDEAL DESTINATION (Auto Slider) */}
        <section className="staygo-section ideal">
          <div className="slider-header fade-up">
            <h2>Discover Your<br />Ideal Room</h2>
          </div>
          <div className="slider-container fade-up">
            <div className="slider-track">
              {/* Original Items */}
              {sliderData.map((item: any, idx: number) => (
                <Link href={`/room/${item.id}`} key={`slide-${idx}`}>
                  <div className="slide-card cursor-pointer">
                    <img src={item.image_url || item.main_image} alt={item.title} />
                    <div className="slide-info">
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.location}</p>
                      </div>
                      <span className="slide-price">
                        {item.has_offer ? (
                          <span className="text-orange-600 font-bold">{item.offer_price} <span className="line-through text-gray-400 text-sm">{item.base_price}</span></span>
                        ) : (
                          item.base_price || item.price
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {/* Duplicated for infinite loop */}
              {sliderData.map((item: any, idx: number) => (
                <Link href={`/room/${item.id}`} key={`slide-dup-${idx}`}>
                  <div className="slide-card cursor-pointer">
                    <img src={item.image_url || item.main_image} alt={item.title} />
                    <div className="slide-info">
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.location}</p>
                      </div>
                      <span className="slide-price">
                        {item.has_offer ? (
                          <span className="text-orange-600 font-bold">{item.offer_price} <span className="line-through text-gray-400 text-sm">{item.base_price}</span></span>
                        ) : (
                          item.base_price || item.price
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5 & 6. TRUSTED STAYS, COMMUNITY & TESTIMONIAL (Image 2) */}
        <section className="staygo-section trusted">
          <div className="fade-up">
            <h2>Trusted Stays, Seamless<br />Booking Explore Now!</h2>
            <a href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^0-9]/g, '') || ''}`} target="_blank" rel="noopener noreferrer">
              <button className="trusted-btn flex items-center gap-2 mx-auto">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                BOOK NOW
              </button>
            </a>
          </div>
        </section>
          


        {/* 7. FAQ SECTION (Image 3) */}
        <section className="staygo-section faq-section">
          <div className="faq-left fade-up">
            <div style={{ fontWeight: 600, color: 'var(--text-muted)' }}>FAQs</div>
            <h2>Got Questions?<br />We're Here to Help.</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Find quick answers to common questions about booking, cancellations, payments, and more — so you can travel with confidence.</p>
            
            {faqData.map((faq: any, idx: number) => (
              <details className="staygo-details" open={idx === 0} key={idx}>
                <summary className="staygo-summary">{faq.question}</summary>
                <div className="faq-content">{faq.answer}</div>
              </details>
            ))}
          </div>
          <div className="faq-right fade-up">
            <img src={settings?.faq_image || "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop"} alt="FAQ Image" />
          </div>
        </section>

        {/* 8. EXACT FOOTER (Image 4) */}
        <footer className="staygo-footer" style={{ "--footer-bg": `url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop')` } as any}>
          <div className="footer-top-text fade-up">
            <h2 dangerouslySetInnerHTML={{ __html: footerTitle.replace(/\n/g, '<br>') }} />
            <p>{footerDesc}</p>
          </div>
          <button className="footer-btn fade-up">Plan Your Stay</button>

          <div className="footer-data-overlay fade-up">
            <div>
              <strong style={{ color: 'white', fontSize: '1.1rem' }}>{settings?.company_name || "StayGo Inc."}</strong><br /><br />
              {(settings?.footer_address || "45 Grandview Avenue, New York, NY 10001, USA").split(', ').map((line: string, i: number) => <span key={i}>{line}<br /></span>)}
              <br />
              Email: {settings?.footer_email || "support@staygo.com"}<br />
              Phone: {settings?.footer_phone || "+1 (212) 555-0134"}
            </div>
          </div>

          <div className="giant-footer-logo fade-up">{heroWatermark}</div>

          <div className="footer-bottom-bar fade-up">
            <div>©2026 {heroWatermark}. All Rights Reserved</div>
            <div className="footer-links">
              <Link href="#">Privacy Policy</Link> <Link href="#">Terms of Use</Link> <Link href="#">Legal Disclaimer</Link> <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
