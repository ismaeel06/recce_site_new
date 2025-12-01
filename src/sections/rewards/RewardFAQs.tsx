"use client";

import { useState, useEffect } from "react";
import { getFAQs } from "@/lib/strapi";

interface FAQ {
  question: string;
  answer: string;
  displayOrder?: number;
}

export default function RewardFAQs({ page }: { page?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedFaqs = await getFAQs();

        if (isMounted) {
          const sortedFaqs = fetchedFaqs.sort(
            (a: FAQ, b: FAQ) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
          );
          setFaqs(sortedFaqs);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load Global FAQs"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    console.error("Reward FAQs Error:", error);
  }

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
