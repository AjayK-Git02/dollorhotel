"use client";

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-[#f4ede4]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-sm bg-[#111114] border border-[#26252c]"
      >
        <h1 className="text-3xl font-serif mb-2">Sanctuary Access</h1>
        <p className="text-[#ada69c] text-sm mb-8">Authorized personnel only.</p>

        {error && (
          <div className="mb-4 p-3 border border-red-900/50 bg-red-900/10 text-red-500 text-sm rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#9b948c] mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0c0c0e] border border-[#26252c] focus:border-[#c5a880] text-white p-3 rounded-sm outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#9b948c] mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0c0c0e] border border-[#26252c] focus:border-[#c5a880] text-white p-3 rounded-sm outline-none transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-[#c5a880] text-[#09090b] uppercase tracking-[0.2em] font-medium text-xs py-4 rounded-sm hover:bg-[#d6ba94] transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
