import Footer from "@/app/components/layout/Footer";
import BenefitsHero from "@/app/sections/benefits/BenefitsHero";
import Perks from "@/app/sections/benefits/Perks";
import HowToQualify from "@/app/sections/benefits/HowToQualify";

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
