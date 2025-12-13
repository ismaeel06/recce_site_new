'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import RewardActionCard from '../../components/rewards/RewardActionCard';
import { getRewardsHeroSection, getRewardsActionCards, getStrapiImageUrl } from '@/app/lib/strapi';

interface ActionCardData {
  cardIcon?: any;
  cardTitle: string;
  cardDescription: string;
}

interface HeroData {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroImage?: any;
}

export default function RewardsHero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [actionCards, setActionCards] = useState<ActionCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [hero, cards] = await Promise.all([
          getRewardsHeroSection(),
          getRewardsActionCards(),
        ]);

        if (isMounted) {
          setHeroData(hero);
          setActionCards(cards);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load Rewards data'));
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
    console.error('Rewards Hero Error:', error);
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-white mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {heroData?.heroTitle} <span className="text-[#ff7802]">{heroData?.heroTitleHighlight}</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mx-auto max-w-3xl">
            {heroData?.heroDescription}
          </p>
        </div>

        {/* Left and Right Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Gift Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[525px] rounded-xl overflow-hidden">
            {heroData?.heroImage && (
              <Image
                src={getStrapiImageUrl(heroData.heroImage) || '/assets/rewardHero.svg'}
                alt="Get Rewarded"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Right: Action Cards */}
          <div className="text-white">
            {/* Action Cards */}
            <div className="space-y-4">
              {actionCards.map((card, index) => (
                <RewardActionCard
                  key={index}
                  icon={getStrapiImageUrl(card.cardIcon) || '/assets/icons/PencilSimpleLine.svg'}
                  title={card.cardTitle}
                  description={card.cardDescription}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
