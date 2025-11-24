'use client';

import { useState, useRef } from 'react';
import Card from '@/components/gossip/Card';
import { RelatedBlog } from '@/types/strapi';
import { getStrapiImageUrl, formatBlogDate } from '@/lib/strapi';

interface MoreToExploreProps {
  blogs: RelatedBlog[];
}

export default function MoreToExplore({ blogs }: MoreToExploreProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  return (
    <section className="bg-[#FFFFFF1A] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">
          More To Explore
        </h2>

        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog.documentId}
              imgUrl={getStrapiImageUrl(blog.featuredImage)}
              description={blog.content}
              date={formatBlogDate(blog.publishedAt)}
              tag={blog.tag}
              slug={blog.slug}
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
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {blogs.map((blog) => (
                  <div key={blog.documentId} className="w-full flex-shrink-0 px-4">
                    <Card
                      imgUrl={getStrapiImageUrl(blog.featuredImage)}
                      description={blog.content}
                      date={formatBlogDate(blog.publishedAt)}
                      tag={blog.tag}
                      slug={blog.slug}
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
                className={`h-1 rounded-2xl transition-all ${
                  index === activeSlide ? 'bg-white w-10' : 'bg-gray-600 w-4'
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
