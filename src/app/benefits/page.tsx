"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PerksCard from "@/components/benefits/PerksCard";

export default function Partners() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const perks = [
    {
      imgUrl: "/assets/Perk1.png",
      title: "Early Screenings",
      number: "01",
      description:
        "Get exclusive invitations to pre-release digital and in-person screenings of upcoming movies and shows from our partner studios.",
    },
    {
      imgUrl: "/assets/Perk2.png",
      title: "Exclusive Quizzes",
      number: "02",
      description:
        "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights.",
    },
    {
      imgUrl: "/assets/Perk3.png",
      title: "Product Lab Access",
      number: "03",
      description:
        "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights.",
    },
    {
      imgUrl: "/assets/Perk4.png",
      title: "Creator Q&As",
      number: "04",
      description:
        "Join live, intimate Q&A sessions with directors, writers, and actors. Ask the questions you've always wanted to ask.",
    },
    {
      imgUrl: "/assets/Perk5.png",
      title: "Prestige Profile Badge",
      number: "05",
      description:
        "Your profile will be adorned with the exclusive Auteur Club badge, signaling your status as a top contributor in the community.",
    },
    {
      imgUrl: "/assets/Perk6.png",
      title: "Priority Support",
      number: "06",
      description:
        "Get white-glove service from our dedicated community team. Your questions and feedback move to the front of the line, always.",
    },
  ];

  // show exactly 6 indicators (as requested)
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
        threshold: 0.6, // card considered "in view" when 60% visible
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [perks]);

  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col md:py-32 items-center md:min-h-screen">
            <h1 className="text-[26px] md:text-[60px] font-medium md:mb-6 text-center font-bold">
              The Auteur Club <span className="text-[#ff7802]">Top 1%</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              An exclusive circle for our Top 1% of contributors. This is where your passion for film and TV gets the VIP treatment you deserve.
            </p>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col md:py-32 items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium md:mb-6 text-center font-bold">
              Exclusive Member <span className="text-[#ff7802]">Perks</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              As a member of The Auteur Club, you unlock a suite of benefits designed to enhance your entertainment experience.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:w-[90%] items-center md:items-start mx-auto gap-8">
          <div className="w-[70%] md:w-[50%]">
            <img src="/assets/TvLounge.png" alt="" className="w-full h-auto" />
          </div>

          <div className="w-[70%] md:w-[50%] flex flex-col gap-4">
            {/* 
              Key changes: 
              - fixed mobile width + height for each card wrapper to avoid "eggplant" shapes
              - sm size slightly larger
              - md becomes full width (column layout)
            */}
            <div
              ref={containerRef}
              className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 items-stretch"
            >
              {perks.map((perk, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="snap-center flex-shrink-0 w-[260px] sm:w-[300px] md:w-full mx-2"
                >
                  {/* ensure PerksCard sits in a full-height wrapper */}
                  <div className="">
                    <PerksCard
                      number={perk.number}
                      title={perk.title}
                      description={perk.description}
                      imgUrl={perk.imgUrl ?? null}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* INDICATORS: visible only on mobile (hidden on md+) */}
            <div className="md:hidden mt-3 flex justify-center items-center gap-2">
              {Array.from({ length: INDICATOR_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-300 ease-out rounded-full ${i === activeIndex ? "w-16 bg-white" : "w-6 bg-[#ffffff1a]"
                    }`}
                  aria-hidden
                />
              ))}
            </div>

            <h1 className="text-[26px] md:text-[60px] font-medium mt-32">
              How to <span className="text-[#ff7802]">Qualify</span>
            </h1>
            <p className="text-base md:text-xl text-white/60">
              Membership to The Auteur Club is exclusive and earned. There's no application—only recognition of your valuable contributions to the Recce community.
            </p>

            <div className="flex-col gap-4 bg-[#ffffff1a] p-8 rounded-[20px] mt-6">
              <div className="flex gap-4 my-4">
                <img src="/assets/Star.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Be in the Top 1%</p>
                  <p className="text-base text-white/60">
                    Membership is automatically granted each quarter to the top 1% of users based on the quality and impact of their recommendations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <img src="/assets/MessageBubble.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Quality over Quantity</p>
                  <p className="text-base text-white/60">
                    Our algorithm values insightful, well-written reviews that genuinely help others discover new content. A single great review is worth more than a dozen one-liners.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <img src="/assets/Graph.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Community Impact</p>
                  <p className="text-base text-white/60">
                    How many people watched a show because of your rec? How many found your review helpful? Your influence is a key metric for qualification.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs md:text-base text-white/60 mt-4 mb-16">
              Your status is reviewed every three months. Keep sharing your passion to secure or reclaim your spot in the club.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
