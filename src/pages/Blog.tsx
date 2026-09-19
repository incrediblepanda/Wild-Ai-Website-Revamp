import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/BlogPostCard';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const { data, isLoading, error } = useBlogPosts();

  return (
    <>
      <Helmet>
        <title>Blog | Wild AI</title>
        <meta name="description" content="Stay updated with the latest insights on AI development, research, and community events from Wild AI." />
        <meta property="og:title" content="Blog | Wild AI" />
        <meta property="og:description" content="Stay updated with the latest insights on AI development, research, and community events from Wild AI." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-primary mb-4">
                  Blog
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Insights, updates, and stories from the Wild AI community.
                </p>
              </header>

              {isLoading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-video w-full" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="text-center py-16">
                  <p className="text-destructive">Failed to load blog posts. Please try again later.</p>
                </div>
              )}

              {data && data.posts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
                </div>
              )}

              {data && data.posts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
