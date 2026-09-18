import { supabase } from "@/utils/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function OffersPage() {
  let rooms: any[] = [];

  try {
    const { data } = await (supabase as any).from("staygo_rooms").select("*").eq("has_offer", true).order("sort_order");
    rooms = data || [];
  } catch (error) {
    console.error("DB connection error", error);
  }

  // Fallback demo data
  if (rooms.length === 0) {
    rooms = [
      { id: "demo-1", title: "Vista Grand Suites", location: "Phuket, Thailand", rating: "⭐ 5.0 out of 5", main_image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop", base_price: "$150/night", has_offer: true, offer_price: "$120/night" },
      { id: "demo-4", title: "City Center Apartments", location: "New York, NY", rating: "⭐ 4.7", main_image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop", base_price: "$300/night", has_offer: true, offer_price: "$250/night" },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827]">
      {/* Navbar */}
      <nav className="staygo-nav bg-[#111827] sticky top-0 z-50">
        <div className="staygo-nav-links">
          <Link href="/" className="text-white hover:text-[#ea580c]">← Back to Home</Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-[#111827] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals & Offers</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">Discover our handpicked selection of premium rooms at special discounted rates. Book now before these offers expire.</p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room: any) => (
            <Link href={`/room/${room.id}`} key={room.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img src={room.main_image} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-[#ea580c] text-white px-4 py-1 rounded-full font-bold shadow-md text-sm uppercase tracking-wide">
                    Sale
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    {room.location && <span>📍 {room.location}</span>}
                    {room.rating && <span>• {room.rating}</span>}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-gray-400 line-through text-sm">{room.base_price}</div>
                      <div className="text-2xl font-bold text-[#ea580c]">{room.offer_price}</div>
                    </div>
                    <div className="text-[#ea580c] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {rooms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No offers available right now.</h3>
            <p>Check back later for special deals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
