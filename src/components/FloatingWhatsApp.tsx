import { supabase } from '@/utils/supabase';

export async function FloatingWhatsApp() {
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
  const waNumber = settings?.whatsapp_number?.replace(/\D/g, '') || '';

  return (
    <>
{/* PERSISTENT FLOATING WHATSAPP CONCIERGE BUTTON (Floating Dock with Status Indicator) */}
<div className="fixed bottom-6 right-6 z-50">
<a className="group flex items-center space-x-3 px-5 py-3.5 rounded-full bg-[#121215]/95 border border-[#c5a880]/70 text-[#f4ede4] shadow-2xl backdrop-blur-xl hover:border-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0c0e] transition-all duration-300 transform hover:-translate-y-1" href={`https://wa.me/${waNumber}?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary`} rel="noopener noreferrer" target="_blank">
{/* WhatsApp Icon with pulse indicator */}
<div className="relative">
<svg className="w-5 h-5 text-[#c5a880] group-hover:text-[#0c0c0e] transition-colors fill-current" viewBox="0 0 24 24">
<path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.974.553 1.838.835 2.781.836h.001c3.181 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.769-5.77-5.77zm4.184 8.211c-.173.486-.867.925-1.246.969-.379.043-.87.062-2.827-.723-1.638-.657-2.73-2.317-2.812-2.427-.082-.109-.667-.887-.667-1.691 0-.804.422-1.2.572-1.353.151-.153.33-.191.44-.191.11 0 .22.001.316.006.103.004.241-.039.377.288.14.337.478 1.164.519 1.249.042.084.07.182.014.294-.056.111-.084.182-.168.279-.084.098-.178.219-.254.294-.084.085-.172.176-.074.345.098.169.435.717.933 1.16 1.03.916 1.349.914 1.542 1.01.194.098.307.085.422-.047.114-.131.488-.567.618-.762.13-.194.26-.162.436-.098.177.065 1.121.528 1.313.624.192.096.32.143.367.225.048.082.048.475-.125.961zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.443 5.176L2 22l4.98-1.305A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
</svg>
<span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c5a880] group-hover:bg-[#0c0c0e] animate-ping"></span>
</div>
{/* Text Label */}
<div className="flex flex-col text-left">
<span className="text-[9px] uppercase tracking-[0.25em] text-[#9e8563] group-hover:text-[#0c0c0e]/80 transition-colors font-semibold leading-none">Instant Concierge</span>
<span className="text-xs tracking-wider font-cinzel font-medium text-[#f4ede4] group-hover:text-[#0c0c0e] transition-colors mt-0.5">Ask on WhatsApp</span>
</div>
</a>
</div>

    </>
  );
}