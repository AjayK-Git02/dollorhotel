import re
import os

html_path = r"C:\Users\ajayk\.gemini\antigravity-ide\brain\f2d7adfd-925e-434b-8657-eec4792499bd\scratch\stitch_output.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Convert class to className
html = html.replace('class="', 'className="')

# Convert self-closing tags correctly for JSX (img, input, hr, br)
html = re.sub(r'<img([^>]+?)(?<!/)>', r'<img\1 />', html)
html = re.sub(r'<hr([^>]+?)(?<!/)>', r'<hr\1 />', html)
html = re.sub(r'<br([^>]+?)(?<!/)>', r'<br\1 />', html)
html = re.sub(r'<input([^>]+?)(?<!/)>', r'<input\1 />', html)

# Convert inline styles if any
html = re.sub(r'style="([^"]*)"', '', html)
html = html.replace('<!--', '{/*').replace('-->', '*/}')

sections = {
    "Navigation": r"\{\/\* TOP NAV BAR.*? \*\/}(.*?)</header>",
    "Hero": r"\{\/\* HERO SECTION \*\/}(.*?)</section>",
    "IntroStrip": r"\{\/\* INTRO STRIP & SANCTUARY ETHOS \*\/}(.*?)</section>",
    "RoomsSection": r"\{\/\* ROOM PRESENTATION \('Suites & Accommodations'\) \*\/}(.*?)</section>",
    "OffersSection": r"\{\/\* SEASONAL & FESTIVAL OFFERS \*\/}(.*?)</section>",
    "Facilities": r"\{\/\* REFINED FACILITIES GRID \*\/}(.*?)</section>",
    "LocationMap": r"\{\/\* LOCATION & ARRIVAL \(Dark Editorial Map Section\) \*\/}(.*?)</section>",
    "HouseRules": r"\{\/\* HOTEL RULES & QUIET GUIDELINES \*\/}(.*?)</section>",
    "Footer": r"\{\/\* FOOTER \(Shared Component Anchor\) \*\/}(.*?)</footer>",
    "FloatingWhatsApp": r"\{\/\* PERSISTENT FLOATING WHATSAPP CTA BADGE \*\/}(.*?)(?=</body>)"
}

out_dir = r"C:\Users\ajayk\OneDrive\Desktop\hotle(taj)\src\components"
os.makedirs(out_dir, exist_ok=True)

for name, pattern in sections.items():
    match = re.search(pattern, html, re.DOTALL)
    if match:
        content = match.group(0)
        # Wrap in React component
        tsx_content = f"""export function {name}() {{\n  return (\n    <>\n{content}\n    </>\n  );\n}}"""
        with open(os.path.join(out_dir, f"{name}.tsx"), 'w', encoding='utf-8') as f:
            f.write(tsx_content)
        print(f"Extracted {name}")
    else:
        print(f"Failed to find {name}")
