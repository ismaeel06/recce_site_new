'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DownloadButtons, getStoreUrl } from '@/components/common/DownloadButtons';
import { analytics } from '@/lib/analytics';
import { recordReferralHit, resolveReferralContext, shouldRecordReferralNow } from '@/lib/referral';

interface ReviewClientProps {
  reviewId: string | null;
  referralCode: string | null;
}

export default function ReviewClient({ reviewId, referralCode }: ReviewClientProps) {
  const router = useRouter();
  const [attemptedDeepLink, setAttemptedDeepLink] = useState(false);
  const referralContext = resolveReferralContext({ explicitReferral: referralCode, primaryId: reviewId });
  const trackableCode = referralContext.effectiveCode;
  const referralRecorded = useRef(false);
  const effectiveReferralCode = referralContext.effectiveCode;

  useEffect(() => {
    // Auto-redirect disabled so users can try the in-app experience first.
    if (reviewId) {
      analytics.trackReviewViewed({
        reviewId,
        referralCode: effectiveReferralCode ?? undefined,
      });
    }

    if (!trackableCode || referralRecorded.current) return;
    if (shouldRecordReferralNow(trackableCode)) {
      referralRecorded.current = true;
      recordReferralHit(trackableCode);
    }
  }, [reviewId, referralCode, trackableCode, effectiveReferralCode]);

  const openAppScheme = () => {
    if (!reviewId) return;
    setAttemptedDeepLink(true);

    const params = new URLSearchParams();
    if (effectiveReferralCode) {
      params.set('referralCode', effectiveReferralCode);
    }
    const suffix = params.toString();

    analytics.trackReviewOpenInApp({
      reviewId,
      referralCode: effectiveReferralCode ?? undefined,
    });

    // Try deep link first
    const deepLinkUrl = suffix
      ? `recce://review/${encodeURIComponent(reviewId)}?${suffix}`
      : `recce://review/${encodeURIComponent(reviewId)}`;

    window.location.href = deepLinkUrl;

    // If deep link fails (app not installed), fallback to store after 1.5 seconds
    const fallbackTimer = setTimeout(() => {
      const ua = navigator.userAgent || '';
      const isAndroid = /android/i.test(ua);
      const isApple = /iphone|ipad|ipod/i.test(ua);

      if (isAndroid) {
        const playUrl = getStoreUrl('android');
        window.location.href = playUrl;
      } else if (isApple) {
        const appStoreUrl = getStoreUrl('ios');
        window.location.href = appStoreUrl;
      }
    }, 1500);

    return () => clearTimeout(fallbackTimer);
  };

  return (
    <div className="min-h-screen bg-[#191919] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="text-white/60 hover:text-[#ff7802] mb-6 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-[#FFFFFF1A] border border-[#383838] rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Open Review</h1>

          {reviewId ? (
            <div className="space-y-4 text-white/60">
              <p>
                We&apos;re opening review <strong className="text-white">{reviewId}</strong>. If you have the Recce
                app installed the link will try to open it. Otherwise you&apos;ll be redirected to the appropriate app
                store to download the app.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openAppScheme}
                  className="px-6 py-3 bg-[#ff7802] text-white rounded-lg hover:bg-[#ff7802]/90 transition-colors font-medium"
                >
                  Open in App
                </button>
              </div>
              <DownloadButtons className="mt-3" includeStoreParams={false} />
              {attemptedDeepLink && (
                <p className="mt-3 text-sm text-white/40">
                  Attempting to open app... If nothing opens, use the download buttons.
                </p>
              )}
            </div>
          ) : (
            <div className="text-white/60 space-y-4">
              <p>No review id was provided in the link.</p>
              <div className="space-y-2">
                <p>Try one of these deep link formats:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-[#ff7802]">/review/12345</li>
                  <li className="text-[#ff7802]">/review/12345?referralCode=ALLY456</li>
                  <li className="text-[#ff7802]">#review/12345</li>
                  <li className="text-[#ff7802]">#review/12345?referralCode=ALLY456</li>
                </ul>
              </div>
              <DownloadButtons className="mt-4" includeStoreParams={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
