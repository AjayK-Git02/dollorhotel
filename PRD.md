# PRD — Dollar Hotel Website

## 1. Business Context

Dollar Hotel is a mid-range hotel. The owner also runs a PG, a restaurant, and a pizza shop — **those are separate businesses and are explicitly out of scope for this project.** This project covers Dollar Hotel only.

The website must make the hotel look professional, trustworthy, and attractive, and make its rooms easy to understand.

## 2. Current Customer Journey (as-is)

```
Banner/Billboard ad → Customer messages on WhatsApp → Owner checks Excel
→ Owner gives availability & price → Negotiation → Customer confirms
→ Advance/payment → Booking
```

WhatsApp is the real booking channel today. The owner personally handles the conversation and checks availability separately (Excel or another app).

## 3. Product Goal

**The website does not replace this process.** Its job is to present the hotel well and convert visitors into a WhatsApp conversation — not to become a booking system.

Target journey:

```
Website → View Room → Understand Room → "Ask on WhatsApp" → Owner takes over
(availability, price, negotiation, booking all handled by the owner as today)
```

## 4. Core Features

### 4.1 WhatsApp CTA (critical feature)
- Every room section has an **"Ask on WhatsApp"** button.
- Clicking it opens WhatsApp with a **pre-written message that names the room type** the visitor was looking at, e.g.:
  - Standard Room: *"Hi, I saw Dollar Hotel's website. I want to know the availability and price for a Standard Room."*
  - Premium Room: *"Hi, I saw Dollar Hotel's website. I want to know the availability and price for a Premium Room."*
- The owner takes it from there — availability, pricing, negotiation, payment, confirmation are all manual and out of scope for the website.
- The WhatsApp number itself is admin-editable — changing it updates every CTA on the site automatically. Never hard-code the number in the UI.

### 4.2 Cinematic first-visit entrance
- First-time visitors see: large hotel doors → doors slowly open → hotel video/image sequence → Dollar Hotel branding reveal → main site.
- This intro plays **only on the visitor's first visit** (e.g. remembered via local storage/cookie) — not on every page load or return visit.
- Must not become annoying or slow down repeat visitors.

### 4.3 Room presentation
- Two room types: **Standard** and **Premium**.
- Both include basic facilities (incl. AC).
- Premium is differentiated by: bigger room, better interior, better bed, better bathroom, better TV, better view, more space, better decoration.
- The difference must be clear without making the UI confusing.

### 4.4 Hotel information customers typically ask about
Room photos/videos, room types, price *range* (not live pricing), hotel location/map, facilities, festival offers/promotions, hotel rules. **The site should not claim to show live/real-time availability** — that stays a WhatsApp conversation.

### 4.5 Festival offers / promotions
- Must be easy to change/update, not hard-coded — a new offer should be publishable without a code change.
- Pattern: Offer → details → "Ask on WhatsApp".

### 4.6 Hotel rules section
- A dedicated place for policies/rules.
- **Do not invent rules** — placeholder/demo content only until the owner supplies real rules.

### 4.7 Location
- A map/location section so customers can find the hotel.
- Exact address and coordinates to be supplied by the owner (see OPEN-QUESTIONS.md).

### 4.8 Admin panel (separate from the customer site)
Owner-only access — no staff accounts at this stage. Lets the owner update the website **without touching code**:
- Room information (Standard/Premium details)
- Room and hotel photos and videos (upload, replace, delete)
- Room prices (displayed price, not a live booking price)
- Facilities list
- Hotel information/text
- Offers and promotions, including festival offers
- Hotel rules/policies
- The WhatsApp number (propagates to every CTA on the site automatically)
- Other general site content where reasonable

**Important scope boundary:** the admin panel is a **content management tool only**. It is *not* a reservation/booking management system — that continues to be Excel + WhatsApp, unless a future project explicitly changes this.

## 5. Selling Points to Communicate

Affordable price, good location, good rooms, cleanliness, AC/facilities, privacy, family-friendly, couple-friendly, optional paid food/restaurant service.

⚠️ **Do not add or imply facilities/services the owner hasn't confirmed.** Everything here is illustrative content pending owner-provided real copy.

## 6. Explicitly Out of Scope

- Online booking / reservation flow (date selection, payment, account creation)
- Live/real-time room availability
- A full hotel reservation-management system in the admin panel
- The owner's other businesses (PG, restaurant, pizza shop)
- Inventing facilities, rules, prices, or offers not confirmed by the owner

## 7. Design Philosophy

**Confirmed direction:** premium, cinematic, elegant, modern, and professionally designed — not a budget or generic hotel template.

Should feel like a real hotel brand website — not a generic template or a CRUD app. Priorities: strong visuals, clear room differentiation, smooth (not slow) animation, professional typography, trust, easy navigation, strong WhatsApp CTA, mobile-first, fast loading, easy-to-update content, simple customer journey.

## 8. Success Criteria

A visitor can, within a couple of minutes on mobile or desktop: understand what Dollar Hotel is, see the difference between Standard and Premium rooms, and reach a WhatsApp conversation with the room type already identified — with no dead ends, no fake booking flow, and no invented information.
