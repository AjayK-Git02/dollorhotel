import os
import re

dir_path = r"C:\Users\ajayk\OneDrive\Desktop\hotle(taj)\src\components"

# 1. Replace Images
images = [
    "https://images.unsplash.com/photo-1542314831-c6a4d1409e50?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1590490359854-dfba196ceaca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
]

img_idx = 0

for filename in os.listdir(dir_path):
    if not filename.endswith('.tsx'): continue
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace placeholder image
    def replacer(m):
        global img_idx
        url = images[img_idx % len(images)]
        img_idx += 1
        return m.group(0).replace("https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg", url)
    
    content = re.sub(r'<img[^>]+src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"[^>]*>', replacer, content)
    
    # 2. Fix Navigation Collision
    if filename == 'Navigation.tsx':
        # Add bg color and z-50
        content = content.replace('z-40 w-full glass-nav', 'z-50 w-full bg-[#121417] border-b border-[#c5a880]/10 glass-nav')
        
    # 3. Replace Hardcoded Address
    if filename == 'LocationFooter.tsx':
        content = content.replace('Plot 14, Serenity Boulevard, Financial Arts Enclave', '[PLACEHOLDER: hotel address]')
        content = content.replace('+91 98765 43210', '[PLACEHOLDER: WhatsApp number]')
        
    # 4. WhatsApp CTA Logic
    # Replace all wa.me/ links
    content = re.sub(r'href="https://wa\.me/[^"]*"', 'href="https://wa.me/[PLACEHOLDER: WhatsApp number]?text=Inquiry%20regarding%20Dollar%20Hotel%20sanctuary"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed UI components")
