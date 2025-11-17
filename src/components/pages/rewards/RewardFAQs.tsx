"use client";

import { useState } from "react";

export default function RewardFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I add friends on Recce?",
      answer: "You can add friends by searching for their username, scanning their profile QR code, or inviting them via your unique invite link. Once you're connected, you can see each other's reviews and recommendations."
    },
    {
      question: "Can I import my watchlist from another service?",
      answer: "Yes! Recce supports importing watchlists from popular streaming platforms and movie databases. Visit Settings > Import Watchlist and follow the prompts to get started."
    },
    {
      question: "How does Recce handle spoilers in reviews?",
      answer: "We have a built-in spoiler protection system. You can mark your review as containing spoilers, which will blur the content for other users until they choose to reveal it."
    },
    {
      question: "Is Recce free to use?",
      answer: "Yes, Recce is completely free to use! You can write reviews, earn rewards, and enjoy all our features without any subscription fees."
    },
    {
      question: "How are rewards calculated?",
      answer: "Rewards are calculated based on engagement metrics like review quality, community upvotes, friend invitations, and the impact of your recommendations. The more active and helpful you are, the more points you earn!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors text-left"
              >
                <span className="text-gray-300 font-medium text-lg">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-orange-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Answer - Collapsible */}
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 border-t border-gray-700">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
