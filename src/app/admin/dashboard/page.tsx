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
  const router = useRouter();

  useEffect(() => {
    checkUser();
    loadSettings();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // In dev mode without auth, you can comment this out or bypass
      // router.push('/admin');
    }
  };

  const loadSettings = async () => {
    const { data } = await (supabase as any).from('staygo_settings').select('*').single();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await (supabase as any)
      .from('staygo_settings')
      .update(settings)
      .eq('id', settings.id);

    if (error) {
      setMessage('Error saving settings.');
      console.error(error);
    } else {
      setMessage('Settings saved successfully!');
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="min-h-screen bg-[#111827] flex items-center justify-center text-[#ea580c]">Loading StayGo Admin...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#ea580c] mb-8">StayGo Admin</h2>
        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">Global Settings</Link>
          <Link href="/admin/dashboard/rooms" className="block text-gray-400 hover:text-white px-4 py-2">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-gray-400 hover:text-white px-4 py-2">FAQs</Link>
        </nav>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white mt-auto text-left">
          Sign Out
        </button>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Background Image URL</label>
              <input type="text" name="hero_bg_image" value={settings.hero_bg_image || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" />
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

            <button 
              type="submit" 
              disabled={saving}
              className="mt-6 bg-[#ea580c] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
