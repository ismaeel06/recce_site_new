'use client';

import { useState, useRef, useEffect } from 'react';
import FeatureCard from '@/components/home/FeatureCard';
import type {
  FeaturesSectionAttributes,
  FeatureCard as FeatureCardType,
} from '@/types/strapi';
import { getFeaturesSection, getFeatureCards, getStrapiImageUrl } from '@/lib/strapi';

interface FeaturesState {
  featuresSection: FeaturesSectionAttributes | null;
  featureCards: FeatureCardType[];
  loading: boolean;
  error: Error | null;
}

export default function FeaturesSection() {
  const [state, setState] = useState<FeaturesState>({
    featuresSection: null,
    featureCards: [],
    loading: true,
    error: null,
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const [featuresData, cardsData] = await Promise.all([
          getFeaturesSection(),
          getFeatureCards(),
        ]);

        if (isMounted) {
          setState({
            featuresSection: featuresData,
            featureCards: cardsData,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error('Failed to load features section'),
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % state.featureCards.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + state.featureCards.length) % state.featureCards.length
    );
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

  if (state.error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-2">Error Loading Features</h2>
            <p>{state.error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  if (state.loading || !state.featuresSection) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {state.featuresSection.sectionTitle}
              <span className="text-[#ff7802] block md:inline">
                {' '}
                {state.featuresSection.sectionHighlightText}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
              {state.featuresSection.sectionDescription}
            </p>
          </div>

          {/* Desktop Grid - Hidden on Mobile */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.featureCards.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={getStrapiImageUrl(feature.featureIcon) || ''}
                title={feature.featureTitle}
                description={feature.featureDescription}
                image={getStrapiImageUrl(feature.featureBackgroundImage) || undefined}
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
                  {state.featureCards.map((feature) => (
                    <div key={feature.id} className="w-full flex-shrink-0 px-4">
                      <FeatureCard
                        icon={getStrapiImageUrl(feature.featureIcon) || ''}
                        title={feature.featureTitle}
                        description={feature.featureDescription}
                        image={
                          getStrapiImageUrl(feature.featureBackgroundImage) ||
                          undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {state.featureCards.map((_, index) => (
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

      {/* See Recce in Action Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF1A] rounded-4xl overflow-hidden px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 items-center">
              {/* Left: Text Content */}
              <div className="text-white text-left py-8 md:py-12 lg:p-16">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">
                  {state.featuresSection.seeRecceInActionTitle}
                </h2>
                <p className="text-gray-300 mb-8 text-sm md:text-base">
                  {state.featuresSection.seeRecceInActionDescription}
                </p>

                <ul className="space-y-4">
                  {state.featuresSection.seeRecceInActionBulletPoints.map(
                    (bullet) => (
                      <li key={bullet.id} className="flex items-center gap-4">
                        <img
                          src={
                            getStrapiImageUrl(bullet.bulletIcon) ||
                            '/assets/icons/star.svg'
                          }
                          alt=""
                          className="w-10 h-10 flex-shrink-0"
                        />
                        <span className="text-sm md:text-lg">
                          {bullet.bulletText}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Right: Image */}
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-50 md:w-120 h-50 bg-[#ff7802] rounded-t-full rounded-b-0 blur-3xl opacity-25"></div>
                <img
                  src={
                    getStrapiImageUrl(state.featuresSection.seeRecceInActionImage) ||
                    '/assets/Recce_Action.svg'
                  }
                  alt="Recce Action"
                  className="w-full h-full relative z-10 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
