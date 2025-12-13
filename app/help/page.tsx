'use client';
import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import RewardFAQs from "@/app/sections/rewards/RewardFAQs";
import Contact from "@/app/sections/help/Contact";
import { getHelpHero } from "@/app/lib/strapi";

export default function Partners() {
  const [helpHero, setHelpHero] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const heroData = await getHelpHero();
      setHelpHero(heroData);
    };
    getData();
  }, [])
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-12">
        <div className="mx-auto">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-semibold text-center">
              {helpHero?.title} <span className="text-[#ff7802]">{helpHero?.highlighted}</span>
            </h1>
            <p className="text-xs md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              {helpHero?.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-center gap-8 xl:gap-0">
          <RewardFAQs page="help" />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}