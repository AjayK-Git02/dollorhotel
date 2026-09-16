# DESIGN.md — Visual Direction

Reference point: premium hotel-group sites (e.g. Taj Hotels) for the *feel* — cinematic, elegant, unhurried. Scope stays exactly what's defined in `PRD.md`: one hotel, two room types, no booking engine. Don't import a luxury group's feature set along with its aesthetic.

## What to borrow

- **Full-bleed video/image hero** that plays automatically — the cinematic first impression. In our case this is the door-opening intro (see PRD §4.2), then a full-bleed hero of the hotel itself.
- **Minimal, elegant sticky nav** that stays unobtrusive over hero imagery — a handful of links, not a mega-menu.
- **Photography-led sections** — a large image first, then a short caption. Not paragraphs of marketing copy.
- **Refined typography**: a confident display font for headings, a simple readable sans for body text, generous whitespace between sections.
- **Smooth scroll-triggered transitions** between sections rather than static blocks stacked with no rhythm.
- **A persistent, elegant contact affordance** — for us, that's the WhatsApp CTA, not buried at the bottom of the page.
- **Card/carousel pattern for browsable content** — reused here for room types and offers, not a dozen restaurant brands.

## What NOT to copy

These exist because a hotel *group* has them — Dollar Hotel doesn't, and adding them would contradict the PRD:

- Online booking engine / rate calendar — WhatsApp is the only booking path (PRD §2–3)
- Membership/loyalty program section
- Multi-property "destinations" directory — this is one hotel, one location
- A portfolio of individually branded in-house restaurants — food service here is a separate business, out of scope (PRD §1)
- Weddings/events/conferences microsites — not confirmed as a real offering
- A massive SEO footer of city/location links — that only makes sense at 80+ property scale

## Section-by-section translation for Dollar Hotel

1. **Intro** — door animation (first visit only) → full-bleed hero video/image of the hotel
2. **Hotel intro strip** — one short paragraph + selling points as icons/short tags, not a wall of text
3. **Rooms** — Standard and Premium, each: large photo, 3–5 line description, short feature list, **"Ask on WhatsApp"** CTA (this replaces "Book Now")
4. **Offers/promotions** — simple card or carousel strip, admin-editable, same visual polish as a luxury "offers" section, but every CTA opens WhatsApp
5. **Facilities** — icon + label grid, not prose
6. **Location** — styled map section, not a bare embedded iframe
7. **Hotel rules** — a quiet, collapsible text block — visually the least prominent section on the site
8. **Footer** — WhatsApp contact, address, social links if any. No newsletter signup, no multi-brand portfolio links.

## Guardrail

Premium ≠ ornate or content-dense. The cinematic feeling should come from photography quality and pacing, not from adding more sections. If a feature only makes sense because a hotel group has 150 properties, it doesn't belong here.
