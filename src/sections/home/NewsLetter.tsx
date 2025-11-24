'use client';

import { useEffect, useState } from 'react';
import type { NewsLetterSectionAttributes } from '@/types/strapi';
import { getNewsLetterSection } from '@/lib/strapi';

interface NewsLetterState {
  data: NewsLetterSectionAttributes | null;
  loading: boolean;
  error: Error | null;
}

function NewsLetter() {
  const [state, setState] = useState<NewsLetterState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const newsletterData = await getNewsLetterSection();

        if (isMounted) {
          setState({
            data: newsletterData,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error('Failed to load newsletter section'),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state.error) {
    return (
      <div className="mt-12 md:mt-20 lg:mt-32 bg-[#2a2a2a] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
        <p className="text-red-500 text-center">Error loading newsletter: {state.error.message}</p>
      </div>
    );
  }

  if (state.loading || !state.data) {
    return (
      <div className="mt-12 md:mt-20 lg:mt-32 bg-[#2a2a2a] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
        <div className="h-16 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="mt-12 md:mt-20 lg:mt-32 bg-[#2a2a2a] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="w-full md:flex-1">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2">
            {state.data.newsletterTitle}
          </h3>
          <p className="text-xs md:text-sm text-[#848686]">
            {state.data.newsletterDescription}
          </p>
        </div>

        <div className="flex gap-0 w-full md:w-auto border border-[rgba(255, 255, 255, 0.2)] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
          <input
            type="email"
            placeholder={state.data.newsletterPlaceholder}
            className="flex-1 md:flex-none px-3 md:px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-white placeholder-[#848686] focus:outline-none text-xs md:text-sm"
          />
          <button className="px-4 md:px-6 lg:px-8 py-2.5 md:py-3 bg-[#ff7802] hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap text-xs md:text-sm">
            {state.data.newsletterButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;