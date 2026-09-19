DELETE FROM public.chapter_subscribers WHERE email IN ('playwright-test@example.com', 'curl-test@example.com', 'curl-test2@example.com');
DELETE FROM public.sponsor_leads WHERE email = 'sponsor-test@example.com';
DELETE FROM public.chapter_applications WHERE email = 'chapter-test@example.com';