'use client';

import { useState, useRef } from 'react';
import RedeemRewardCard from '../../components/rewards/RedeemRewardCard';

export default function RedeemRewards() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const redeemOptions = [
    {
      image: '/assets/writing.webp',
      title: 'Movie Ticket Vouchers',
      description:
        'Enjoy a night at the movies. Redeem points for tickets at participating cinemas.',
    },
    {
      image: '/assets/writing.webp',
      title: 'Streaming Subscriptions',
      description:
        'Get a month of your favorite streaming service paid for with your Recce points.',
    },
    {
      image: '/assets/writing.webp',
      title: 'Exclusive Merchandise',
      description:
        'Show your love for film with exclusive discounts on movie-themed apparel and gear.',
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % redeemOptions.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + redeemOptions.length) % redeemOptions.length);
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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3c3c3c] rounded-3xl p-8 md:p-16 border border-[#383838]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Redeem Your <span className="text-[#ff7802]">Points</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your hard-earned points can be exchanged for real-world perks and
              digital goods. Here are a few examples.
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {redeemOptions.map((option, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="flex justify-center">
                      <div className="w-full max-w-sm">
                        <RedeemRewardCard
                          image={option.image}
                          title={option.title}
                          description={option.description}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {redeemOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 rounded-2xl transition-all ${index === activeSlide ? 'bg-white w-10' : 'bg-gray-600 w-4'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {redeemOptions.map((option, index) => (
              <RedeemRewardCard
                key={index}
                image={option.image}
                title={option.title}
                description={option.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
