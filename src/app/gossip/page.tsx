"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsLetter from "@/sections/home/NewsLetter";
import Card from "@/components/gossip/Card";

type Blog = {
  imgUrl: string | null;
  description: string;
  date: string;
  tag: string;
};

export default function Partners() {
  const tabs = [
    "All",
    "Film",
    "TV",
    "Interviews",
    "Coming Soon",
    "Festivals",
    "Hidden Gems",
  ];

  const blogs: Blog[] = [
    { imgUrl: null, description: "In a world overflowing with choices and where Content Overload is a problem...", date: "Sunday , 1 Jan 2023", tag: "Film" },
    { imgUrl: "/assets/Blog1.png", description: "With around 100 Alpha testers on Recce, we’re already changing what people...", date: "Sunday , 1 Jan 2023", tag: "Interviews" },
    { imgUrl: "/assets/Blog2.png", description: "From directors including Kristen Stewart, Joachim Trier and Jafar Panahi, traversing Australia...", date: "Sunday , 1 Jan 2023", tag: "TV" },
    { imgUrl: null, description: "With around 100 Alpha testers on Recce, we’re already changing what people...", date: "Sunday , 1 Jan 2023", tag: "Interviews" },
    { imgUrl: "/assets/Blog3.png", description: "In a world overflowing with choices and where Content Overload is a problem...", date: "Sunday , 1 Jan 2023", tag: "Film" },
    { imgUrl: "/assets/Blog4.png", description: "From directors including Kristen Stewart, Joachim Trier and Jafar Panahi, traversing Australia...", date: "Sunday , 1 Jan 2023", tag: "TV" },
    { imgUrl: "/assets/Blog5.png", description: "In a world overflowing with choices and where Content Overload is a problem...", date: "Sunday , 1 Jan 2023", tag: "Film" },
    { imgUrl: "/assets/Blog6.png", description: "With around 100 Alpha testers on Recce, we’re already changing what people...", date: "Sunday , 1 Jan 2023", tag: "Interviews" },
    { imgUrl: "/assets/Blog7.png", description: "From directors including Kristen Stewart, Joachim Trier and Jafar Panahi, traversing Australia...", date: "Sunday , 1 Jan 2023", tag: "TV" },
  ];

  const BATCH_SIZE = 4;

  const [activeTab, setActiveTab] = useState<string>("All");
  const [isMobile, setIsMobile] = useState<boolean>(true); // assume mobile to avoid SSR mismatch flash
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  // detect mobile (<640px) and update on resize
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // set initial
    setIsMobile(mq.matches);

    // listen
    if ("addEventListener" in mq) {
      (mq as MediaQueryList).addEventListener("change", handleChange as any);
      return () => (mq as MediaQueryList).removeEventListener("change", handleChange as any);
    } else {
      // fallback for older browsers
      (mq as any).addListener(handleChange);
      return () => (mq as any).removeListener(handleChange);
    }
  }, []);

  // reset visibleCount when device type or activeTab changes
  useEffect(() => {
    setVisibleCount(isMobile ? BATCH_SIZE : blogs.length);
  }, [isMobile, activeTab]);

  const filteredBlogs = blogs.filter((b) => activeTab === "All" || b.tag === activeTab);
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredBlogs.length));
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 text-center">
              Recce <span className="text-[#ff7802]">Gossip</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              Your editorial hub for all things film and TV. Dive into interviews, deep dives, and hidden gems.
            </p>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap px-2 sm:justify-center">
            {tabs.map((tab: string, index: number) => (
              <p
                key={index}
                className={`${activeTab === tab ? 'bg-[#ff7802]' : 'bg-[#ffffff1a]'} text-white text-center rounded-[12px] py-2 px-4 cursor-pointer flex-shrink-0`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 sm:items-stretch w-[90%] m-auto p-4">
          {visibleBlogs.map((blog: any, index: number) => (
            <Card key={index} imgUrl={blog.imgUrl} description={blog.description} date={blog.date} tag={blog.tag} />
          ))}
        </div>

        {/* Load more — only show on mobile and if more items exist */}
        {isMobile && visibleCount < filteredBlogs.length && (
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="bg-[#191919] text-white py-2 px-4 rounded-md disabled:opacity-60 border border-white rounded-lg"
            >
              Load more
            </button>
          </div>
        )}

        <div className="w-[80%] m-auto">
          <NewsLetter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
