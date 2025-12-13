import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorksHero from "@/sections/how-it-works/HowItWorksHero";
import ExtrasSection from "@/sections/how-it-works/ExtrasSection";

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HowItWorksHero />
        <ExtrasSection />
      </main>
      
      <Footer />
    </div>
  );
}