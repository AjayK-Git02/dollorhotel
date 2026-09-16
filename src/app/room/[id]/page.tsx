import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

// Demo data fallback for testing without DB
const DEMO_ROOMS: Record<string, any> = {
  "demo-1": { title: "Vista Grand Suites", location: "Phuket, Thailand", description: "Experience unparalleled luxury in our Vista Grand Suites. Featuring panoramic ocean views and private plunge pools, this is the ultimate tropical escape.", rating: "⭐ 5.0 out of 5", main_image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop", base_price: "$150/night", has_offer: true, offer_price: "$120/night", gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop"] },
  "demo-2": { title: "Mountain Peak Lodge", location: "Swiss Alps", description: "Nestled high in the mountains, our lodge offers cozy fireplace warmth after a long day on the slopes.", main_image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop", base_price: "$200/night" },
  "demo-3": { title: "Ocean View Resort", location: "Bali, Indonesia", rating: "⭐ 4.8", main_image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop", base_price: "$90/night" },
  "demo-4": { title: "City Center Apartments", location: "New York, NY", base_price: "$150,000", main_image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop", has_offer: true, offer_price: "$120,000" },
  "demo-5": { title: "Tropical Paradise Resort", location: "Maui, Hawaii", base_price: "$110,000", main_image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop" },
  "demo-6": { title: "Pinecone Lodge", location: "Lake Tahoe, CA", base_price: "$85,000", main_image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=600&auto=format&fit=crop" }
};

export default async function RoomPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  let room = null;
  let settings = null;

  try {
    const [roomRes, setRes] = await Promise.all([
      (supabase as any).from("staygo_rooms").select("*").eq("id", id).single(),
      (supabase as any).from("staygo_settings").select("whatsapp_number").single()
    ]);
    room = roomRes.data;
    settings = setRes.data;
  } catch (error) {
    console.error("DB error fetching room", error);
  }

  // Fallback to demo data if DB query fails or returns null
  if (!room && DEMO_ROOMS[id]) {
    room = DEMO_ROOMS[id];
  }

  if (!room) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(`Hello, I want to book the ${room.title}`);
  const whatsappUrl = `https://wa.me/${settings?.whatsapp_number?.replace(/[^0-9]/g, '') || ''}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827]">
      {/* Navbar */}
      <nav className="staygo-nav bg-[#111827] sticky top-0 z-50">
        <div className="staygo-nav-links">
          <Link href="/" className="text-white hover:text-[#ea580c]">← Back to Home</Link>
          <Link href="/offers" className="text-white hover:text-[#ea580c]">Deals & Offers</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Main Hero Image */}
          <div className="h-[500px] w-full relative">
            <img src={room.main_image} alt={room.title} className="w-full h-full object-cover" />
            {room.has_offer && (
              <div className="absolute top-6 right-6 bg-[#ea580c] text-white px-6 py-2 rounded-full font-bold shadow-lg uppercase tracking-wider text-sm">
                Special Deal
              </div>
            )}
          </div>

          <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{room.title}</h1>
                <div className="flex items-center gap-4 text-gray-500 font-medium">
                  {room.location && <span>📍 {room.location}</span>}
                  {room.rating && <span>{room.rating}</span>}
                </div>
              </div>

              <div className="prose prose-lg text-gray-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About this room</h3>
                <p>{room.description || "Experience the ultimate comfort and luxury in this beautifully appointed room."}</p>
              </div>

              {/* Gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">More Photos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {room.gallery.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt={`${room.title} view ${idx + 1}`} className="w-full h-48 object-cover rounded-xl" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (Pricing & Booking) */}
            <div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 sticky top-32">
                <div className="mb-6">
                  {room.has_offer ? (
                    <div>
                      <div className="text-gray-400 line-through text-lg mb-1">{room.base_price}</div>
                      <div className="text-4xl font-bold text-[#ea580c]">{room.offer_price}</div>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">{room.base_price}</div>
                  )}
                </div>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <button className="w-full bg-[#ea580c] text-white font-bold py-4 rounded-full flex justify-center items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    BOOK NOW
                  </button>
                </a>
                <p className="text-center text-sm text-gray-500 mt-4">Inquire instantly via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
