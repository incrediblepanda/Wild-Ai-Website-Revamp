-- Data API grants for the multi-chapter tables (public read for directory data,
-- anonymous insert for lead capture; admin reads go through RLS policies).

-- Public, read-only directory data
GRANT SELECT ON public.chapters TO anon, authenticated;
GRANT SELECT ON public.chapter_organizers TO anon, authenticated;
GRANT SELECT ON public.chapter_events TO anon, authenticated;

-- Anonymous lead capture
GRANT INSERT ON public.chapter_subscribers TO anon;
GRANT INSERT ON public.sponsor_leads TO anon;
GRANT INSERT ON public.chapter_applications TO anon;

-- Service role full access (edge functions / admin tooling)
GRANT ALL ON public.chapters TO service_role;
GRANT ALL ON public.chapter_organizers TO service_role;
GRANT ALL ON public.chapter_events TO service_role;
GRANT ALL ON public.chapter_subscribers TO service_role;
GRANT ALL ON public.sponsor_leads TO service_role;
GRANT ALL ON public.chapter_applications TO service_role;
