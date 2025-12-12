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
    <section className="py-16 bg-[#2A2A2A]">
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
          <div className="relative -mx-4 sm:-mx-6 md:-mx-4">
            {/* Carousel Container */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(calc(-${activeSlide * 100}% + 50vw - 50%))` }}>
                {blogs.map((blog) => (
                  <div key={blog.documentId} className="w-full flex-shrink-0 px-4 sm:px-6 md:px-4 flex justify-center">
                    <div className="w-full sm:max-w-sm md:max-w-md">
                      <BlogCard
                        title={blog.title}
                        date={formatBlogDate(blog.publishedAt)}
                        image={getStrapiImageUrl(blog.featuredImage) || "/assets/writing.webp"}
                        href={`/gossip/${blog.slug}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls - Arrows and Dots */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#4A4A4A] hover:bg-[#3A3A3A] transition-colors"
              aria-label="Previous slide"
            >
              <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#FFFFFFCCCCCC" strokeWidth="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#FFFFFF"></path> </g></svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2">
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

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#4A4A4A] hover:bg-[#3A3A3A] transition-colors"
              aria-label="Next slide"
            >
              <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#FFFFFF"></path> </g></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}