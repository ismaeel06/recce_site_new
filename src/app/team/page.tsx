'use client';
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamMember from "@/components/team/TeamMember";
import { getTeamHero, getTeamMembers } from "@/lib/strapi";

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
  })

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
    // placeholder: replace with API call
    console.log("Apply form submitted:", form);
    setSubmitted(true);
    // keep modal open to show success state — optionally close after delay
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 md:w-[800px] text-center">
              {teamHero?.title} <span className="text-[#ff7802]">{teamHero?.highlighted}</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              {teamHero?.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-6 px-6 sm:px-12">
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
                    <h2 className="text-2xl font-semibold">Join Our Team</h2>
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
                        <button type="submit" className="px-4 py-2 rounded-md bg-white text-black font-semibold cursor-pointer">
                          Submit
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

      <Footer />
    </div>
  );
}
