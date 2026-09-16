# TASKS — Suggested Build Phases

## Phase 0 — Backend setup
- Supabase project: schema for rooms, prices, offers, hotel content, WhatsApp number
- Supabase Storage buckets for room/hotel photos and videos
- Supabase Auth: owner-only account, RLS policies restricting writes to the owner

## Phase 1 — Core public site
- Homepage (with placeholder hero content)
- Door-opening intro sequence + "seen before, skip it" logic
- Standard Room page/section
- Premium Room page/section
- "Ask on WhatsApp" CTA wired to room-specific pre-filled messages
- Mobile-first responsive layout

## Phase 2 — Supporting content sections
- Location/map section
- Hotel rules/policies section (placeholder content until owner provides real rules)
- Festival offers/promotions block (with its own WhatsApp CTA)

## Phase 3 — Admin panel
- Owner login (Supabase Auth, RLS-restricted)
- Edit room info, prices, photos, videos (Standard/Premium)
- Edit facilities list and hotel info/text
- Create/edit/remove offers, including festival offers
- Edit hotel rules text
- Edit the WhatsApp number (confirm it propagates to every CTA)

## Phase 4 — Polish (pending decisions)
- Performance pass (intro sequence load time on mobile data)
- Basic on-page SEO
- Multilingual support — only if confirmed as required
- Swap all placeholder content for real hotel content once supplied

Each phase should be demo-able on its own before moving to the next — Phase 1 alone is a usable "showcase → WhatsApp" site even without the admin panel.
