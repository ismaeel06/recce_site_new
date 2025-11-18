"use client";
import { useState, useRef } from "react";
import BlogCard from "@/components/blog/BlogCard";

export default function RecentBlogsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const recentBlogs = [
    {
      id: 1,
      title: "In a world overflowing with choices and where Content Overload is a problem...",
      date: "Sunday, 1 Jan 2023",
      image: "/assets/writing.webp"
    },
    {
      id: 2,
      title: "With around 100 Alpha testers on Recce, we're already changing what people...",
      date: "Sunday, 1 Jan 2023",
      image: "/assets/writing.webp"
    },
    {
      id: 3,
      title: "Thrilled to introduce Recce's new Marketing team",
      date: "Sunday, 1 Jan 2023",
      image: "/assets/writing.webp"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % recentBlogs.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + recentBlogs.length) % recentBlogs.length);
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

  return (
    <section className="py-16 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Recent Blog <span className="text-orange-600">Posts</span>
          </h2>
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-2 border border-gray-600 text-white rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors text-sm md:text-base"
          >
            View All
          </a>
        </div>

        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              date={blog.date}
              image={blog.image}
              href={`/blog/${blog.id}`}
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
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="w-full flex-shrink-0 px-4">
                    <BlogCard
                      title={blog.title}
                      date={blog.date}
                      image={blog.image}
                      href={`/blog/${blog.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {recentBlogs.map((_, index) => (
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