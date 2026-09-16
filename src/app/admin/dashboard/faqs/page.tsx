"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export default function AdminFAQs() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    const { data } = await (supabase as any).from('staygo_faqs').select('*').order('sort_order');
    if (data) setFaqs(data);
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
          <Link href="/admin/dashboard/rooms" className="block text-gray-400 hover:text-white px-4 py-2">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">FAQs</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage FAQs</h1>
          <button className="bg-[#ea580c] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700">Add New FAQ</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600 text-sm w-1/3">Question</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Answer</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium align-top">{faq.question}</td>
                  <td className="p-4 text-gray-500 text-sm">{faq.answer}</td>
                  <td className="p-4 text-right align-top">
                    <button className="text-[#ea580c] hover:underline text-sm font-semibold mr-4">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {faqs.length === 0 && (
            <div className="p-8 text-center text-gray-500">No FAQs found. Add one above.</div>
          )}
        </div>
      </div>
    </div>
  );
}
