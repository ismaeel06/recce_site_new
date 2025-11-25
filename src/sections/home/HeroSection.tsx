'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import type { HeroSectionAttributes } from '@/types/strapi';
import { getHeroSection, getStrapiImageUrl, getDownloadLinks } from '@/lib/strapi';

interface HeroSectionState {
  data: HeroSectionAttributes | null;
  loading: boolean;
  error: Error | null;
}

export default function HeroSection() {
  const [state, setState] = useState<HeroSectionState>({
    data: null,
    loading: true,
    error: null,
  });

  const [downloadLinks, setDownloadLinks] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const heroData = await getHeroSection();

        if (isMounted) {
          setState({
            data: heroData,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err : new Error('Failed to load hero section'),
          });
        }
      }
    };

    fetchData();

    async function fetchDownloadLinks() {
      try {
        const data = await getDownloadLinks();
        console.log("Data for download links: ", data);
        setDownloadLinks({
          playstoreLink: data.playstoreLink,
          appstoreLink: data.appstoreLink
        });
      } catch (err) {
        console.error("Error fetching latest blogs:", err);
        setDownloadLinks({
          playstoreLink: "",
          appstoreLink: ""
        });
      }
    }

    fetchDownloadLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  const heroImageUrl = state.data
    ? getStrapiImageUrl(state.data.heroBackgroundImage)
    : null;

  if (state.error) {
    return (
      <section className="relative">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2 text-red-500">Error Loading Hero Section</h2>
            <p className="text-red-500">{state.error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!state.data) {
    return (
      <section className="relative">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-800 animate-pulse"></div>
      </section>
    );
  }

  const redirectToPlaystore = () => {
    window.open(downloadLinks?.playstoreLink, "_blank");
  }

  const redirectToAppstore = () => {
    window.open(downloadLinks?.appstoreLink, "_blank");
  }

  return (
    <section className="relative">
      {/* Background Image Container */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Gradient overlay at bottom to blend with content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#191919]"></div>

        {/* Header positioned over background */}
        <div className="relative z-10">
          <Header />
        </div>

        {/* Welcome to Recce - Centered at bottom of image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <p className="text-white text-sm md:text-2xl mb-[-10px] md:mb-[-26px] md:text-left md:relative md:left-7 leading-tight">
            {state.data.heroSubtitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight md:relative md:right-6">
            {state.data.heroMainTitle}
          </h1>
        </div>
      </div>

      {/* Content Band - Dark section below image */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start md:items-center">
            {/* Left: Section Title and Highlight (single row on mobile) */}
            <div className="text-white text-center md:text-left flex flex-row md:block items-center justify-center md:justify-start">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-0 md:mb-4">
                {state.data.heroSectionTitle}
              </h2>
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-[#ff7802] ml-3 md:ml-0">
                {state.data.heroSectionHighlight}
              </h2>
            </div>

            {/* Right: Description and App Store Buttons */}
            <div className="text-white text-center md:text-left">
              <p className="text-sm md:text-lg mb-6 md:mb-8 opacity-90 text-gray-300 md:pl-8 lg:pl-20">
                {state.data.heroDescription}
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start md:pl-8 lg:pl-20">
                <button
                  onClick={redirectToPlaystore}
                  className="flex items-center bg-[#FFFFFF1A] rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="mr-3">
                    <img
                      src="/assets/icons/Google_Play.svg"
                      alt=""
                      className="w-5 md:w-6 h-5 md:h-6"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>

                <button
                  onClick={redirectToAppstore}
                  className="flex items-center bg-[#FFFFFF1A] rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="mr-3">
                    <img
                      src="/assets/icons/Apple.svg"
                      alt=""
                      className="w-5 md:w-6 h-5 md:h-6"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}