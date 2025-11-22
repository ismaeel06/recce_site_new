"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/partners/Card";
import { useState, useEffect } from "react";

export default function Partners() {
  const [showMoreOfficial, setShowMoreOfficial] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const principalPartners = [
    {
      imgUrl: '/assets/Pringles.png',
      description: 'Netflix is a streaming service that offers a vast library of TV shows, movies, documentaries, and more for a monthly fee. continues to add new and award-winning content weekly'
    },
    {
      imgUrl: '/assets/Wrangler.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    }
  ]
  const officialPartners = [
    {
      imgUrl: '/assets/HSBC.png',
      description: 'Netflix is a streaming service that offers a vast library of TV shows, movies, documentaries, and more for a monthly fee. continues to add new and award-winning content weekly'
    },
    {
      imgUrl: '/assets/Wrangler.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    },
    {
      imgUrl: '/assets/Pringles.png',
      description: 'Netflix is a streaming service that offers a vast library of TV shows, movies, documentaries, and more for a monthly fee. continues to add new and award-winning content weekly'
    },
    {
      imgUrl: '/assets/HSBC.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    },
    {
      imgUrl: '/assets/Wrangler.png',
      description: 'Netflix is a streaming service that offers a vast library of TV shows, movies, documentaries, and more for a monthly fee. continues to add new and award-winning content weekly'
    },
    {
      imgUrl: '/assets/HSBC.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    },
    {
      imgUrl: '/assets/Pringles.png',
      description: 'Netflix is a streaming service that offers a vast library of TV shows, movies, documentaries, and more for a monthly fee. continues to add new and award-winning content weekly'
    },
    {
      imgUrl: '/assets/Wrangler.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    },
    {
      imgUrl: '/assets/HSBC.png',
      description: 'HBO (Home Box Office) is a premium American television network known for its original, high-quality, and award-winning series, films, and documentaries.'
    }
  ]
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 text-center">
              Great stories are Better <span className="text-[#ff7802]">Together</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              Recce thrives on community. We're proud to collaborate with organizations and creators who
              share our passion for film, TV, and authentic recommendations.
            </p>
          </div>
          <div>
            <p className="text-center text-2xl md:text-[48px] font-medium">Principal Partners</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-4">
              {principalPartners.map((p: any, index: number) => {
                return <div key={index} className="sm:display:none  lg:w-[420px]"><Card imgUrl={p.imgUrl} description={p.description} /></div>
              })}
            </div>
          </div>
          <div className="mt-16 flex flex-col justofy-center m-auto">
            <p className="text-center text-2xl md:text-[48px] font-medium">Official Partners</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 items-stretch">
              {officialPartners.slice(0, isMobile && !showMoreOfficial ? 3 : officialPartners.length).map((p: any, index: number) => {
                return <Card key={index} imgUrl={p.imgUrl} description={p.description} />
              })}
            </div>
            {isMobile && !showMoreOfficial && officialPartners.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMoreOfficial(true)}
                  className="px-8 py-2 border border-white text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}