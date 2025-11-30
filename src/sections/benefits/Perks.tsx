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

  // const perks: Perk[] = [
  //   {
  //     imgUrl: "/assets/Perk1.png",
  //     title: "Early Screenings",
  //     number: "01",
  //     description:
  //       "Get exclusive invitations to pre-release digital and in-person screenings of upcoming movies and shows from our partner studios.",
  //   },
  //   {
  //     imgUrl: "/assets/Perk2.png",
  //     title: "Exclusive Quizzes",
  //     number: "02",
  //     description:
  //       "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights.",
  //   },
  //   {
  //     imgUrl: "/assets/Perk3.png",
  //     title: "Product Lab Access",
  //     number: "03",
  //     description:
  //       "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights.",
  //   },
  //   {
  //     imgUrl: "/assets/Perk4.png",
  //     title: "Creator Q&As",
  //     number: "04",
  //     description:
  //       "Join live, intimate Q&A sessions with directors, writers, and actors. Ask the questions you've always wanted to ask.",
  //   },
  //   {
  //     imgUrl: "/assets/Perk5.png",
  //     title: "Prestige Profile Badge",
  //     number: "05",
  //     description:
  //       "Your profile will be adorned with the exclusive Auteur Club badge, signaling your status as a top contributor in the community.",
  //   },
  //   {
  //     imgUrl: "/assets/Perk6.png",
  //     title: "Priority Support",
  //     number: "06",
  //     description:
  //       "Get white-glove service from our dedicated community team. Your questions and feedback move to the front of the line, always.",
  //   },
  // ];

  const INDICATOR_COUNT = 6;

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
      <div className="text-center mb-8 md:mb-12 lg:mb-16 flex flex-col md:py-20 lg:py-32 items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium md:mb-6 text-center font-bold">
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
          <div className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {perks.map((perk, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <PerksCard
                      number={perk.number}
                      title={perk.title}
                      description={perk.description}
                      imgUrl={perk.imgUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
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
        </div>
      </div>
    </div>
  );
}
