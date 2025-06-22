import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal" | "featured";
}

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

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "horizontal") {
    return (
      <Card className="bg-gray-50 hover:shadow-md transition-shadow">
        <div className="flex">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-32 h-32 object-cover flex-shrink-0 rounded-r-lg"
          />
          <CardContent className="p-4 flex-1">
            <div className="flex items-center mb-2">
              <Badge className={categoryColors[post.category] || "bg-gray-500 text-white"}>
                {categoryLabels[post.category] || post.category}
              </Badge>
              <span className="text-gray-500 text-sm mr-2">{post.publishedAt}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h4 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </h4>
            </Link>
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white hover:shadow-md transition-shadow overflow-hidden">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className={categoryColors[post.category] || "bg-gray-500 text-white"}>
            {categoryLabels[post.category] || post.category}
          </Badge>
          <span className="text-gray-500 text-sm mr-3">{post.publishedAt}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h4>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <span className="text-primary font-medium hover:text-blue-700 transition-colors cursor-pointer">
            اقرأ المزيد <i className="fas fa-arrow-left mr-2"></i>
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
