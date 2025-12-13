'use client';
import React, { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import TeamMember from "@/app/components/team/TeamMember";
import { getTeamHero, getTeamMembers } from "@/app/lib/strapi";

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showMoreTeam, setShowMoreTeam] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [teamHero, setTeamHero] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const heroData = await getTeamHero();
      setTeamHero(heroData);
      const membersData = await getTeamMembers();
      setTeamMembers(membersData.map((m: any) => ({
        ...m,
        image: m?.image?.url
      })));
    };
    getData();
  }, [])

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsModalOpen(false);
    }

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const normalizeMessage = (raw: any) => {
    if (!raw && raw !== 0) return '';
    if (typeof raw === 'string') {
      // Map common unique/duplicate messages to a friendly email-specific message
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

  const openModal = () => {
    setSubmitted(false);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setSubmitted(false);

    const doSubmit = async () => {
      try {
        setSubmitting(true);
        const payload = {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message || null,
        };

        const res = await fetch('/api/join-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
          const raw = json?.error ?? json?.message ?? json ?? 'Request failed. Please try again.';
          const message = normalizeMessage(raw) || 'Request failed. Please try again.';
          setToast({ message, type: 'error' });
          setSubmitted(false);
        } else {
          const firstName = json?.joinRequest?.first_name;
          const successText = firstName ? `Thanks — we got it, ${firstName}!` : 'Thanks — we got it!';
          setToast({ message: successText, type: 'success' });
          setSubmitted(true);
          setForm({ firstName: '', lastName: '', email: '', message: '' });
        }
      } catch (err) {
        console.error('Join request submit error', err);
        const message = normalizeMessage((err as any)?.message ?? err) || 'Request failed. Please try again later.';
        setToast({ message, type: 'error' });
      } finally {
        setSubmitting(false);
      }
    };

    void doSubmit();
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-semibold mb-6 text-center">
              {teamHero?.title} <span className="text-[#ff7802]">{teamHero?.highlighted}</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              {teamHero?.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-y-4 gap-6 px-6 sm:px-12 mb-16">
          {teamMembers
            .slice(0, isMobile && !showMoreTeam ? 4 : teamMembers.length)
            .map((teamMember: any, index: number) => {
              return (
                // wrap in a clickable div for the "you" (Join Our Team) card so it opens the modal
                <div
                  key={index}
                  className={`rounded-lg transition-transform hover:scale-[1.01] ${teamMember.you ? "cursor-pointer" : ""}`}
                  onClick={() => teamMember.name === 'Join Our Team' && openModal()}
                >
                  <TeamMember
                    name={teamMember.name}
                    title={teamMember.title}
                    description={teamMember.description}
                    image={teamMember.image}
                  />
                </div>
              );
            })}
        </div>

        {/* Load More Button for Mobile */}
        {!showMoreTeam && teamMembers.length > 4 && (
          <div className="md:hidden flex justify-center mt-8 px-6">
            <button
              onClick={() => setShowMoreTeam(true)}
              className="px-8 py-2 border border-white text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            {/* backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={closeModal}
              data-testid="modal-backdrop"
            />

            <div className="relative z-60 w-full max-w-2xl mx-auto">
              <div className="bg-[#191919] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-4xl font-bold">Join Our Team</h2>
                  </div>

                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/5">
                    ✕
                  </button>
                </div>

                <div className="mt-6">
                  {submitted ? (
                    <div className="p-6 rounded-lg bg-white/5 text-center">
                      <h3 className="font-medium text-lg">Thanks — we got it!</h3>
                      <p className="mt-2 text-sm text-white/60">We'll review your submission and get back to you soon.</p>
                      <div className="mt-4">
                        <button
                          onClick={closeModal}
                          className="px-4 py-2 rounded-md bg-white text-black font-medium cursor-pointer">
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                      <div className="md:grid md:grid-cols-2 gap-4">
                        <div className="relative my-4 md:my-0">
                          <img
                            src="/assets/PersonIcon.png"          // or a png: /images/user.png
                            alt=""                         // decorative -> empty alt
                            aria-hidden="true"
                            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 opacity-80"
                          />

                          <input
                            required
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First Name*"
                            className="w-full px-4 py-4 pl-12 md:pl-14 rounded-[16px] bg-white/5 border border-white text-white"
                          />
                        </div>

                        <div className="relative">
                          <img
                            src="/assets/PersonIcon.png"          // or a png: /images/user.png
                            alt=""                         // decorative -> empty alt
                            aria-hidden="true"
                            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 opacity-80"
                          />

                          <input
                            required
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last Name*"
                            className="w-full px-4 py-4 pl-12 md:pl-14 rounded-[16px] bg-white/5 border border-white text-white"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <img
                          src="/assets/EmailIcon.png"          // or a png: /images/user.png
                          alt=""                         // decorative -> empty alt
                          aria-hidden="true"
                          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 opacity-80"
                        />

                        <input
                          required
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email*"
                          className="w-full px-4 py-4 pl-12 md:pl-14 rounded-[16px] bg-white/5 border border-white text-white"
                        />
                      </div>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write your message"
                        className="w-full px-4 py-3 rounded-[16px] bg-white/5 border border-white text-white"
                      />

                      <div className="flex justify-center gap-3 mt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-12 py-2 rounded-md bg-white text-black font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-md shadow-md text-white text-sm ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="status" aria-live="polite">
            <div className="flex items-center gap-3">
              <div>{toast.message}</div>
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

      <Footer />
    </div>
  );
}
