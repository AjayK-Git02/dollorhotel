import json

colors = {
    "surface-container-highest": "#353435", "surface-light": "#F8F6F0", "surface-dark": "#121417", "surface-container-high": "#2a2a2a", "accent-gold": "#D4AF37", "accent-bronze": "#C5A059", "primary-fixed": "#e2e2e6", "inverse-on-surface": "#313030", "on-tertiary": "#362f29", "error": "#ffb4ab", "on-secondary-fixed": "#241a00", "surface-tint": "#c6c6ca", "surface-container-low": "#1c1b1c", "secondary-container": "#af8d11", "on-tertiary-fixed-variant": "#4d453f", "on-surface-variant": "#c6c6ca", "secondary-fixed-dim": "#e9c349", "on-error": "#690005", "error-container": "#93000a", "surface-bright": "#3a3939", "tertiary-fixed-dim": "#cfc5bc", "background": "#141313", "on-primary-fixed": "#1a1c1f", "primary-container": "#121417", "surface-dim": "#141313", "surface-container": "#201f20", "text-dark": "#1A1A1A", "primary": "#c6c6ca", "on-tertiary-container": "#867d75", "secondary-fixed": "#ffe088", "on-secondary-container": "#342800", "on-secondary-fixed-variant": "#574500", "tertiary": "#cfc5bc", "on-primary-fixed-variant": "#45474a", "on-error-container": "#ffdad6", "secondary": "#e9c349", "surface-container-lowest": "#0e0e0e", "on-tertiary-fixed": "#201b15", "tertiary-fixed": "#ece0d8", "outline-variant": "#45474a", "on-primary": "#2f3034", "inverse-primary": "#5d5e62", "primary-fixed-dim": "#c6c6ca", "on-primary-container": "#7d7e82", "surface": "#141313", "on-background": "#e5e2e1", "text-light": "#F5F5F5", "surface-variant": "#353435", "tertiary-container": "#18130e", "outline": "#8f9094", "on-secondary": "#3c2f00", "inverse-surface": "#e5e2e1", "on-surface": "#e5e2e1"
}

fonts = {
    "headline-xl-mobile": "36px",
    "headline-xl": "56px",
    "headline-lg-mobile": "28px",
    "headline-lg": "40px",
    "headline-md": "28px",
    "headline-sm": "22px",
    "body-lg": "18px",
    "body-md": "15px",
    "body-sm": "13px",
    "label-md": "12px",
}

css = '@import "tailwindcss";\\n\\n@theme {\\n'

for k, v in colors.items():
    css += f'  --color-{k}: {v};\\n'

for k, v in fonts.items():
    css += f'  --font-size-{k}: {v};\\n'

css += '  --font-headline-xl-mobile: "Playfair Display";\\n'
css += '  --font-headline-xl: "Playfair Display";\\n'
css += '  --font-headline-lg-mobile: "Playfair Display";\\n'
css += '  --font-headline-lg: "Playfair Display";\\n'
css += '  --font-headline-md: "Playfair Display";\\n'
css += '  --font-headline-sm: "Playfair Display";\\n'
css += '  --font-body-lg: "Inter";\\n'
css += '  --font-body-md: "Inter";\\n'
css += '  --font-body-sm: "Inter";\\n'
css += '  --font-label-md: "Inter";\\n'

css += '}\\n\\n'

css += '''
@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-on-surface);
    -webkit-font-smoothing: antialiased;
  }
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
'''

with open(r"C:\\Users\\ajayk\\OneDrive\\Desktop\\hotle(taj)\\src\\app\\globals.css", "w", encoding="utf-8") as f:
    f.write(css)
print("Updated globals.css")
