'use client';

import { useEffect, useState } from 'react';
import NewsLetter from './NewsLetter';
import type { CTASectionAttributes } from '@/types/strapi';
import { getCTASection, getStrapiImageUrl, getDownloadLinks } from '@/lib/strapi';

interface CTAState {
  data: CTASectionAttributes | null;
  loading: boolean;
  error: Error | null;
}

export default function CTASection() {
  const [state, setState] = useState<CTAState>({
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
        const ctaData = await getCTASection();

        if (isMounted) {
          setState({
            data: ctaData,
            loading: false,
            error: null,
          });
        }

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
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error:
              err instanceof Error ? err : new Error('Failed to load CTA section'),
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
      <section className="py-20 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-2">Error Loading CTA Section</h2>
            <p>{state.error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  if (state.loading || !state.data) {
    return (
      <section className="py-20 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
      </section>
    );
  }

  // Organize badges by position
  const badgesByPosition = {
    topLeft: state.data.ctaBadges.find((b) => b.badgePosition === 'topLeft'),
    topRight: state.data.ctaBadges.find((b) => b.badgePosition === 'topRight'),
    bottomLeft: state.data.ctaBadges.find((b) => b.badgePosition === 'bottomLeft'),
    bottomRight: state.data.ctaBadges.find(
      (b) => b.badgePosition === 'bottomRight'
    ),
  };

  const ctaCentralImageUrl = getStrapiImageUrl(state.data.ctaCentralImage);

  const redirectToPlaystore = () => {
    window.open(downloadLinks?.playstoreLink, "_blank");
  }

  const redirectToAppstore = () => {
    window.open(downloadLinks?.appstoreLink, "_blank");
  }

  return (
    <section className="py-20 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Title and Download Buttons */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
            {state.data.ctaMainTitle}{' '}
            <span className="text-[#ff7802] block md:inline-block">
              {state.data.ctaHighlightText}
            </span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {state.data.ctaDescription}
          </p>

          {/* Download Buttons */}
          <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
            <button
              onClick={redirectToPlaystore}
              className="flex items-center bg-[#FFFFFF1A] rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
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
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </button>

            <a
              onClick={redirectToAppstore}
              className="flex items-center bg-[#FFFFFF1A] rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
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
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Middle Section - Phone Mockup with Rings and Side Badges */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-4xl flex flex-col justify-center items-center">
            {/* Desktop: Full height container (only for 2xl and above) */}
            <div className="hidden xl:flex relative w-full h-screen justify-center items-center">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute w-48 h-48 md:w-96 md:h-96 border border-gray-700 rounded-full opacity-30"></div>
                <div className="absolute w-64 h-64 md:w-[28rem] md:h-[28rem] border border-gray-700 rounded-full opacity-20"></div>
                <div className="absolute w-80 h-80 md:w-[32rem] md:h-[32rem] border border-gray-700 rounded-full opacity-10"></div>
              </div>

              {/* Phone Mockup */}
              <div className="relative z-10 flex justify-center items-center">
                {ctaCentralImageUrl && (
                  <img src={ctaCentralImageUrl} width="600" height="700" alt="App Mockup" />
                )}
              </div>

              {/* Top Left Badge */}
              {badgesByPosition.topLeft && (
                <div className="absolute top-20 left-4 md:top-32 md:left-[-118px] flex items-center gap-3 md:gap-4 z-20">
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-white text-xs md:text-sm font-medium max-w-xs">
                      {badgesByPosition.topLeft.badgeText}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                    <img
                      src={
                        getStrapiImageUrl(badgesByPosition.topLeft.badgeIcon) ||
                        ''
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}

              {/* Bottom Left Badge */}
              {badgesByPosition.bottomLeft && (
                <div className="absolute bottom-20 left-4 md:bottom-44 md:left-[-78px] flex items-center gap-3 md:gap-4 z-20">
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-white text-xs md:text-sm font-medium max-w-xs">
                      {badgesByPosition.bottomLeft.badgeText}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                    <img
                      src={
                        getStrapiImageUrl(badgesByPosition.bottomLeft.badgeIcon) ||
                        ''
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}

              {/* Top Right Badge */}
              {badgesByPosition.topRight && (
                <div className="absolute top-20 right-4 md:top-26 md:right-[-56px] flex items-center gap-3 md:gap-4 z-20">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                    <img
                      src={
                        getStrapiImageUrl(badgesByPosition.topRight.badgeIcon) ||
                        ''
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-white text-xs md:text-sm font-medium max-w-xs text-right">
                      {badgesByPosition.topRight.badgeText}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Right Badge */}
              {badgesByPosition.bottomRight && (
                <div className="absolute bottom-20 right-4 md:bottom-44 md:right-[-56px] flex items-center gap-3 md:gap-4 z-20">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                    <img
                      src={
                        getStrapiImageUrl(badgesByPosition.bottomRight.badgeIcon) ||
                        ''
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-white text-xs md:text-sm font-medium max-w-xs text-right">
                      {badgesByPosition.bottomRight.badgeText}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile & Tablet (iPad Pro): Phone centered with badges below in 2x2 grid */}
            <div className="xl:hidden flex flex-col items-center w-full">
              <div className="relative w-full flex justify-center mb-8">
                {ctaCentralImageUrl && (
                  <img
                    src={ctaCentralImageUrl}
                    width="200"
                    height="280"
                    alt="App Mockup"
                  />
                )}
              </div>

              {/* Mobile Badge Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                {/* Top Left Badge */}
                {badgesByPosition.topLeft && (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                      <img
                        src={
                          getStrapiImageUrl(badgesByPosition.topLeft.badgeIcon) ||
                          ''
                        }
                        alt=""
                      />
                    </div>
                    <p className="text-white text-xs font-medium">
                      {badgesByPosition.topLeft.badgeText}
                    </p>
                  </div>
                )}

                {/* Top Right Badge */}
                {badgesByPosition.topRight && (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                      <img
                        src={
                          getStrapiImageUrl(badgesByPosition.topRight.badgeIcon) ||
                          ''
                        }
                        alt=""
                      />
                    </div>
                    <p className="text-white text-xs font-medium">
                      {badgesByPosition.topRight.badgeText}
                    </p>
                  </div>
                )}

                {/* Bottom Left Badge */}
                {badgesByPosition.bottomLeft && (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                      <img
                        src={
                          getStrapiImageUrl(badgesByPosition.bottomLeft.badgeIcon) ||
                          ''
                        }
                        alt=""
                      />
                    </div>
                    <p className="text-white text-xs font-medium">
                      {badgesByPosition.bottomLeft.badgeText}
                    </p>
                  </div>
                )}

                {/* Bottom Right Badge */}
                {badgesByPosition.bottomRight && (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                      <img
                        src={
                          getStrapiImageUrl(badgesByPosition.bottomRight.badgeIcon) ||
                          ''
                        }
                        alt=""
                      />
                    </div>
                    <p className="text-white text-xs font-medium">
                      {badgesByPosition.bottomRight.badgeText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Newsletter */}
        <NewsLetter />
      </div>
    </section>
  );
}