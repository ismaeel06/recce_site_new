import Footer from "@/components/layout/Footer";
import BenefitsHero from "@/sections/benefits/BenefitsHero";
import Perks from "@/sections/benefits/Perks";
import HowToQualify from "@/sections/benefits/HowToQualify";

export default function BenefitsPage() {
  return (
    <div className="min-h-screen font-sans">
      <BenefitsHero />

      <main className="py-12 md:py-16 lg:py-20">
        <Perks />
        <HowToQualify />
      </main>

      <Footer />
    </div>
  );
}
