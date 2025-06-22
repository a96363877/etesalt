import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const category = urlParams.get("category");
    
    if (search) setSearchTerm(search);
    if (category) setSelectedCategory(category);
  }, []);

  const { data: allPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts/search", searchTerm],
    enabled: !!searchTerm,
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Search failed");
      return response.json();
    },
  });

  const { data: categoryPosts, isLoading: categoryLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/categories", selectedCategory, "posts"],
    enabled: !!selectedCategory,
    queryFn: async () => {
      const response = await fetch(`/api/categories/${selectedCategory}/posts`);
      if (!response.ok) throw new Error("Failed to fetch category posts");
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL without navigation
    const url = new URL(window.location.href);
    if (searchTerm) {
      url.searchParams.set("search", searchTerm);
    } else {
      url.searchParams.delete("search");
    }
    window.history.pushState({}, "", url.toString());
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    window.history.pushState({}, "", window.location.pathname);
  };

  // Determine which posts to display
  let postsToDisplay = allPosts;
  let loading = isLoading;

  if (searchTerm && searchResults) {
    postsToDisplay = searchResults;
    loading = searchLoading;
  } else if (selectedCategory && categoryPosts) {
    postsToDisplay = categoryPosts;
    loading = categoryLoading;
  }

  const categoryLabels: Record<string, string> = {
    networks: "شبكات الاتصال",
    cybersecurity: "الأمن السيبراني",
    ai: "الذكاء الاصطناعي",
    iot: "إنترنت الأشياء",
    cloud: "الحوسبة السحابية",
    emerging: "تقنيات ناشئة",
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchTerm ? `نتائج البحث عن: "${searchTerm}"` : 
             selectedCategory ? `مقالات ${categoryLabels[selectedCategory] || selectedCategory}` : 
             "جميع المقالات"}
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="البحث في المقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i className="fas fa-search text-gray-400"></i>
                </button>
              </div>
            </form>
            
            {(searchTerm || selectedCategory) && (
              <Button variant="outline" onClick={clearFilters}>
                مسح الفلاتر
              </Button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([slug, label]) => (
              <Button
                key={slug}
                variant={selectedCategory === slug ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(selectedCategory === slug ? "" : slug);
                  const url = new URL(window.location.href);
                  if (selectedCategory === slug) {
                    url.searchParams.delete("category");
                  } else {
                    url.searchParams.set("category", slug);
                  }
                  window.history.pushState({}, "", url.toString());
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : postsToDisplay && postsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على مقالات</h3>
            <p className="text-gray-600">جرب البحث بكلمات مختلفة أو تصفح جميع المقالات</p>
            <Button className="mt-4" onClick={clearFilters}>
              عرض جميع المقالات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
