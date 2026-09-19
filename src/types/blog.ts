export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string;
  og_image_url: string | null;
  meta_description: string | null;
  category: string | null;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  limit: number;
  offset: number;
}

export interface SingleBlogPostResponse {
  post: BlogPost;
}
