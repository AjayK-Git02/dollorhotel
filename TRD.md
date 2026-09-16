# TRD — Dollar Hotel Website

This translates `PRD.md` into buildable requirements. Where the exact tech choice hasn't been decided by the team yet, this document gives a **recommended default** so an agent can start building — treat these as defaults to confirm, not fixed decisions. See `OPEN-QUESTIONS.md` for everything genuinely undecided.

## 0. Core Architecture (confirmed)

```
Premium Customer Website
        ↓
Supabase — rooms, prices, offers, media, WhatsApp number, hotel content
        ↓
Owner-only Admin Panel — the only way this content gets written
        ↓
WhatsApp — availability → price → negotiation → booking (manual, owner-handled)
```

The public site only **reads** from Supabase. The admin panel is the sole **write** path. Nothing customer-facing that the owner might reasonably want to change should be hard-coded — it should live in Supabase.

## 1. Site Structure (two separate surfaces)

1. **Public/customer site** — the marketing/presentation site
2. **Admin panel** — content management, likely auth-gated, can be a separate route (e.g. `/admin`) or a separate app

## 2. Public Site — Pages/Sections

- **Entrance/Intro sequence** (first visit only) — see §4
- **Homepage** — hero, hotel highlights, selling points, entry points to rooms
- **Room pages/sections** — Standard, Premium (photo/video gallery, feature list, "Ask on WhatsApp" CTA)
- **Offers/Promotions** — dynamic content block, admin-editable, with its own WhatsApp CTA
- **Hotel Rules/Policies** — static-ish content block, admin-editable
- **Location** — embedded map + address + directions link
- **Contact/WhatsApp** — persistent CTA (e.g. floating WhatsApp button) available site-wide, not just on room pages

## 3. WhatsApp Integration — functional spec

- Use a `wa.me` deep link with a URL-encoded pre-filled message: `https://wa.me/<number>?text=<encoded message>`
- The message text must vary by context (room type at minimum); template it, don't hard-code one global message.
- **Confirmed:** the number is stored in Supabase, not hard-coded. When the owner changes it in the admin panel, every WhatsApp CTA across the site must reflect the new number without a code change or redeploy.
- No booking logic, date pickers, or payment integration triggered by this CTA — it only opens WhatsApp.

## 4. First-Visit Intro Logic

- On load, check a persisted flag (e.g. `localStorage`) for "intro seen."
- If not set: play door-opening intro sequence, then set the flag.
- If set: skip straight to homepage.
- Intro should be skippable/interruptible (don't trap users who've already seen it or want to skip) and must not block indefinitely if assets fail to load.
- Keep the intro assets separate from core homepage assets so it doesn't slow down repeat-visitor load times.

## 5. Asset Handling

- No real photos/videos exist yet — use clearly-sourced demo/placeholder media.
- Do not hard-code demo asset paths throughout the codebase — reference them through a config/data layer so swapping in real media later (ideally via the admin panel) doesn't require touching component code.

## 6. Admin Panel — functional spec

**Confirmed** — content the admin must be able to edit without a code deploy:
- Room information (Standard/Premium details)
- Room prices (displayed price, not a live booking engine)
- Room photos and hotel photos
- Videos
- Facilities list
- Hotel information/text
- Offers/promotions, including festival offers
- Hotel rules/policies
- WhatsApp number (see §3 — must propagate to every CTA automatically)
- Other general site text/content where reasonable

**Confirmed:** image/video management supports upload, replace, and delete directly from the admin panel, backed by Supabase Storage.

Explicitly **not required**: booking calendar, reservation records, payment processing, guest management. If any of this is wanted later, it's a separate project decision.

**Confirmed auth model:** owner-only access, no staff accounts at this stage. Use Supabase Auth with Row Level Security (RLS) policies restricting all write access to the owner's account.

## 7. Non-Functional Requirements

- **Mobile-first**: most customers will likely arrive from ads/social on mobile.
- **Fast loading**: cinematic intro must not tank performance or feel laggy on mid-range phones/mobile data.
- **Content-editable without code changes**: this is a hard requirement, not a nice-to-have — it's the whole point of the admin panel.
- **No fabricated data**: any placeholder content (facilities, rules, prices, address) must be visibly a placeholder in code/comments so it isn't mistaken for real content at launch.

## 8. Stack

**Confirmed:**
- Backend / database: Supabase (PostgreSQL)
- Media storage: Supabase Storage
- Auth: Supabase Auth, owner-only, enforced with RLS policies
- Architecture: single-hotel content system — no multi-hotel/tenant design needed

**Leaning, not fully locked (see OPEN-QUESTIONS.md):**
- Frontend: likely Next.js/React — good fit for an animation-heavy marketing site and integrates cleanly with Supabase, but confirm before deep commitment
- Hosting/deployment: Vercel + Supabase is a natural pairing if Next.js is confirmed, but the hosting decision itself is still open

## 9. Explicitly Deferred / Not This Project

- Real-time availability system
- Online payments
- Full reservation/booking management
- Multilingual support (unless later confirmed as required)
- SEO deep-dive (basic on-page SEO fine, full SEO strategy not required yet)
