'use client';
import { useEffect, useState } from "react";
import { getBenefitsHero } from "@/lib/strapi";
export default function BenefitsHero() {
  const [benefitsHero, setBenefitsHero] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const data = await getBenefitsHero();
      setBenefitsHero(data);
    }
    getData();
  }, [])
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 flex flex-col md:py-32 items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium md:mb-6 text-center font-bold">
          {benefitsHero?.title} <span className="text-[#ff7802]">{benefitsHero?.highlighted}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto text-center">
          {benefitsHero?.description}
        </p>
      </div>
    </div>
  );
}
