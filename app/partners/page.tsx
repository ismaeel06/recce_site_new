"use client";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Card from "@/app/components/partners/Card";
import { useState, useEffect } from "react";
import { getPartnersHero, getPrincipalPartnersTitle, getOfficialPartnersTitle, getPrinicpalPartners, getOfficialPartners } from "@/app/lib/strapi";

export default function Partners() {
  const [showMoreOfficial, setShowMoreOfficial] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroData, setHeroData] = useState<any>({});
  const [officalPartnersTitle, setOfficialPartnersTitle] = useState<any>({});
  const [principalPartnersTitle, setPrinicipalPartnersTitle] = useState<any>({});
  const [principalPartners, setPrincipalPartners] = useState<any[]>([]);
  const [officialPartners, setOfficialPartners] = useState<any[]>([]);

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setHeroData(await getPartnersHero());
      setPrinicipalPartnersTitle(await getPrincipalPartnersTitle());
      setOfficialPartnersTitle(await getOfficialPartnersTitle());
      const data1 = await getPrinicpalPartners();
      setPrincipalPartners(data1.map((d: any) => ({
        ...d,
        image: d?.image?.url
      })))
      const data2 = await getOfficialPartners();
      setOfficialPartners(data2.map((d: any) => ({
        ...d,
        image: d?.image?.url
      })))
    };
    getData();
  }, [])
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-semibold mb-6 text-center">
              {heroData?.title} <span className="text-[#ff7802]">{heroData?.highlighted}</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              {heroData?.description}
            </p>
          </div>
          <div>
            <p className="text-center text-2xl md:text-[48px] font-semibold">{principalPartnersTitle?.title}</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-4">
              {principalPartners.map((p: any, index: number) => {
                return <div key={index} className="sm:display:none  lg:w-[420px]"><Card imgUrl={p.image} description={p.description} /></div>
              })}
            </div>
          </div>
          <div className="mt-16 flex flex-col justofy-center m-auto">
            <p className="text-center text-2xl md:text-[48px] font-semibold">{officalPartnersTitle?.title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 items-stretch">
              {officialPartners.slice(0, isMobile && !showMoreOfficial ? 3 : officialPartners.length).map((p: any, index: number) => {
                return <Card key={index} imgUrl={p.image} description={p.description} />
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