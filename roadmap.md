# Roadmap — Wild AI multi-chapter rebuild

Source: wild-ai-page-inventory.xlsx (full scope, DB-backed, placeholder content).

## Phase 1 — Data foundation (done)
- [x] Database tables: chapters, chapter_organizers, chapter_events, chapter_subscribers, sponsor_leads, chapter_applications (RLS + GRANTs)
- [x] Seed MSP (active), San Francisco & Toronto (launching), organizers, 4 MSP events
- [x] Regenerate Supabase types

## Phase 2 — Shared components (done)
- [x] useChapters hooks (chapters, events, organizers, formatting)
- [x] EmailCapture (upsert, dedupe by email+source)
- [x] ChapterSwitcher (localStorage 'wildai-chapter')
- [x] ChapterDirectoryPreview, UpcomingEvents, SpeakerCtaBand, SponsorCtaBand

## Phase 3 — New pages (done)
- [x] /chapters, /:city (ChapterPage), /events, /events/:slug (EventDetail)
- [x] /speak, /sponsor, /start-a-chapter, /about, /press, /join
- [x] App.tsx routes (/:city above catch-all), Navbar, Footer
- [x] Index.tsx home sections

## Phase 4 — Verification (done)
- [x] All 11 routes render in preview with no console errors (Playwright)
- [x] Fixed: missing GRANTs on all new tables (anon reads/inserts were 401/403)
- [x] Fixed: upsert on_conflict rejected by RLS — switched subscriber forms to plain insert, duplicates treated as already-subscribed
- [x] Fixed: /events showed empty when no upcoming events — now falls back to past events
- [x] Fixed: chapters map pinned wrong place — switched to OpenStreetMap embed
- [x] Join, footer signup, sponsor form, and chapter application all write to the database (verified end to end, test rows removed)

## Phase 5 — Later / blocked on user
- [ ] Secrets RESEND_API_KEY, ADMIN_PASSWORD, POSTMARK_SERVER_TOKEN, POSTMARK_FROM_EMAIL — user declined secure form twice; re-open only on request
- [ ] Replace placeholder content (press mentions, media kit zip, sponsor pricing, press@wildai.us) with real assets
- [ ] Blog expansion per spreadsheet (existing /blog kept)

## Phase 6 — Experiential redesign
- [x] Inventory and preserve all current routes, forms, and data connections
- [x] Apply editorial cyberpunk system across shared navigation and every public page
- [x] Hide blog entry points while preserving direct blog URLs
- [x] Verify desktop, mobile, reduced motion, routes, and primary interactions

## Phase 7 — Raw cyberpunk art direction
- [x] Match the supplied reference's dense editorial grid, hard typography, image treatment, and technical overlays
- [x] Strengthen the shared visual system without changing routes, copy, forms, or data behavior
- [x] Verify the revised chapters experience and shared navigation on desktop and mobile

## Phase 8 — 2026 event history
- [x] Add the supplied May–September venues, attendance, speakers, roles, and topics to the shared content
- [x] Verify past-event, past-speaker, and matching event-detail views

## Phase 9 — Simple modern redesign
- [x] Replace cyberpunk styling with a simple, modern visual system
- [x] Keep color use restrained and preserve all content and functionality
- [x] Verify key pages and navigation on desktop and mobile
