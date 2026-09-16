"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export default function AdminRooms() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const { data } = await (supabase as any).from('staygo_rooms').select('*').order('sort_order');
    if (data) setRooms(data);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-[#ea580c]">Loading StayGo Admin...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#ea580c] mb-8">StayGo Admin</h2>
        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white px-4 py-2">Global Settings</Link>
          <Link href="/admin/dashboard/rooms" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-gray-400 hover:text-white px-4 py-2">FAQs</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Rooms & Offers</h1>
          <button className="bg-[#ea580c] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700">Add New Room</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600 text-sm">Main Image</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Room Name</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Featured?</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Active Deal?</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <img src={room.main_image} alt={room.title} className="w-16 h-12 object-cover rounded-md" />
                  </td>
                  <td className="p-4 font-medium">{room.title}</td>
                  <td className="p-4 font-semibold text-sm">
                    {room.has_offer ? (
                      <div>
                        <span className="line-through text-gray-400 text-xs mr-2">{room.base_price}</span>
                        <span className="text-[#ea580c]">{room.offer_price}</span>
                      </div>
                    ) : (
                      room.base_price
                    )}
                  </td>
                  <td className="p-4">
                    {room.is_featured ? <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Yes (Slider)</span> : <span className="text-gray-400 text-sm">-</span>}
                  </td>
                  <td className="p-4">
                    {room.has_offer ? <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Active</span> : <span className="text-gray-400 text-sm">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ea580c] hover:underline text-sm font-semibold mr-4">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <div className="p-8 text-center text-gray-500">No rooms found. Add one above.</div>
          )}
        </div>
      </div>
    </div>
  );
}
