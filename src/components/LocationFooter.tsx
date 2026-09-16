import { supabase } from '@/utils/supabase';

export async function LocationFooter() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  return (
    <footer className="relative min-h-[70vh] flex items-center justify-center">
      {/* Full Bleed Map Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
          alt="Location Map" 
          className="w-full h-full object-cover filter brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-center">
        {/* Floating Glass Footer Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center max-w-3xl w-full transform hover:scale-[1.02] transition-transform duration-500">
          <h2 className="font-serif text-4xl md:text-7xl text-white mb-6 md:mb-8 drop-shadow-lg">Dollar Hotel</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Location</p>
              <p className="text-lg text-white font-medium drop-shadow-md">
                {settings?.hotel_address || '[PLACEHOLDER: hotel address]'}
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-center items-center gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Reservations</p>
                <a href={`https://wa.me/${settings?.whatsapp_number?.replace(/\D/g, '')}`} className="text-white hover:text-[#e85d38] font-bold tracking-wider transition-colors drop-shadow-md">
                  {settings?.whatsapp_number || '[PLACEHOLDER: WhatsApp]'}
                </a>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-white/20"></div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Contact</p>
                <a href={`mailto:${settings?.contact_email}`} className="text-white hover:text-[#e85d38] font-bold tracking-wider transition-colors drop-shadow-md">
                  {settings?.contact_email || 'hello@dollarhotel.example.com'}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-xs text-white/40 uppercase tracking-widest flex justify-between">
            <p>© {new Date().getFullYear()} Dollar Hotel</p>
            <p>Admin Portal: <a href="/admin" className="hover:text-white">Login</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}