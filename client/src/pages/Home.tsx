import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/BlogCard";
import type { BlogPost, Category } from "@shared/schema";

export default function Home() {
  const { data: featuredPosts, isLoading: featuredLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts/featured"],
  });

  const { data: recentPosts, isLoading: recentLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts/recent"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">مرحباً بكم في مدونة الاتصالات</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            نقدم لكم أحدث المقالات والأخبار في عالم التكنولوجيا والاتصالات
          </p>
          <Link href="/blog">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50">
              اكتشف المقالات المميزة
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">المقالات المميزة</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اطّلع على أهم وأحدث المقالات في مجال التكنولوجيا والاتصالات
            </p>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">أحدث المقالات</h3>
            <Link href="/blog">
              <span className="text-primary font-medium hover:text-blue-700 transition-colors cursor-pointer">
                عرض جميع المقالات <i className="fas fa-arrow-left mr-2"></i>
              </span>
            </Link>
          </div>

          {recentLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-gray-50">
                  <div className="flex">
                    <Skeleton className="w-32 h-32 flex-shrink-0" />
                    <div className="p-4 flex-1">
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {recentPosts?.slice(0, 4).map((post) => (
                <BlogCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">التصنيفات</h3>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6 text-center">
                  <Skeleton className="w-12 h-12 mx-auto mb-3 rounded-full" />
                  <Skeleton className="h-5 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories?.map((category) => (
                <Link key={category.id} href={`/blog?category=${category.slug}`}>
                  <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                    <i className={`${category.icon} text-3xl mb-3`} style={{ color: 'var(--primary)' }}></i>
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    <p className="text-gray-500 text-sm">{category.postCount} مقال</p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">اشترك في نشرتنا البريدية</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            احصل على أحدث المقالات والأخبار التقنية مباشرة في بريدك الإلكتروني
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 bg-white text-gray-900"
            />
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-50">
              اشترك الآن
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
