"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [message, setMessage] = useState('');
  
  // File upload state
  const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
  const [faqBgFile, setFaqBgFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await (supabase as any).from('staygo_settings').select('*').single();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
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
      throw error;
    }

    const { data } = supabase.storage.from('staygo-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      let finalSettings = { ...settings };

      if (heroBgFile) {
        setMessage('Uploading image...');
        const newUrl = await uploadFileToSupabase(heroBgFile);
        finalSettings.hero_bg_image = newUrl;
        setHeroBgFile(null);
      }

      if (faqBgFile) {
        setMessage('Uploading FAQ image...');
        const newUrl = await uploadFileToSupabase(faqBgFile);
        finalSettings.faq_image = newUrl;
        setFaqBgFile(null);
      }

      const { error } = await (supabase as any)
        .from('staygo_settings')
        .update(finalSettings)
        .eq('id', finalSettings.id);

      if (error) {
        setMessage('Error saving settings.');
        console.error(error);
      } else {
        setMessage('Settings saved successfully!');
        setSettings(finalSettings);
      }
    } catch (error) {
      setMessage('Error saving or uploading.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-[#ea580c]">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#ea580c] mb-8">{settings?.company_name || 'Admin Panel'}</h2>
        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">Global Settings</Link>
          <Link href="/admin/dashboard/rooms" className="block text-gray-400 hover:text-white px-4 py-2">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-gray-400 hover:text-white px-4 py-2">FAQs</Link>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <button onClick={() => supabase.auth.signOut()} className="block w-full text-left text-gray-400 hover:text-[#ea580c] px-4 py-2">Logout</button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Global Site Settings</h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl">
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name (Watermark)</label>
                <input type="text" name="company_name" value={settings.company_name || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Title</label>
                <input type="text" name="hero_title" value={settings.hero_title || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Background Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setHeroBgFile(e.target.files?.[0] || null)} 
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
              />
              {settings.hero_bg_image && !heroBgFile && (
                <p className="text-xs text-gray-500 mt-2">Currently uploaded: <a href={settings.hero_bg_image} target="_blank" className="text-orange-600 hover:underline">View Image</a></p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">FAQ Section Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFaqBgFile(e.target.files?.[0] || null)} 
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" 
              />
              {settings.faq_image && !faqBgFile && (
                <p className="text-xs text-gray-500 mt-2">Currently uploaded: <a href={settings.faq_image} target="_blank" className="text-orange-600 hover:underline">View Image</a></p>
              )}
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Story Title</label>
                <input type="text" name="story_title" value={settings.story_title || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Story Description (Small text)</label>
                <textarea name="story_desc" value={settings.story_desc || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c] h-24" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reading Text (Gradient effect)</label>
              <textarea name="reading_text" value={settings.reading_text || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c] h-24" />
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Email</label>
                <input type="text" name="footer_email" value={settings.footer_email || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Phone</label>
                <input type="text" name="footer_phone" value={settings.footer_phone || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Address</label>
              <input type="text" name="footer_address" value={settings.footer_address || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number (For Book Now / Chat)</label>
              <input type="text" name="whatsapp_number" value={settings.whatsapp_number || ''} onChange={handleChange} placeholder="e.g. 1234567890" className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="mt-6 bg-[#ea580c] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Uploading & Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
