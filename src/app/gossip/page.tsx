"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsLetter from "@/sections/home/NewsLetter";
import Card from "@/components/gossip/Card";
import { getBlogsList, formatBlogDate, getStrapiImageUrl } from "@/lib/strapi";
import { Blog } from "@/types/strapi";

export default function GossipPage() {
  const tabs = [
    "All",
    "Film",
    "TV",
    "Interviews",
    "Coming Soon",
    "Festivals",
    "Hidden Gems",
  ];

  const BATCH_SIZE = 4;

  const [activeTab, setActiveTab] = useState<string>("All");
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle window resize
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch blogs from Strapi
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const tag = activeTab === "All" ? undefined : activeTab;
        const data = await getBlogsList(tag, 100, 0); // Fetch up to 100 blogs
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [activeTab]);

  // Reset visible count when device type or active tab changes
  useEffect(() => {
    setVisibleCount(isMobile ? BATCH_SIZE : blogs.length);
  }, [isMobile, activeTab, blogs.length]);

  const visibleBlogs = blogs.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, blogs.length));
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 md:mb-6 text-center">
              Recce <span className="text-[#ff7802]">Gossip</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto text-center">
              Your editorial hub for all things film and TV. Dive into interviews, deep dives, and hidden gems.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap px-2 py-4 sm:justify-center sm:flex-wrap sm:overflow-visible scrollbar-hide">
            {tabs.map((tab: string, index: number) => (
              <p
                key={index}
                className={`${activeTab === tab ? 'bg-[#ff7802]' : 'bg-[#ffffff1a]'} text-white text-center rounded-xl py-2 px-3 sm:px-4 cursor-pointer flex-shrink-0 text-sm sm:text-base transition-colors duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 lg:mt-16">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-r-[#ff7802]"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No blogs found for this category.</p>
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {visibleBlogs.map((blog: Blog) => (
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

              {/* Load more — only show on mobile and tablet, hidden on lg+ */}
              {isMobile && visibleCount < blogs.length && (
                <div className="w-full flex justify-center mt-8 md:mt-12">
                  <button
                    onClick={loadMore}
                    className="bg-[#191919] text-white py-2 px-6 md:px-8 rounded-xl border border-white hover:bg-white/10 transition-colors duration-300 text-sm md:text-base"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20 lg:mt-24">
          <NewsLetter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
