'use client';
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/whyRecce/Card";
import Rationale from "@/components/whyRecce/Rationale";
import { getWhyRecceCards, getWhyRecceHero } from "@/lib/strapi";

export default function WhyRecce() {
  const [cards, setCards] = useState<any | null>(null);
  const [heroSection, setHeroSection] = useState<any | null>(null);
  useEffect(() => {
    const getData = async () => {
      const heroData = await getWhyRecceHero();
      setHeroSection({
        title: heroData?.title,
        highlighted: heroData?.highlighted,
        description: heroData?.description
      })
      const data = await getWhyRecceCards();
      setCards(data?.map((d: any) => ({
        title: d.title,
        description: d.description,
        imgUrl: process.env.NEXT_PUBLIC_STRAPI_URL + d.thumbnail.url
      })))
    }
    getData();
  }, [])
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12 md:py-16 lg:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 lg:mb-20 flex flex-col justify-center items-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 text-center leading-snug">
              {heroSection?.title} <span className="text-[#ff7802]">{heroSection?.highlighted}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-center">
              {heroSection?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-center items-stretch mb-12 md:mb-16 lg:mb-20">
            {cards && cards.map((card: any, index: number) => {
              return <Card key={index} title={card.title} description={card.description} imgUrl={card.imgUrl} />
            })}
          </div>
          <Rationale />
        </div>
      </main>

      <Footer />
    </div>
  );
}