import os
import re

dir_path = r"C:\Users\ajayk\OneDrive\Desktop\hotle(taj)\src\components"

# 1. Hero.tsx
hero_path = os.path.join(dir_path, 'Hero.tsx')
with open(hero_path, 'r', encoding='utf-8') as f:
    hero_code = f.read()

hero_code = hero_code.replace("export function Hero() {", """import { supabase } from '@/utils/supabase';

export async function Hero() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();
""")
hero_code = hero_code.replace("An Intimate Urban Sanctuary", "{settings?.hero_subtitle || 'An Intimate Urban Sanctuary'}")
hero_code = hero_code.replace("Quiet contemplation, <br />", "{settings?.hero_title?.split(',')[0] || 'Quiet contemplation'}, <br />")
hero_code = hero_code.replace('<span className="italic font-light text-[#c5a880]">effortless</span> grace.', 
                              '<span className="italic font-light text-[#c5a880]">{settings?.hero_title?.split(",")[1]?.trim() || "effortless grace."}</span>')

with open(hero_path, 'w', encoding='utf-8') as f:
    f.write(hero_code)


# 2. OffersSection.tsx
offers_path = os.path.join(dir_path, 'OffersSection.tsx')
with open(offers_path, 'r', encoding='utf-8') as f:
    offers_code = f.read()

# We need to replace the static grid with a map
grid_start = offers_code.find('<div className="grid grid-cols-1 md:grid-cols-3 gap-8">')
grid_end = offers_code.rfind('</div>\n</div>\n</section>')

if grid_start != -1:
    new_grid = """<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{offers?.map((offer) => (
  <div key={offer.id} className="group cursor-pointer">
    <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-sm mb-6">
      <img alt={offer.title} className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" src={offer.image_url} />
      <div className="absolute inset-0 border border-[#c5a880]/0 group-hover:border-[#c5a880]/40 transition-colors duration-500 rounded-sm pointer-events-none"></div>
    </div>
    <div className="px-2">
      <h3 className="font-serif text-xl text-[#e5dfd5] mb-3 group-hover:text-[#c5a880] transition-colors">{offer.title}</h3>
      <p className="text-sm text-[#8e8880] font-light leading-relaxed mb-5 line-clamp-3">
        {offer.description}
      </p>
      <a className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] group-hover:text-[#e4ceb0] transition-colors" href={`https://wa.me/${settings?.whatsapp_number?.replace(/\D/g, '')}?text=Inquiry%20regarding%20${encodeURIComponent(offer.title)}`} target="_blank" rel="noopener noreferrer">
        <span>Claim Experience</span>
        <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  </div>
))}
</div>"""
    offers_code = offers_code[:grid_start] + new_grid + offers_code[grid_end:]
    
    offers_code = offers_code.replace("export function OffersSection() {", """import { supabase } from '@/utils/supabase';

export async function OffersSection() {
  const { data: offers } = await supabase.from('offers').select('*').eq('is_active', true);
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
""")
    with open(offers_path, 'w', encoding='utf-8') as f:
        f.write(offers_code)

# 3. FloatingWhatsApp.tsx
wa_path = os.path.join(dir_path, 'FloatingWhatsApp.tsx')
with open(wa_path, 'r', encoding='utf-8') as f:
    wa_code = f.read()

wa_code = wa_code.replace("export function FloatingWhatsApp() {", """import { supabase } from '@/utils/supabase';

export async function FloatingWhatsApp() {
  const { data: settings } = await supabase.from('site_settings').select('whatsapp_number').single();
  const waNumber = settings?.whatsapp_number?.replace(/\D/g, '') || '';
""")
wa_code = wa_code.replace('href="https://wa.me/[PLACEHOLDER: WhatsApp number]?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary"', 
                          'href={`https://wa.me/${waNumber}?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary`}')

with open(wa_path, 'w', encoding='utf-8') as f:
    f.write(wa_code)

# 4. Amenities.tsx
amenities_path = os.path.join(dir_path, 'Amenities.tsx')
with open(amenities_path, 'r', encoding='utf-8') as f:
    amenities_code = f.read()

amenities_code = amenities_code.replace("export function Amenities() {", """import { supabase } from '@/utils/supabase';

export async function Amenities() {
  const { data: facilities } = await supabase.from('facilities').select('*');
""")
grid_start_am = amenities_code.find('<div className="lg:col-span-6 flex flex-col justify-center">')
grid_end_am = amenities_code.find('</div>\n</div>\n</div>\n</section>')
if grid_start_am != -1:
    new_am = """<div className="lg:col-span-6 flex flex-col justify-center">
<div className="space-y-0 border-t border-[#232228]">
{facilities?.map((facility) => (
  <div key={facility.id} className="py-6 border-b border-[#232228] flex justify-between items-center group cursor-default hover:bg-[#111114] px-4 -mx-4 transition-colors">
    <span className="font-serif text-xl sm:text-2xl text-[#d4ccc2] group-hover:text-[#c5a880] transition-colors">{facility.name}</span>
    <span className="text-[10px] uppercase tracking-[0.2em] text-[#706c67] group-hover:text-[#9b948c] transition-colors">{facility.category}</span>
  </div>
))}
</div>
<div className="mt-12 text-center lg:text-left">
  <span className="text-[10px] uppercase tracking-[0.3em] text-[#706c67] font-medium">Bespoke Requests Honored</span>
</div>
"""
    amenities_code = amenities_code[:grid_start_am] + new_am + amenities_code[grid_end_am:]
    with open(amenities_path, 'w', encoding='utf-8') as f:
        f.write(amenities_code)


# 5. LocationFooter.tsx
footer_path = os.path.join(dir_path, 'LocationFooter.tsx')
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_code = f.read()

footer_code = footer_code.replace("export function LocationFooter() {", """import { supabase } from '@/utils/supabase';

export async function LocationFooter() {
  const { data: rules } = await supabase.from('hotel_rules').select('*').order('sort_order', { ascending: true });
  const { data: settings } = await supabase.from('site_settings').select('*').single();
""")
footer_code = footer_code.replace('[PLACEHOLDER: hotel address]', '{settings?.hotel_address || "Plot 14, Serenity Boulevard"}')

rules_start = footer_code.find('{/* House Rules & Quiet Protocol (Quiet collapsible aesthetic) */}')
rules_end = footer_code.find('</div>\n{/* Bottom Brand and Copyright Strip */}')
if rules_start != -1:
    new_rules = """{/* House Rules & Quiet Protocol (Quiet collapsible aesthetic) */}
<div className="mt-32 max-w-4xl mx-auto border-t border-[#1f1e24] pt-20 pb-10">
  <div className="text-center mb-12">
    <h3 className="font-serif text-2xl text-[#c4bcb2] mb-3">House Protocol</h3>
    <p className="text-xs uppercase tracking-[0.2em] text-[#706c67]">For the preservation of our sanctuary</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
    {rules?.map((rule, idx) => (
      <div key={rule.id}>
        <span className="text-[#c5a880] text-xs font-serif italic mb-2 block">0{idx + 1}</span>
        <p className="text-sm text-[#8e8880] font-light leading-relaxed">
          {rule.content}
        </p>
      </div>
    ))}
  </div>
"""
    footer_code = footer_code[:rules_start] + new_rules + footer_code[rules_end:]
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(footer_code)

print("Updated 5 simple components")
