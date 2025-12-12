"use client";
import { useState, useEffect, useRef } from "react";
import PerksCard from "@/components/benefits/PerksCard";
import { getPerksHeader, getPerks } from "@/lib/strapi";

type Perk = {
  imgUrl: string;
  title: string;
  number: string;
  description: string;
};

export default function Perks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [hero, setHero] = useState<any>({});
  const [perks, setPerks] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getPerksHeader();
      setHero({ ...data, thumbnail: data?.thumbnail?.url });
      const perksData = await getPerks();
      setPerks(perksData.map((d: any) => (
        {
          ...d,
          icon: d.icon.url
        }
      )));
    }
    getData();
  }, [])

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      {
        root,
        threshold: 0.6,
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [perks]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % perks.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + perks.length) % perks.length);
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 md:mb-12 lg:mb-16 flex flex-col pb-12 items-center">
        {/* Coming Soon Badge */}
        {hero?.isComingSoon && <div className="mb-6 md:mb-8">
          <div className="bg-[#ff7802] text-white px-6 sm:px-8 py-1 rounded-xl text-xs sm:text-base font-medium">
            {hero?.comingSoonText || "Coming Soon"}
          </div>
        </div>}

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold md:mb-6 text-center font-bold">
          {hero?.title} <span className="text-[#ff7802]">{hero?.highlighted}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto text-center">
          {hero?.description}
        </p>
      </div>

      {/* Desktop Layout - Hidden on Mobile/Tablet */}
      <div className="hidden lg:block">
        <div className="flex flex-col md:flex-row items-center md:items-start mx-auto gap-8 mb-16 md:mb-20 lg:mb-24">
          <div className="w-[70%] md:w-[50%]">
            <img src={hero?.thumbnail} alt="TV Lounge" className="w-full h-auto object-contain" />
          </div>

          <div className="w-[70%] md:w-[50%] flex flex-col gap-4">
            <div
              ref={containerRef}
              className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 items-stretch"
            >
              {perks.map((perk, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  className="snap-center flex-shrink-0 w-[260px] sm:w-[300px] md:w-full mx-2"
                >
                  <div className="">
                    <PerksCard
                      number={perk.order}
                      title={perk.title}
                      description={perk.description}
                      imgUrl={perk.icon}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Carousel Layout */}
      <div className="lg:hidden mb-16 md:mb-20">
        <div className="flex flex-col gap-6">
          {/* Image - Always TvLounge */}
          <div className="w-full rounded-3xl overflow-hidden">
            <img
              src="/assets/TvLounge.png"
              alt="TV Lounge"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Cards Carousel */}
          <div className="relative -mx-4 sm:-mx-6 md:-mx-4">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(calc(-${activeIndex * 75}% + ${activeIndex === 0 ? '0%' : '12.5%'}))` }}
              >
                {perks.map((perk, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 px-4 sm:px-6 md:px-4 flex justify-center transition-all duration-300 ${
                      index === activeIndex ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                    }`}
                    style={{ width: '75%' }}
                  >
                    <div className="w-full">
                      <PerksCard
                        number={perk.order}
                        title={perk.title}
                        description={perk.description}
                        imgUrl={perk.icon}
                        isActive={index === activeIndex}
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
              {perks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 rounded-full transition-all ${index === activeIndex ? "bg-white w-8" : "bg-[#ffffff1a] w-2"
                    }`}
                  aria-label={`Go to perk ${index + 1}`}
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
    </div>
  );
}
