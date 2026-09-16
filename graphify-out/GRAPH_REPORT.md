# Graph Report - hotle(taj)  (2026-09-16)

## Corpus Check
- 46 files · ~12,527 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .ico 1, .css 1)

## Summary
- 180 nodes · 216 edges · 25 communities (11 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec066085`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dollar Hotel Product Requirements
- package.json
- app/page.tsx
- react
- compilerOptions
- dependencies
- database.types.ts
- devDependencies
- layout.tsx
- generate_components.js
- scripts
- eslint.config.mjs
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `supabase` - 9 edges
3. `Dollar Hotel Product Requirements` - 8 edges
4. `react` - 7 edges
5. `framer-motion` - 6 edges
6. `Dollar Hotel Project Handoff Overview` - 6 edges
7. `scripts` - 5 edges
8. `Phased Implementation Tasks` - 5 edges
9. `Cinematic First-Visit Entrance` - 5 edges
10. `Agent Working Rules & Boundaries` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Cinematic First-Visit Entrance` --conceptually_related_to--> `First-Visit State Storage (localStorage)`  [INFERRED]
  PRD.md → TRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Festival Offers & Promotions`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Hotel Rules & Policies Section`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Unfinalized Content Placeholders` --conceptually_related_to--> `Standard & Premium Room Presentation`  [INFERRED]
  OPEN-QUESTIONS.md → PRD.md
- `Visual Inspiration vs Scope Guardrail` --conceptually_related_to--> `No Booking Engine Rule`  [INFERRED]
  DESIGN.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cinematic First-Visit Entrance System** — prd_cinematic_entrance, agents_single_visit_door_intro_rule, trd_first_visit_persistence, design_design_spec [EXTRACTED 1.00]
- **Supabase-Backed Content Management System** — prd_admin_content_management, trd_supabase_backend, trd_supabase_auth_rls, tasks_phase3_admin_panel [EXTRACTED 1.00]
- **Offline WhatsApp Booking Pipeline** — prd_customer_journey, prd_whatsapp_cta, agents_no_booking_engine_rule, trd_whatsapp_deeplink, agents_whatsapp_editable_rule [EXTRACTED 1.00]

## Communities (25 total, 2 thin omitted)

### Community 0 - "Dollar Hotel Product Requirements"
Cohesion: 0.11
Nodes (29): Agent Working Rules & Boundaries, No Booking Engine Rule, Once-Per-Visitor Door Animation Rule, Central WhatsApp Config Rule, Visual Direction & Luxury Aesthetic, Visual Inspiration vs Scope Guardrail, Photography-Led Sectional Layout, Open Questions & Unfinalized Content (+21 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (19): name, private, version, eslint, eslint-config-next, lucide-react, react-dom, @react-three/drei (+11 more)

### Community 2 - "app/page.tsx"
Cohesion: 0.15
Nodes (12): @supabase/supabase-js, Amenities(), FloatingWhatsApp(), Gallery(), Hero(), LocationFooter(), Navigation(), OffersSection() (+4 more)

### Community 3 - "react"
Cohesion: 0.14
Nodes (6): framer-motion, react, RoomsSection(), cn(), ElitePlanCardProps, GlassRoomCard

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, framer-motion, lucide-react, next, react, react-dom, @react-three/drei, @react-three/fiber (+5 more)

### Community 6 - "database.types.ts"
Cohesion: 0.20
Nodes (9): CompositeTypes, Constants, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables, TablesInsert (+1 more)

### Community 7 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 8 - "layout.tsx"
Cohesion: 0.25
Nodes (5): nextConfig, next, inter, metadata, playfair

### Community 9 - "generate_components.js"
Cohesion: 0.40
Nodes (4): components, dir, fs, path

### Community 10 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **82 isolated node(s):** `eslintConfig`, `fs`, `path`, `dir`, `components` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 108 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@supabase/supabase-js` connect `app/page.tsx` to `package.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `package.json`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `fs`, `path` to the rest of the system?**
  _82 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dollar Hotel Product Requirements` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._