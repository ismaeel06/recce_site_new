'use client';

import { useState, useEffect } from 'react';
import type { HomePageContent } from '@/types/strapi';
import { getHomePageContent } from '@/lib/strapi';

interface UseHomePageContentState {
  data: HomePageContent | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch and manage home page content from Strapi
 * Handles loading and error states
 */
export function useHomePageContent(): UseHomePageContentState {
  const [state, setState] = useState<UseHomePageContentState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const content = await getHomePageContent();

        if (isMounted) {
          setState({
            data: content,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err : new Error('Unknown error occurred'),
          });
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}

/**
 * Custom hook to fetch home page content with revalidation support
 * Useful for server-side rendering and ISR
 */
export async function getHomePageContentStatic(): Promise<HomePageContent> {
  try {
    const content = await getHomePageContent();
    return content;
  } catch (error) {
    console.error('Failed to fetch home page content statically:', error);
    throw error;
  }
}
