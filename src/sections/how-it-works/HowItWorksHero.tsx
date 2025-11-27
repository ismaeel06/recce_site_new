'use client';

import { useEffect, useState } from 'react';
import HowItWorksStep from '@/components/how-it-works/HowItWorksStep';
import { getHowItWorksHero, getHowItWorksSteps, getStrapiImageUrl } from '@/lib/strapi';

interface StepData {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  stepImage?: any;
}

interface HeroData {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
}

export default function HowItWorksHero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [steps, setSteps] = useState<StepData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [hero, stepsData] = await Promise.all([
          getHowItWorksHero(),
          getHowItWorksSteps(),
        ]);

        if (isMounted) {
          setHeroData(hero);
          setSteps(stepsData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load How It Works data'));
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
    console.error('How It Works Hero Error:', error);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {heroData?.heroTitle} <span className="text-orange-500">{heroData?.heroTitleHighlight}</span>
          </h1>
          <p className="text-gray-300 text-lg">
            {heroData?.heroDescription}
          </p>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const defaultImages = ['/assets/SetTastes.svg', '/assets/FollowDiscover.svg', '/assets/DecideEarn.svg'];
            const imageUrl = step.stepImage ? getStrapiImageUrl(step.stepImage) : defaultImages[step.stepNumber - 1];
            
            return (
              <HowItWorksStep
                key={step.stepNumber}
                number={step.stepNumber}
                title={step.stepTitle}
                description={step.stepDescription}
                image={imageUrl || defaultImages[step.stepNumber - 1]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
