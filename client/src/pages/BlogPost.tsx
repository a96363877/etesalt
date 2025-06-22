import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@shared/schema";

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
  });

  const { data: recentPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts/recent?limit=3"],
    queryFn: async () => {
      const response = await fetch("/api/blog-posts/recent?limit=3");
      if (!response.ok) throw new Error("Failed to fetch recent posts");
      return response.json();
    },
  });

  const categoryColors: Record<string, string> = {
    networks: "bg-primary text-primary-foreground",
    cybersecurity: "bg-red-600 text-white",
    ai: "bg-purple-600 text-white",
    iot: "bg-green-600 text-white",
    cloud: "bg-blue-600 text-white",
    emerging: "bg-orange-600 text-white",
  };

  const categoryLabels: Record<string, string> = {
    networks: "شبكات الاتصال",
    cybersecurity: "الأمن السيبراني",
    ai: "الذكاء الاصطناعي",
    iot: "إنترنت الأشياء",
    cloud: "الحوسبة السحابية",
    emerging: "تقنيات ناشئة",
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="w-full h-64 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
          <p className="text-gray-600 mb-8">عذراً، لم يتم العثور على المقال المطلوب.</p>
          <Link href="/blog">
            <Button>العودة إلى المقالات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">الرئيسية</Link></li>
            <li><i className="fas fa-chevron-left mx-2"></i></li>
            <li><Link href="/blog" className="hover:text-primary">المقالات</Link></li>
            <li><i className="fas fa-chevron-left mx-2"></i></li>
            <li className="text-gray-900">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <Badge className={categoryColors[post.category] || "bg-gray-500 text-white"}>
              {categoryLabels[post.category] || post.category}
            </Badge>
            <span className="text-gray-500 mr-4">{post.publishedAt}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-800 leading-relaxed"
          />
        </article>

        {/* Related Posts */}
        {recentPosts && recentPosts.length > 0 && (
          <section className="border-t pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">مقالات ذات صلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.filter(p => p.slug !== post.slug).slice(0, 3).map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
