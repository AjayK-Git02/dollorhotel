"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export default function AdminRooms() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  
  // Form State for Strings (Existing Data)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    main_image: '',
    image2: '',
    image3: '',
    base_price: '',
    has_offer: false,
    offer_price: '',
    rating: '',
    is_featured: false,
    sort_order: 0
  });

  // Form State for File Uploads
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image3File, setImage3File] = useState<File | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const { data } = await (supabase as any).from('staygo_rooms').select('*').order('sort_order');
    if (data) setRooms(data);
    setLoading(false);
  };

  const openModal = (room: any = null) => {
    setMainImageFile(null);
    setImage2File(null);
    setImage3File(null);

    if (room) {
      setEditingRoom(room);
      const gallery = room.gallery || [];
      setFormData({
        title: room.title,
        location: room.location || '',
        description: room.description || '',
        main_image: room.main_image,
        image2: gallery[0] || '',
        image3: gallery[1] || '',
        base_price: room.base_price,
        has_offer: room.has_offer,
        offer_price: room.offer_price || '',
        rating: room.rating || '',
        is_featured: room.is_featured,
        sort_order: room.sort_order || 0
      });
    } else {
      setEditingRoom(null);
      setFormData({
        title: '',
        location: '',
        description: '',
        main_image: '',
        image2: '',
        image3: '',
        base_price: '',
        has_offer: false,
        offer_price: '',
        rating: '',
        is_featured: false,
        sort_order: rooms.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const uploadFileToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage.from('staygo-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
    
    if (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      throw error;
    }

    const { data } = supabase.storage.from('staygo-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // 1. Upload files if they exist
      let finalMainImage = formData.main_image;
      let finalImage2 = formData.image2;
      let finalImage3 = formData.image3;

      if (mainImageFile) {
        finalMainImage = await uploadFileToSupabase(mainImageFile);
      }
      if (image2File) {
        finalImage2 = await uploadFileToSupabase(image2File);
      }
      if (image3File) {
        finalImage3 = await uploadFileToSupabase(image3File);
      }

      if (!finalMainImage) {
        alert("A Main Image is required!");
        setSaving(false);
        return;
      }

      const gallery = [];
      if (finalImage2) gallery.push(finalImage2);
      if (finalImage3) gallery.push(finalImage3);

      const dbData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        main_image: finalMainImage,
        gallery: gallery,
        base_price: formData.base_price,
        has_offer: formData.has_offer,
        offer_price: formData.offer_price,
        rating: formData.rating,
        is_featured: formData.is_featured,
        sort_order: formData.sort_order
      };
      
      if (editingRoom) {
        await (supabase as any).from('staygo_rooms').update(dbData).eq('id', editingRoom.id);
      } else {
        await (supabase as any).from('staygo_rooms').insert([dbData]);
      }
      
      await loadRooms();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this Room?")) {
      await (supabase as any).from('staygo_rooms').delete().eq('id', id);
      await loadRooms();
    }
  };

  if (loading) return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-[#ea580c]">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] text-white p-6 flex flex-col fixed h-full z-10">
        <h2 className="text-2xl font-bold text-[#ea580c] mb-8">Admin Panel</h2>
        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white px-4 py-2">Global Settings</Link>
          <Link href="/admin/dashboard/rooms" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-gray-400 hover:text-white px-4 py-2">FAQs</Link>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <button onClick={() => supabase.auth.signOut()} className="block w-full text-left text-gray-400 hover:text-[#ea580c] px-4 py-2">Logout</button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Rooms & Offers</h1>
          <button onClick={() => openModal()} className="bg-[#ea580c] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700">Add New Room</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600 text-sm">Main Image</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Room Name</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Placement</th>
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
                    {room.is_featured ? <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Slider</span> : <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Grid</span>}
                  </td>
                  <td className="p-4">
                    {room.has_offer ? <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Active</span> : <span className="text-gray-400 text-sm">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openModal(room)} className="text-[#ea580c] hover:underline text-sm font-semibold mr-4">Edit</button>
                    <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
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

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Basic Info */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                  <h3 className="font-bold text-gray-900 border-b pb-2">Basic Info</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Room Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none focus:border-[#ea580c]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Subtitle</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none focus:border-[#ea580c]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rating Text (e.g. ⭐ 5.0 out of 5)</label>
                    <input type="text" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none focus:border-[#ea580c]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none focus:border-[#ea580c]" />
                  </div>
                </div>

                {/* Pricing & Placement */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                  <h3 className="font-bold text-gray-900 border-b pb-2">Pricing & Placement</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Where should this room show up?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="placement" checked={formData.is_featured === true} onChange={() => setFormData({...formData, is_featured: true})} className="accent-[#ea580c]" />
                        <span className="text-sm">Slider ("Discover Your Ideal Room")</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="placement" checked={formData.is_featured === false} onChange={() => setFormData({...formData, is_featured: false})} className="accent-[#ea580c]" />
                        <span className="text-sm">Grid ("Our most Amazing Rooms")</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Base Price</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500 font-semibold">₹</span>
                      <input 
                        type="number" 
                        required 
                        value={formData.base_price.replace(/[^0-9]/g, '')} 
                        onChange={(e) => setFormData({...formData, base_price: e.target.value ? `₹${e.target.value}/night` : ''})} 
                        className="w-full bg-gray-50 border border-gray-200 py-2 pl-8 pr-16 rounded-lg outline-none focus:border-[#ea580c]" 
                      />
                      <span className="absolute right-3 text-gray-500 text-sm">/night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" id="hasOffer" checked={formData.has_offer} onChange={(e) => setFormData({...formData, has_offer: e.target.checked})} className="w-4 h-4 accent-[#ea580c] cursor-pointer" />
                    <label htmlFor="hasOffer" className="text-sm font-semibold text-gray-700 cursor-pointer">Has Active Deal / Offer?</label>
                  </div>

                  {formData.has_offer && (
                    <div className="pt-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Offer Price</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-500 font-semibold">₹</span>
                        <input 
                          type="number" 
                          value={formData.offer_price.replace(/[^0-9]/g, '')} 
                          onChange={(e) => setFormData({...formData, offer_price: e.target.value ? `₹${e.target.value}/night` : ''})} 
                          className="w-full bg-gray-50 border border-orange-300 py-2 pl-8 pr-16 rounded-lg outline-none focus:border-[#ea580c]" 
                        />
                        <span className="absolute right-3 text-gray-500 text-sm">/night</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Images */}
                <div className="col-span-2 space-y-4 mt-2">
                  <h3 className="font-bold text-gray-900 border-b pb-2">Room Images</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Main Image (Shown on Homepage)</label>
                    <input type="file" accept="image/*" onChange={(e) => setMainImageFile(e.target.files?.[0] || null)} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                    {formData.main_image && !mainImageFile && (
                      <p className="text-xs text-gray-500 mt-1">Currently uploaded: <a href={formData.main_image} target="_blank" className="text-orange-600 hover:underline">View Image</a></p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image 2 (Gallery)</label>
                      <input type="file" accept="image/*" onChange={(e) => setImage2File(e.target.files?.[0] || null)} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                      {formData.image2 && !image2File && (
                        <p className="text-xs text-gray-500 mt-1">Currently uploaded: <a href={formData.image2} target="_blank" className="text-orange-600 hover:underline">View Image</a></p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image 3 (Gallery)</label>
                      <input type="file" accept="image/*" onChange={(e) => setImage3File(e.target.files?.[0] || null)} className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                      {formData.image3 && !image3File && (
                        <p className="text-xs text-gray-500 mt-1">Currently uploaded: <a href={formData.image3} target="_blank" className="text-orange-600 hover:underline">View Image</a></p>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex gap-4 pt-6 border-t mt-6">
                <button type="button" onClick={closeModal} className="flex-1 py-3 text-gray-600 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled={saving}>Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 bg-[#ea580c] text-white font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-50">
                  {saving ? 'Uploading & Saving...' : 'Save Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
