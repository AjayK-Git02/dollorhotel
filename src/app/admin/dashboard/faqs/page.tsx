"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export default function AdminFAQs() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<any[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    sort_order: 0
  });

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    const { data } = await (supabase as any).from('staygo_faqs').select('*').order('sort_order');
    if (data) setFaqs(data);
    setLoading(false);
  };

  const openModal = (faq: any = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        sort_order: faq.sort_order || 0
      });
    } else {
      setEditingFaq(null);
      setFormData({ question: '', answer: '', sort_order: faqs.length + 1 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (editingFaq) {
      await (supabase as any).from('staygo_faqs').update(formData).eq('id', editingFaq.id);
    } else {
      await (supabase as any).from('staygo_faqs').insert([formData]);
    }
    
    await loadFaqs();
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await (supabase as any).from('staygo_faqs').delete().eq('id', id);
      await loadFaqs();
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
          <Link href="/admin/dashboard/rooms" className="block text-gray-400 hover:text-white px-4 py-2">Rooms & Offers</Link>
          <Link href="/admin/dashboard/faqs" className="block text-white font-medium bg-white/10 px-4 py-2 rounded-lg">FAQs</Link>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <button onClick={() => supabase.auth.signOut()} className="block w-full text-left text-gray-400 hover:text-[#ea580c] px-4 py-2">Logout</button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage FAQs</h1>
          <button onClick={() => openModal()} className="bg-[#ea580c] text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700">Add New FAQ</button>
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
                  <td className="p-4 text-right align-top min-w-[120px]">
                    <button onClick={() => openModal(faq)} className="text-[#ea580c] hover:underline text-sm font-semibold mr-4">Edit</button>
                    <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
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

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                <input 
                  type="text" 
                  required
                  value={formData.question} 
                  onChange={(e) => setFormData({...formData, question: e.target.value})} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.answer} 
                  onChange={(e) => setFormData({...formData, answer: e.target.value})} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-lg outline-none focus:border-[#ea580c]" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 py-3 text-gray-600 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 py-3 bg-[#ea580c] text-white font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
