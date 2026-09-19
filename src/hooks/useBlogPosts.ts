import { useQuery } from '@tanstack/react-query';
import type { BlogPostsResponse, SingleBlogPostResponse } from '@/types/blog';

const API_BASE = 'https://dvpymnfifnagfrzknqgl.supabase.co/functions/v1/get-blog-posts';
const ORG_ID = 'd028bdfa-d51c-4063-9523-f709e2866daa';

export const useBlogPosts = () => {
  return useQuery<BlogPostsResponse>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}?orgId=${ORG_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery<SingleBlogPostResponse>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}?orgId=${ORG_ID}&slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });
};
