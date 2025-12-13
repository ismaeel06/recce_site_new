import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import HowItWorksHero from "@/app/sections/how-it-works/HowItWorksHero";
import ExtrasSection from "@/app/sections/how-it-works/ExtrasSection";

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