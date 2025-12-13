'use client';

import { useEffect, useState } from 'react';
import type { NewsLetterSectionAttributes } from '@/app/types/strapi';
import { getNewsLetterSection } from '@/app/lib/strapi';

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

  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const normalizeMessage = (raw: any) => {
    if (!raw && raw !== 0) return '';
    if (typeof raw === 'string') {
      if (/must be unique|unique constraint|duplicate key|already exists|this attribute must be unique/i.test(raw)) {
        return 'Email must be unique';
      }
      return raw;
    }
    if (typeof raw === 'object') {
      const candidate = typeof raw.message === 'string' ? raw.message : typeof raw.error === 'string' ? raw.error : '';
      if (candidate && /must be unique|unique constraint|duplicate key|already exists|this attribute must be unique/i.test(candidate)) {
        return 'Email must be unique';
      }
      if (typeof raw.message === 'string') return raw.message;
      if (typeof raw.error === 'string') return raw.error;
      try {
        return JSON.stringify(raw);
      } catch {
        return String(raw);
      }
    }
    return String(raw);
  };

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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitError(null);
              setSuccessMessage(null);

              const trimmed = email.trim();
              if (!trimmed || !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(trimmed)) {
                setSubmitError('Please enter a valid email address.');
                return;
              }

              try {
                setSubmitting(true);
                const res = await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: trimmed, is_subscribed: true }),
                });

                const json = await res.json().catch(() => ({}));
                if (!res.ok) {
                  const raw = json?.error ?? json?.message ?? json ?? 'Subscription failed.';
                  const message = normalizeMessage(raw) || 'Subscription failed.';
                  setSubmitError(message);
                  setToast({ message, type: 'error' });
                } else {
                  const message = 'Thanks for subscribing!';
                  setSuccessMessage(message);
                  setToast({ message, type: 'success' });
                  setEmail('');
                }
              } catch (err) {
                const message = normalizeMessage((err as any)?.message ?? err) || 'Subscription failed. Please try again later.';
                setSubmitError(message);
                setToast({ message, type: 'error' });
              } finally {
                setSubmitting(false);
              }
            }}
            className="flex gap-0 w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={state.data.newsletterPlaceholder}
              className="flex-1 md:flex-none px-3 md:px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-white placeholder-[#848686] focus:outline-none text-xs md:text-sm"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-4 md:px-6 lg:px-8 py-2.5 md:py-3 bg-[#ff7802] hover:bg-orange-600 disabled:opacity-50 text-white font-semibold transition-colors whitespace-nowrap text-xs md:text-sm"
            >
              {submitting ? 'Submitting...' : state.data.newsletterButtonText}
            </button>
          </form>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-md shadow-md text-white text-sm ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="status" aria-live="polite">
            <div className="flex items-center gap-3">
              <div>{toast.message.replace("This attribute", "Email")}</div>
              <button
                onClick={() => setToast(null)}
                aria-label="Dismiss"
                className="ml-2 p-1 opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsLetter;