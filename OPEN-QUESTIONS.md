# Open Questions — Not Yet Decided

Nothing below should be guessed or invented as real content. Use placeholders until answered.

## Content
- Exact room prices
- Exact hotel address / map coordinates
- Exact facilities list (not to be invented)
- Exact hotel rules/policies
- Exact festival offers and their terms
- Real room photography and video (demo assets are the confirmed placeholder approach until these arrive)

## Design
- Homepage section order/layout
- Navigation/menu structure
- Hotel logo and branding
- Color palette and typography
- Final animation/video/transition treatment for the door-opening intro (confirmed: cinematic, first-visit only — the visual execution itself is still open)

## Admin
- Whether analytics are needed in the admin panel

## Technical
- Final frontend framework — leaning Next.js/React, not fully locked
- Final hosting/deployment target — leaning Vercel + Supabase if Next.js is confirmed, not fully locked
- Domain
- Whether SEO work is in scope for this phase
- Whether multilingual support is needed

---
**Resolved since last update** (now confirmed in `PRD.md`/`TRD.md`): admin access is owner-only, no staff accounts; full list of admin-editable content fields; the WhatsApp number is admin-editable and must propagate to every CTA automatically; backend/database/auth/storage is Supabase (Postgres + Storage + Auth + RLS); single-hotel architecture (no multi-hotel support needed); booking management/database is not required.

As remaining items get answered, move them into `PRD.md` or `TRD.md` as confirmed requirements and delete them from this list.
