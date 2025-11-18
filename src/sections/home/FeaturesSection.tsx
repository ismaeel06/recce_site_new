"use client";
import { useState, useRef } from "react";

import FeatureCard from "@/components/home/FeatureCard";

export default function FeaturesSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const features = [
    {
      icon: "/assets/icons/Users.svg",
      title: "Social Reviews",
      description: "Share honest reviews and ratings with your friends and discover what your trusted circle is watching.",
      image: "/assets/SocialReviews.svg"
    },
    {
      icon: "/assets/icons/SealCheck.svg",
      title: "Trusted Network",
      description: "Build connections with fellow movie and TV enthusiasts who share your taste and values.",
      image: "/assets/TrustedNetwork.svg"
    },
    {
      icon: "/assets/icons/Gift-orng.svg",
      title: "Reward System",
      description: "Share honest reviews and ratings with your friends and discover what your top trusted circle is watching.",
      image: "/assets/RewardSystem.svg"
    },
    {
      icon: "/assets/icons/GlobeSimple.svg",
      title: "Smart Discovery",
      description: "Find hidden gems and trending shows through community-driven insights and intelligent filtering.",
      image: "/assets/SmartDiscovery.svg"
    },
    {
      icon: "/assets/icons/Target.svg",
      title: "Personalized Recommendations",
      description: "Get tailored suggestions based on your profile and what people with similar preferences love.",
      image: "/assets/PersonalizedRecommendations.svg"
    },
    {
      icon: "/assets/icons/BookmarksSimple.svg",
      title: "Watchlist Management",
      description: "Organize your must-watch list, track what you've seen, and never lose track of recommendations again.",
      image: "/assets/WatchListManagement.svg"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + features.length) % features.length);
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
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Everything You Need for
              <span className="text-[#ff7802] block md:inline"> Social Discovery</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
              Recce brings together movie and TV lovers
              in a community where your opinions matter,
              trusted recommendations flow naturally, and great content discovery is rewarded.
            </p>
          </div>

          {/* Desktop Grid - Hidden on Mobile */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                image={feature.image}
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
                  {features.map((feature, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        image={feature.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, index) => (
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

      {/* See Recce in Action Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF1A] rounded-4xl overflow-hidden px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 items-center">
              {/* Left: Text Content */}
              <div className="text-white text-left py-8 md:py-12 lg:p-16">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">See Recce in Action</h2>
                <p className="text-gray-300 mb-8 text-sm md:text-base">
                  Our intuitive interface makes it simple to review shows, discover recommendations from friends, and earn rewards for your contributions to the community. Join thousands who've found their next favorite watch through trusted word-of-mouth.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <img src="/assets/icons/star.svg" alt="-" className="w-10 h-10 flex-shrink-0" />
                    <span className="text-sm md:text-lg">Rate and review in seconds</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <img src="/assets/icons/follow.svg" alt="-" className="w-10 h-10 flex-shrink-0" />
                    <span className="text-sm md:text-lg">Follow friends and tastemakers</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <img src="/assets/icons/gift.svg" alt="-" className="w-10 h-10 flex-shrink-0" />
                    <span className="text-sm md:text-lg">Earn rewards for quality reviews</span>
                  </li>
                </ul>
              </div>

              {/* Right: Image */}
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-50 md:w-120 h-50 bg-[#ff7802] rounded-t-full rounded-b-0 blur-3xl opacity-25"></div>
                <img src="/assets/Recce_Action.svg" alt="Recce Action" className="w-full h-full relative z-10 object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
