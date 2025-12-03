'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { analytics } from '@/lib/analytics';

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? 'REPLACE_WITH_YOUR_SITE_KEY';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function DeleteAccountClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    username?: string;
    reason?: string;
  }>({});

  const validEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const canSubmit = validEmail(email) && confirm && !submitting;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!recaptchaSiteKey || recaptchaSiteKey === 'REPLACE_WITH_YOUR_SITE_KEY') return;

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-recaptcha-script="true"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaScript = 'true';
    script.onerror = () => {
      console.error('[DeleteAccount] Failed to load reCAPTCHA v3 script.');
      setCaptchaError('Failed to load security check. Please try again later.');
    };

    document.body.appendChild(script);

    return () => {
      // Keep the script for the session to avoid reloading on unmount
    };
  }, []);

  const acquireRecaptchaToken = async () => {
    if (!recaptchaSiteKey || recaptchaSiteKey === 'REPLACE_WITH_YOUR_SITE_KEY') {
      setCaptchaError('reCAPTCHA site key is not configured.');
      return null;
    }

    const grecaptcha = await new Promise<typeof window.grecaptcha | null>((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve(window.grecaptcha || null));
        return;
      }
      const check = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(check);
          window.grecaptcha.ready(() => resolve(window.grecaptcha || null));
        }
      }, 100);
      setTimeout(() => {
        clearInterval(check);
        resolve(null);
      }, 8000);
    });

    if (!grecaptcha) {
      setCaptchaError('Unable to reach reCAPTCHA. Please refresh and try again.');
      return null;
    }

    try {
      const token = await grecaptcha.execute(recaptchaSiteKey, { action: 'delete_account' });
      setCaptchaError(null);
      setCaptchaToken(token);
      return token;
    } catch (err) {
      console.error('[DeleteAccount] reCAPTCHA execution failed', err);
      setCaptchaError('Security verification failed. Please try again.');
      return null;
    }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!canSubmit) return;

    setServerError(null);
    setFieldErrors({});

    setSubmitting(true);

    const token = await acquireRecaptchaToken();
    if (!token) {
      analytics.trackDeleteRequestFailed({
        error: 'missing-captcha-token',
        emailProvided: Boolean(email),
        userIdProvided: Boolean(username),
      });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://2zo116ibbb.execute-api.eu-west-2.amazonaws.com/delete-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim() || undefined,
          reason: reason.trim() || undefined,
          captchaToken: token,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorCode = errorBody?.error;
        const errorMessage = errorBody?.message;

        analytics.trackDeleteRequestFailed({
          error: errorCode ?? 'unknown',
          emailProvided: Boolean(email),
          userIdProvided: Boolean(username),
        });

        const nextFieldErrors: typeof fieldErrors = {};
        let topMessage =
          errorMessage ||
          (errorCode === 'invalid-email' ||
          errorCode === 'invalid-username' ||
          errorCode === 'invalid-reason'
            ? 'Please correct the highlighted fields.'
            : "We couldn't process your request. Please try again.");

        switch (errorCode) {
          case 'invalid-email':
            nextFieldErrors.email = 'Please enter a valid email address.';
            break;
          case 'invalid-username':
            nextFieldErrors.username = 'Username must be alphanumeric and up to 15 characters.';
            break;
          case 'invalid-reason':
            nextFieldErrors.reason = 'Reason must be 50 characters or fewer.';
            break;
          case 'captcha-failed':
          case 'missing-captcha-token':
            topMessage = "We couldn't verify the security check. Please refresh and try again.";
            break;
          case 'dynamodb-write-failed':
            topMessage = "We couldn't record your request. Please try again shortly.";
            break;
          default:
            break;
        }

        setFieldErrors(nextFieldErrors);
        setServerError(topMessage);
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
      analytics.trackDeleteRequestSubmitted({
        emailProvided: Boolean(email),
        userIdProvided: Boolean(username),
      });
    } catch (error) {
      console.error('[DeleteAccount] submission failed', error);
      setServerError(error instanceof Error ? error.message : 'Unexpected error');
      setSubmitting(false);
      analytics.trackDeleteRequestFailed({
        error: error instanceof Error ? error.message : 'unexpected',
        emailProvided: Boolean(email),
        userIdProvided: Boolean(username),
      });
    }
  };

  const handleReset = () => {
    setEmail('');
    setUsername('');
    setReason('');
    setConfirm(false);
    setCaptchaToken(null);
    setCaptchaError(null);
    setServerError(null);
    setFieldErrors({});
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
          <h1 className="text-4xl font-bold text-white mb-2">Request Account Deletion</h1>
          {!submitted && (
            <p className="text-white/60 mb-6">
              Use this form to request deletion of your account and personal data in accordance with GDPR. We&apos;ll
              process the request after confirming the details you provide.
            </p>
          )}

          {serverError && !submitted && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {serverError}
            </div>
          )}

          {submitted ? (
            <div className="space-y-4">
              <p className="text-white">Thank you — your deletion request has been recorded.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-[#ff7802] text-white rounded-lg hover:bg-[#ff7802]/90 transition-colors font-medium"
                >
                  Return Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email (we will confirm via email)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full rounded-lg border ${
                    fieldErrors.email || (!validEmail(email) && email.length > 0)
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-[#383838] focus:border-[#ff7802] focus:ring-[#ff7802]/30'
                  } bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2`}
                />
                {fieldErrors.email && <p className="text-sm text-red-400 mt-1">{fieldErrors.email}</p>}
                {!validEmail(email) && email.length > 0 && !fieldErrors.email && (
                  <p className="text-sm text-red-400 mt-1">Please enter a valid email address.</p>
                )}
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                  Username (optional)
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username (if known)"
                  className={`w-full rounded-lg border ${
                    fieldErrors.username
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-[#383838] focus:border-[#ff7802] focus:ring-[#ff7802]/30'
                  } bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2`}
                />
                {fieldErrors.username && <p className="text-sm text-red-400 mt-1">{fieldErrors.username}</p>}
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-white mb-2">
                  Reason for deletion (optional)
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Optional: tell us why you're leaving"
                  rows={4}
                  className={`w-full rounded-lg border ${
                    fieldErrors.reason
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-[#383838] focus:border-[#ff7802] focus:ring-[#ff7802]/30'
                  } bg-[#1E1E1E] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 resize-none`}
                />
                {fieldErrors.reason && <p className="text-sm text-red-400 mt-1">{fieldErrors.reason}</p>}
              </div>

              <div className="flex items-start">
                <input
                  id="confirm"
                  type="checkbox"
                  checked={confirm}
                  onChange={(e) => setConfirm(e.target.checked)}
                  className="mt-1 mr-3 h-5 w-5 accent-red-500 cursor-pointer"
                />
                <label htmlFor="confirm" className="text-sm text-white cursor-pointer">
                  I understand this will permanently delete my account and associated personal data.
                </label>
              </div>

              <div className="space-y-2 bg-[#1E1E1E] rounded-lg p-4 border border-[#383838]">
                <p className="text-sm text-white/60">
                  To protect this form we use reCAPTCHA. A background security check runs when you submit.
                </p>
                {captchaError && <p className="text-sm text-red-400">{captchaError}</p>}
                {captchaToken && !captchaError && (
                  <p className="text-xs text-green-400">✓ Security check completed for this request.</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    canSubmit
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-[#383838] text-white/40 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Submitting…' : 'Request Deletion'}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#383838] text-white rounded-lg hover:bg-[#484848] transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
