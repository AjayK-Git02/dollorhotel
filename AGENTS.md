# AGENTS.md — Instructions for AI Coding Agents

Read this before writing any code. Then read `PRD.md`, `TRD.md`, and `DESIGN.md`.

## Scope

This project is **Dollar Hotel only**. The owner has other businesses (PG, restaurant, pizza shop) — never reference, build for, or scaffold anything related to them.

## Confirmed Stack

- Backend / database / auth / storage: **Supabase** (Postgres + Storage + Auth + RLS)
- Frontend: leaning **Next.js/React** — fine to scaffold with, but not a fully locked decision
- Hosting: leaning Vercel + Supabase, not fully locked — don't build in assumptions that would block switching

## Hard rules — do not violate these

1. **Do not build an online booking/reservation system.** No date pickers tied to a booking flow, no payment integration, no "confirm booking" flow. The only booking-adjacent action allowed is the "Ask on WhatsApp" button.
2. **Do not invent facts.** Prices, the hotel address, facilities, hotel rules, and offers are not finalized. Use clearly-marked placeholder content (e.g. `[PLACEHOLDER: hotel address]`) instead of making something up. Log anything you had to placeholder in `OPEN-QUESTIONS.md` if it's not already listed there.
3. **The admin panel manages content, not bookings.** It edits images, text, prices-as-displayed, and offers. It does not manage reservations, guests, or availability.
4. **The door-intro animation plays once per visitor**, not on every visit — implement and test the "seen before" logic, don't skip it.
5. **Don't hard-code demo media paths** into components — route them through a config/data layer so they're swappable later.
6. **Never hard-code the WhatsApp number.** It lives in Supabase and is admin-editable; every CTA must read it from there so an owner's change propagates everywhere at once.
7. **Visual inspiration ≠ feature scope.** The premium/cinematic look is inspired by luxury hotel-group sites (see `DESIGN.md`), but do not add their features — no booking engine, no memberships, no multi-property directory, no restaurant portfolio. Borrow the aesthetic, not the feature list.

## When something isn't specified

Check `OPEN-QUESTIONS.md` first. If it's covered there, use a sensible placeholder and move on — don't stop and wait. If it's a genuinely new open question not already listed, add it there rather than guessing silently.

## Definition of done (per feature)

- Matches the relevant section of `PRD.md`
- Works on mobile first, then verify desktop
- No fabricated hotel-specific facts shipped as if real
- Placeholder content is visibly/comment-flagged as placeholder

## Suggested build order

See `TASKS.md` for phasing. Don't build the admin panel's full feature set before the public site's core pages exist — the public site (rooms + WhatsApp CTA) is the priority.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
