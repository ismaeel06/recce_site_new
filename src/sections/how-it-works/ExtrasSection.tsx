'use client';

import { useEffect, useState } from 'react';
import ExtrasCard from '@/components/how-it-works/ExtrasCard';
import { getHowItWorksExtrasSection, getHowItWorksExtras, getStrapiImageUrl } from '@/lib/strapi';

interface ExtraData {
  extraTitle: string;
  extraDescription: string;
  extraIcon?: any;
}

interface ExtrasSectionData {
  extrasTitle: string;
  extrasTitleHighlight: string;
}

export default function ExtrasSection() {
  const [extrasSection, setExtrasSection] = useState<ExtrasSectionData | null>(null);
  const [extras, setExtras] = useState<ExtraData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [section, extrasData] = await Promise.all([
          getHowItWorksExtrasSection(),
          getHowItWorksExtras(),
        ]);

        if (isMounted) {
          setExtrasSection(section);
          setExtras(extrasData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load How It Works extras'));
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
    console.error('How It Works Extras Error:', error);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF1A] rounded-4xl px-8 md:px-16 py-8 md:py-10 border border-gray-700">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {extrasSection?.extrasTitle} <span className="text-orange-500">{extrasSection?.extrasTitleHighlight}</span>
            </h2>
          </div>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {extras.map((extra, index) => {
              const iconUrl = extra.extraIcon ? getStrapiImageUrl(extra.extraIcon) : null;
              const iconElement = iconUrl ? (
                <img src={iconUrl} alt={extra.extraTitle} className="w-full h-full" />
              ) : null;

              return (
                <ExtrasCard
                  key={index}
                  icon={iconElement}
                  title={extra.extraTitle}
                  description={extra.extraDescription}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
