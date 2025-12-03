'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DownloadButtons, getStoreUrl } from '@/components/common/DownloadButtons';
import { analytics } from '@/lib/analytics';
import {
  fetchReferrerDetails,
  getOrCreateVisitorId,
  recordReferralHit,
  resolveReferralContext,
  shouldRecordReferralNow,
  submitReferralEmail,
} from '@/lib/referral';

interface RewardsClientProps {
  rewardCode: string | null;
  referralCode: string | null;
}

export default function RewardsClient({ rewardCode, referralCode }: RewardsClientProps) {
  const router = useRouter();
  const [attemptedRedirect, setAttemptedRedirect] = useState(false);
  const primaryCode = rewardCode ?? null;
  const referralContext = resolveReferralContext({ primaryId: primaryCode, explicitReferral: referralCode });
  const trackableCode = referralContext.effectiveCode;
  const referralRecorded = useRef(false);
  const visitorId = getOrCreateVisitorId();
  const effectiveReferralCode = referralContext.effectiveCode;
  const requiresEmailCapture = Boolean(effectiveReferralCode);
  const [emailCaptured, setEmailCaptured] = useState(!requiresEmailCapture);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [referrerError, setReferrerError] = useState<string | null>(null);
  const [referrerLoading, setReferrerLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!effectiveReferralCode) {
      setReferrerName(null);
      setReferrerLoading(false);
      setReferrerError(null);
      return;
    }
    if (referralContext.type !== 'referral') {
      setReferrerName(null);
      setReferrerLoading(false);
      setReferrerError(null);
      return;
    }
    setReferrerLoading(true);
    setReferrerError(null);

    fetchReferrerDetails(effectiveReferralCode)
      .then((details) => {
        if (!isMounted) return;
        setReferrerName(details.name ?? null);
        setReferrerLoading(false);
        if (!details.found) {
          setReferrerError("We couldn't find that referral, but you can still continue.");
        }
      })
      .catch((error) => {
        console.error('Failed to load referrer details', error);
        if (!isMounted) return;
        setReferrerLoading(false);
        setReferrerError("We couldn't verify the referral right now. Please try again in a moment.");
      });

    return () => {
      isMounted = false;
    };
  }, [effectiveReferralCode, referralContext.type]);

  useEffect(() => {
    if (!primaryCode) return;
    if (requiresEmailCapture && !emailCaptured) return;
    const shouldRecordImmediately = trackableCode && shouldRecordReferralNow(trackableCode);
    if (shouldRecordImmediately && !referralRecorded.current) {
      referralRecorded.current = true;
      recordReferralHit(trackableCode);
    }

    if (typeof navigator === 'undefined') return;

    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isApple = /iphone|ipad|ipod/i.test(ua);
    if (!isAndroid && !isApple) return;

    const timeout = setTimeout(() => {
      setAttemptedRedirect(true);
      if (trackableCode && !referralRecorded.current) {
        referralRecorded.current = true;
        recordReferralHit(trackableCode);
      }
      analytics.trackRewardAutoRedirect({
        rewardCode: primaryCode,
        referralCode: effectiveReferralCode ?? undefined,
        platform: isAndroid ? 'android' : 'ios',
      });

      if (isAndroid) {
        const playUrl = getStoreUrl('android');
        window.location.href = playUrl;
      } else if (isApple) {
        const appStoreUrl = getStoreUrl('ios');
        window.location.href = appStoreUrl;
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [primaryCode, referralCode, trackableCode, requiresEmailCapture, emailCaptured, effectiveReferralCode]);

  const openAppScheme = () => {
    if (!primaryCode) return;
    const params = new URLSearchParams();
    if (effectiveReferralCode) {
      params.set('referralCode', effectiveReferralCode);
    }
    const suffix = params.toString();
    const target = suffix
      ? `recce://rewards/${encodeURIComponent(primaryCode)}?${suffix}`
      : `recce://rewards/${encodeURIComponent(primaryCode)}`;
    analytics.trackRewardOpenInApp({
      rewardCode: primaryCode,
      referralCode: effectiveReferralCode ?? undefined,
    });
    window.location.href = target;
  };

  const preferredReferrerName = useMemo(() => {
    if (referrerName) {
      const trimmed = referrerName.trim();
      if (trimmed.length === 0) return null;
      const firstWord = trimmed.split(/\s+/)[0];
      return firstWord || trimmed;
    }
    return null;
  }, [referrerName]);

  const flowType = referralContext.type;

  const emailCaptureTitle = useMemo(() => {
    if (flowType === 'campaign') {
      return 'Download Recce to Claim Points';
    }
    if (preferredReferrerName) {
      return `${preferredReferrerName} Invited You, Claim 100 Recce Points`;
    }
    return "You've been invited!";
  }, [flowType, preferredReferrerName]);

  const emailCaptureDescription = useMemo(() => {
    if (flowType === 'campaign') {
      return 'Recce Rewards = Points & Prizes. Enter your email and download Recce to get your 100 Recce points.';
    }
    if (preferredReferrerName) {
      return `Enter your email and download Recce to get your 100 reward points and ${preferredReferrerName} gets 100 too.`;
    }
    return 'Enter your email and download Recce to get your 100 reward points.';
  }, [flowType, preferredReferrerName]);

  const secureButtonLabel = 'Secure your points';

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const candidate = emailValue.trim();
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(candidate)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError(null);
    setIsSubmittingEmail(true);
    try {
      await submitReferralEmail({
        referralCode: effectiveReferralCode ?? '',
        email: candidate,
        visitorId,
      });
      setEmailCaptured(true);
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Failed to submit referral email', error);
      setEmailError('Something went wrong saving your email. Please try again.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="text-white/60 hover:text-[#ff7802] mb-6 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-[#FFFFFF1A] border border-[#383838] rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Claim Your Reward</h1>

          {primaryCode ? (
            <div className="space-y-6 text-white/60">
              {requiresEmailCapture && !emailCaptured ? (
                <div className="space-y-6">
                  <div className="space-y-2 text-white">
                    <p className="text-sm uppercase tracking-wide text-[#ff7802]">Recce</p>
                    <h2 className="text-2xl font-semibold text-white">{emailCaptureTitle}</h2>
                    <p className="text-white/60">{emailCaptureDescription}</p>
                    {referrerLoading && <p className="text-sm text-white/60">Verifying your invitation...</p>}
                    {referrerError && <p className="text-sm text-amber-600">{referrerError}</p>}
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="reward-email" className="text-sm font-medium text-white">
                        Your Email Address
                      </label>
                      <input
                        id="reward-email"
                        type="email"
                        autoComplete="email"
                        value={emailValue}
                        onChange={(event) => setEmailValue(event.target.value)}
                        className="w-full rounded-lg border border-[#383838] bg-[#1E1E1E] px-4 py-3 text-base text-white shadow-sm focus:border-[#ff7802] focus:outline-none focus:ring-2 focus:ring-[#ff7802]/30"
                        placeholder="you@example.com"
                        disabled={isSubmittingEmail}
                        required
                      />
                      {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingEmail}
                      className="w-full rounded-lg bg-[#ff7802] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#ff7802]/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmittingEmail ? 'Securing...' : secureButtonLabel}
                    </button>

                    <p className="text-xs text-white/40">
                      By continuing, you agree to our{' '}
                      <a href="/#terms" className="underline hover:text-[#ff7802]">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/#privacy" className="underline hover:text-[#ff7802]">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                </div>
              ) : (
                <>
                  <p className="text-white/60">
                    The reward code <strong className="text-white">{primaryCode}</strong> is ready to use. If the
                    Recce app is installed, we&apos;ll open it automatically. Otherwise you can grab the app from your
                    store.
                  </p>

                  {emailSubmitted && (
                    <div className="rounded-md border border-[#ff7802]/40 bg-[#ff7802]/10 px-4 py-3 text-sm text-[#ff7802]">
                      Thanks! We&apos;ve saved your email so you can finish signing up in the app.
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={openAppScheme}
                      className="px-6 py-3 bg-[#ff7802] text-white rounded-lg hover:bg-[#ff7802]/90 transition-colors font-medium"
                    >
                      Open in App
                    </button>
                  </div>

                  <DownloadButtons className="mt-3" includeStoreParams={false} />

                  {attemptedRedirect && (
                    <p className="text-sm text-white/40">
                      Redirecting to the app store... If nothing happens, tap a store button above.
                    </p>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="text-white/60 space-y-4">
              <p>No reward code was provided in the link.</p>
              <DownloadButtons className="mt-4" includeStoreParams={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
