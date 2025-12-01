"use client";

import { useEffect, useState } from "react";
import { getFaqs } from "@/lib/strapi";

export default function RewardFAQs({ page }: { page?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getFaqs();
      setFaqs(data);
    };
    getData();
  })

  // const faqs = [
  //   {
  //     question: "How do I add friends on Recce?",
  //     answer: "You can add friends by searching for their username, scanning their profile QR code, or inviting them via your unique invite link. Once you're connected, you can see each other's reviews and recommendations."
  //   },
  //   {
  //     question: "Can I import my watchlist from another service?",
  //     answer: "Yes! Recce supports importing watchlists from popular streaming platforms and movie databases. Visit Settings > Import Watchlist and follow the prompts to get started."
  //   },
  //   {
  //     question: "How does Recce handle spoilers in reviews?",
  //     answer: "We have a built-in spoiler protection system. You can mark your review as containing spoilers, which will blur the content for other users until they choose to reveal it."
  //   },
  //   {
  //     question: "Is Recce free to use?",
  //     answer: "Yes, Recce is completely free to use! You can write reviews, earn rewards, and enjoy all our features without any subscription fees."
  //   },
  //   {
  //     question: "How are rewards calculated?",
  //     answer: "Rewards are calculated based on engagement metrics like review quality, community upvotes, friend invitations, and the impact of your recommendations. The more active and helpful you are, the more points you earn!"
  //   }
  // ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={page !== 'help' ? 'py-16 md:py-24' : ''}>
      <div className="msx-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${page === 'help' ? 'mb-4' : 'mb-12 text-center'}`}>
          {page === 'help' ? <h2 className="text-2xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2> : <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-[#ff7802]">Questions</span>
          </h2>}
        </div>

        {/* FAQ Accordion */}
        <div className={`space-y-3 ${page === 'help' ? 'xl:w-4xl' : ''}`}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF1A] rounded-2xl border border-white/30 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors text-left cursor-pointer"
              >
                <span className="text-white/60 font-medium text-sm md:text-lg">{faq.question}</span>
                <img src="/assets/icons/arrow_down.svg" alt="\/" className={`w-6 h-6 transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>

              {/* Answer - Collapsible */}
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-white/50">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
