import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), 'MMM d, yyyy')
    : '';

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {post.og_image_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.og_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            {post.category && (
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
            )}
            {formattedDate && (
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
