'use client';

import { useState, useRef, useEffect } from 'react';
import RedeemRewardCard from '../../components/rewards/RedeemRewardCard';
import { getRewardsRedeemSection, getRewardsRedeemOptions, getStrapiImageUrl } from '@/lib/strapi';

interface RedeemOptionData {
  optionImage?: any;
  optionTitle: string;
  optionDescription: string;
}

interface RedeemSectionData {
  redeemTitle: string;
  redeemTitleHighlight: string;
  redeemDescription: string;
}

export default function RedeemRewards() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sectionData, setSectionData] = useState<RedeemSectionData | null>(null);
  const [redeemOptions, setRedeemOptions] = useState<RedeemOptionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [section, options] = await Promise.all([
          getRewardsRedeemSection(),
          getRewardsRedeemOptions(),
        ]);

        if (isMounted) {
          setSectionData(section);
          setRedeemOptions(options);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load Redeem Rewards data'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    console.error('Redeem Rewards Error:', error);
  }

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
        <div className="bg-[#FFFFFF1A] rounded-3xl p-8 md:p-16 border border-[#383838]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {sectionData?.redeemTitle} <span className="text-[#ff7802]">{sectionData?.redeemTitleHighlight}</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto">
              {sectionData?.redeemDescription}
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
                          image={getStrapiImageUrl(option.optionImage) || ''}
                          title={option.optionTitle}
                          description={option.optionDescription}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex gap-2">
                {redeemOptions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeSlide ? 'bg-[#ffffff] w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {redeemOptions.map((option, index) => (
              <RedeemRewardCard
                key={index}
                image={getStrapiImageUrl(option.optionImage) || ''}
                title={option.optionTitle}
                description={option.optionDescription}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
