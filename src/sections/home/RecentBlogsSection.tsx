"use client";
import { useState, useRef, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { getLatestBlogs, formatBlogDate, getStrapiImageUrl } from "@/lib/strapi";
import { Blog } from "@/types/strapi";

export default function RecentBlogsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getLatestBlogs(3);
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching latest blogs:", err);
        setError("Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  if (loading || error || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Recent Blog <span className="text-[#ff7802]">Posts</span>
          </h2>
          <a
            href="/gossip"
            className="inline-flex items-center px-6 py-2 border border-white text-white rounded-xl hover:border-[#ff7802] hover:text-[#ff7802] transition-colors text-sm md:text-base"
          >
            View All
          </a>
        </div>

        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.documentId}
              title={blog.title}
              date={formatBlogDate(blog.publishedAt)}
              image={getStrapiImageUrl(blog.featuredImage) || "/assets/writing.webp"}
              href={`/gossip/${blog.slug}`}
            />
          ))}
        </div>

        {/* Mobile Carousel - Visible on Mobile and Tablet */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {blogs.map((blog) => (
                  <div key={blog.documentId} className="w-full flex-shrink-0 px-4">
                    <BlogCard
                      title={blog.title}
                      date={formatBlogDate(blog.publishedAt)}
                      image={getStrapiImageUrl(blog.featuredImage) || "/assets/writing.webp"}
                      href={`/gossip/${blog.slug}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-2xl transition-all ${index === activeSlide ? "bg-white w-10" : "bg-gray-600 w-4"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}