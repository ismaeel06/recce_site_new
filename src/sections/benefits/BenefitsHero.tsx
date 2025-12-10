'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { getBenefitsHero, getStrapiImageUrl } from "@/lib/strapi";

export default function BenefitsHero() {
  const [benefitsHero, setBenefitsHero] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const data = await getBenefitsHero();
      setBenefitsHero(data);
    }
    getData();
  }, [])

  const backgroundImageUrl = benefitsHero?.backgroundImage
    ? getStrapiImageUrl(benefitsHero.backgroundImage)
    : null;

  return (
    <section className="relative">
      {/* Background Image Container */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {backgroundImageUrl && (
          <Image
            src={backgroundImageUrl}
            alt="Benefits Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Header positioned over background */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Content - Centered */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Coming Soon Badge */}
          <div className="mb-6 md:mb-8">
            <div className="bg-[#ff7802] text-white px-6 sm:px-8 py-1 rounded-xl text-xs sm:text-base font-medium">
              Coming Soon
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center font-bold text-white">
            {benefitsHero?.title} <span className="text-[#ff7802]">{benefitsHero?.highlighted}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto text-center mt-4 md:mt-6">
            {benefitsHero?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
