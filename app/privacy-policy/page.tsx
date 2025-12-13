"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { getPrivacyPolicy } from "@/app/lib/strapi";
import { richTextToHtml } from "@/app/lib/richTextToHtml";

interface PolicySection {
  sectionId: string;
  title: string;
  content: any[];
}

interface PrivacyPolicyData {
  title: string;
  description: string;
  publishedAt?: string;
  sections: PolicySection[];
  contactEmail?: string;
}

export default function PrivacyPolicy() {
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policyData = await getPrivacyPolicy();
        setData(policyData);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center h-96">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero Section */}
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              {data?.title || "Privacy Policy"}
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-4">
              {data?.description || ""}
            </p>
            {data?.publishedAt && (
              <p className="text-white/40 text-sm">
                Last updated: {new Date(data.publishedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Content Sections */}
          <div className="space-y-8 md:space-y-12">
            {data?.sections && data.sections.length > 0 ? (
              data.sections.map((section) => (
                <div key={section.sectionId}>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                    {section.title}
                  </h2>
                  <div
                    className="text-white/80 leading-relaxed space-y-4 text-base sm:text-lg prose prose-invert max-w-none [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-3 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:text-white/80 [&_p]:text-white/80 [&_strong]:text-white [&_em]:italic [&_a]:text-[#ff7802] [&_a:hover]:underline"
                    dangerouslySetInnerHTML={{ __html: richTextToHtml(section.content) }}
                  />
                </div>
              ))
            ) : (
              <div className="text-white/60">No policy content available</div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-white/10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Questions?
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6">
              If you have any questions about our Privacy Policy, please contact us at:
            </p>
            <a
              href={`mailto:${data?.contactEmail}`}
              className="inline-block px-6 py-3 bg-[#ff7802] text-white rounded-lg hover:bg-[#e56b00] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
