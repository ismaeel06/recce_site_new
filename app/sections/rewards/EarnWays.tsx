'use client';

import { useEffect, useState } from 'react';
import EarnWaysCard from '../../components/rewards/EarnWaysCard';
import { getRewardsEarnWaysSection, getRewardsEarnWaysCards } from '@/app/lib/strapi';

interface EarnWaysCardData {
  earnWayTitle: string;
  earnWayDescription: string;
  rewardPoints: Array<{ pointText: string }>;
}

interface EarnWaysSectionData {
  earnTitle: string;
  earnTitleHighlight: string;
  earnDescription: string;
}

export default function EarnWays() {
  const [sectionData, setSectionData] = useState<EarnWaysSectionData | null>(null);
  const [earnWaysCards, setEarnWaysCards] = useState<EarnWaysCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [section, cards] = await Promise.all([
          getRewardsEarnWaysSection(),
          getRewardsEarnWaysCards(),
        ]);

        if (isMounted) {
          setSectionData(section);
          setEarnWaysCards(cards);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load Earn Ways data'));
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
    console.error('Earn Ways Error:', error);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {sectionData?.earnTitle} <span className="text-[#ff7802]">{sectionData?.earnTitleHighlight}</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
            {sectionData?.earnDescription}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {earnWaysCards.map((card, index) => (
            <EarnWaysCard
              key={index}
              title={card.earnWayTitle}
              description={card.earnWayDescription}
              points={card.rewardPoints.map((p) => p.pointText)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
