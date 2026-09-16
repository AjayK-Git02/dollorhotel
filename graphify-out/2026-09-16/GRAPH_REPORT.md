# Graph Report - hotle(taj)  (2026-09-14)

## Corpus Check
- Corpus is ~3,371 words - fits in a single context window. You may not need a graph.

## Summary
- 29 nodes · 44 edges · 4 communities
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Backend & Admin CMS Infrastructure
- Cinematic Aesthetic & Offline Journey Guardrails
- Product Specifications & Content Placeholders
- Public Site WhatsApp CTA Flow

## God Nodes (most connected - your core abstractions)
1. `Dollar Hotel Product Requirements` - 8 edges
2. `Dollar Hotel Project Handoff Overview` - 6 edges
3. `Agent Working Rules & Boundaries` - 5 edges
4. `Cinematic First-Visit Entrance` - 5 edges
5. `Phased Implementation Tasks` - 5 edges
6. `Unfinalized Content Placeholders` - 5 edges
7. `WhatsApp CTA with Contextual Pre-fill` - 4 edges
8. `Owner Content Management Admin Panel` - 4 edges
9. `Dollar Hotel Technical Requirements` - 4 edges
10. `Supabase Postgres & Storage Backend` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Cinematic First-Visit Entrance` --conceptually_related_to--> `First-Visit State Storage (localStorage)`  [INFERRED]
  PRD.md → TRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Standard & Premium Room Presentation`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Festival Offers & Promotions`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Hotel Rules & Policies Section`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Agent Working Rules & Boundaries` --references--> `Unfinalized Content Placeholders`  [EXTRACTED]
  AGENTS.md → OPEN-QUESTIONS.md

## Hyperedges (group relationships)
- **Offline WhatsApp Booking Pipeline** — prd_customer_journey, prd_whatsapp_cta, agents_no_booking_engine_rule, trd_whatsapp_deeplink, agents_whatsapp_editable_rule [EXTRACTED 1.00]
- **Cinematic First-Visit Entrance System** — prd_cinematic_entrance, agents_single_visit_door_intro_rule, trd_first_visit_persistence, design_design_spec [EXTRACTED 1.00]
- **Supabase-Backed Content Management System** — prd_admin_content_management, trd_supabase_backend, trd_supabase_auth_rls, tasks_phase3_admin_panel [EXTRACTED 1.00]

## Communities (4 total, 0 thin omitted)

### Community 0 - "Backend & Admin CMS Infrastructure"
Cohesion: 0.24
Nodes (10): Central WhatsApp Config Rule, Owner Content Management Admin Panel, Phase 0: Supabase Backend & Auth, Phase 2: Location, Rules, Festival Offers, Phase 3: Owner Admin Panel, Phased Implementation Tasks, Next.js / React Frontend Architecture, Supabase Auth & Owner RLS (+2 more)

### Community 1 - "Cinematic Aesthetic & Offline Journey Guardrails"
Cohesion: 0.25
Nodes (9): Agent Working Rules & Boundaries, No Booking Engine Rule, Once-Per-Visitor Door Animation Rule, Visual Direction & Luxury Aesthetic, Visual Inspiration vs Scope Guardrail, Photography-Led Sectional Layout, Cinematic First-Visit Entrance, Target WhatsApp Customer Journey (+1 more)

### Community 2 - "Product Specifications & Content Placeholders"
Cohesion: 0.43
Nodes (7): Open Questions & Unfinalized Content, Unfinalized Content Placeholders, Festival Offers & Promotions, Hotel Rules & Policies Section, Dollar Hotel Product Requirements, Standard & Premium Room Presentation, Dollar Hotel Project Handoff Overview

### Community 3 - "Public Site WhatsApp CTA Flow"
Cohesion: 0.67
Nodes (3): WhatsApp CTA with Contextual Pre-fill, Phase 1: Core Public Site & Intro, WhatsApp Deep Link Integration (wa.me)

## Knowledge Gaps
- **5 isolated node(s):** `Next.js / React Frontend Architecture`, `WhatsApp Deep Link Integration (wa.me)`, `First-Visit State Storage (localStorage)`, `Photography-Led Sectional Layout`, `Phase 2: Location, Rules, Festival Offers`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 5 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dollar Hotel Product Requirements` connect `Product Specifications & Content Placeholders` to `Backend & Admin CMS Infrastructure`, `Cinematic Aesthetic & Offline Journey Guardrails`, `Public Site WhatsApp CTA Flow`?**
  _High betweenness centrality (0.335) - this node is a cross-community bridge._
- **Why does `Dollar Hotel Project Handoff Overview` connect `Product Specifications & Content Placeholders` to `Backend & Admin CMS Infrastructure`, `Cinematic Aesthetic & Offline Journey Guardrails`?**
  _High betweenness centrality (0.327) - this node is a cross-community bridge._
- **Why does `Phased Implementation Tasks` connect `Backend & Admin CMS Infrastructure` to `Product Specifications & Content Placeholders`, `Public Site WhatsApp CTA Flow`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **What connects `Next.js / React Frontend Architecture`, `WhatsApp Deep Link Integration (wa.me)`, `First-Visit State Storage (localStorage)` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._