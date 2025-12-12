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
            <div className="relative overflow-hidden">
              <div
                className="overflow-visible"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 items-stretch"
                  style={{ 
                    transform: `translateX(calc(-${activeSlide * 75}% + ${activeSlide === 0 ? '0%' : '12.5%'}))`,
                  }}
                >
                  {redeemOptions.map((option, index) => (
                    <div 
                      key={index} 
                      className={`flex-shrink-0 px-2 transition-all duration-300 ${
                        index === activeSlide ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                      }`}
                      style={{ width: '75%' }}
                    >
                      <div className="flex justify-center">
                        <div className="w-full">
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
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#4A4A4A] hover:bg-[#3A3A3A] transition-colors"
                aria-label="Previous slide"
              >
                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#FFFFFFCCCCCC" strokeWidth="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#FFFFFF"></path> </g></svg>
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2">
                {redeemOptions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1 rounded-2xl transition-all ${index === activeSlide ? "bg-white w-10" : "bg-gray-600 w-4"
                    }`}
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
