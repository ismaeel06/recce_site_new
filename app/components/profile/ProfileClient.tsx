'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DownloadButtons, getStoreUrl } from '@/app/components/common/DownloadButtons';
import { analytics } from '@/app/lib/analytics';
import { recordReferralHit, resolveReferralContext, shouldRecordReferralNow } from '@/app/lib/referral';

interface ProfileClientProps {
  profileId: string | null;
  referralCode: string | null;
}

export default function ProfileClient({ profileId, referralCode }: ProfileClientProps) {
  const router = useRouter();
  const [attemptedRedirect, setAttemptedRedirect] = useState(false);
  const referralContext = resolveReferralContext({ explicitReferral: referralCode, primaryId: profileId });
  const trackableCode = referralContext.effectiveCode;
  const referralRecorded = useRef(false);
  const effectiveReferralCode = referralContext.effectiveCode;

  useEffect(() => {
    if (!profileId) return;

    const shouldRecordImmediately = trackableCode && shouldRecordReferralNow(trackableCode);
    if (shouldRecordImmediately && !referralRecorded.current) {
      referralRecorded.current = true;
      recordReferralHit(trackableCode);
    }

    if (typeof navigator === 'undefined') return;

    analytics.trackProfileViewed({
      profileId,
      referralCode: effectiveReferralCode ?? undefined,
    });

    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isApple = /iphone|ipad|ipod/i.test(ua);
    if (!isAndroid && !isApple) return;

    const t = setTimeout(() => {
      setAttemptedRedirect(true);

      if (trackableCode && !referralRecorded.current) {
        referralRecorded.current = true;
        recordReferralHit(trackableCode);
      }

      if (isAndroid) {
        analytics.trackProfileAutoRedirect({
          profileId,
          referralCode: effectiveReferralCode ?? undefined,
          platform: 'android',
        });
        const playUrl = getStoreUrl('android');
        window.location.href = playUrl;
      } else if (isApple) {
        analytics.trackProfileAutoRedirect({
          profileId,
          referralCode: effectiveReferralCode ?? undefined,
          platform: 'ios',
        });
        const appStoreUrl = getStoreUrl('ios');
        window.location.href = appStoreUrl;
      }
    }, 600);

    return () => clearTimeout(t);
  }, [profileId, referralCode, trackableCode, effectiveReferralCode]);

  const openAppScheme = () => {
    if (!profileId) return;
    const params = new URLSearchParams();
    if (effectiveReferralCode) {
      params.set('referralCode', effectiveReferralCode);
    }
    const suffix = params.toString();
    const target = suffix
      ? `recce://profile/${encodeURIComponent(profileId)}?${suffix}`
      : `recce://profile/${encodeURIComponent(profileId)}`;
    analytics.trackProfileOpenInApp({
      profileId,
      referralCode: effectiveReferralCode ?? undefined,
    });
    window.location.href = target;
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
          <h1 className="text-4xl font-bold text-white mb-4">Profile</h1>

          {profileId ? (
            <div className="text-white/60 space-y-6">
              <p>
                You&apos;re viewing profile <strong className="text-white">{profileId}</strong>. If you opened this
                page via a deep link the app should open on mobile devices, otherwise you can download the app using
                the buttons below.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openAppScheme}
                  className="px-6 py-3 bg-[#ff7802] text-white rounded-lg hover:bg-[#ff7802]/90 transition-colors font-medium"
                >
                  Open in App
                </button>
              </div>

              <DownloadButtons className="mt-6" includeStoreParams={false} />
              {attemptedRedirect && (
                <p className="mt-3 text-sm text-white/40">
                  Redirecting to the app store... If nothing opens, use the download buttons.
                </p>
              )}
            </div>
          ) : (
            <div className="text-white/60 space-y-4">
              <p>No profile id provided.</p>
              <p className="mt-4">
                Try a deep link like <code className="text-[#ff7802]">/profile/123</code>,{' '}
                <code className="text-[#ff7802]">/profile/123?referralCode=ALLY456</code>,{' '}
                <code className="text-[#ff7802]">#profile/123</code>, or{' '}
                <code className="text-[#ff7802]">#profile/123?referralCode=ALLY456</code>.
              </p>
              <DownloadButtons className="mt-6" includeStoreParams={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}