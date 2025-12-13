import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/home/HeroSection";
import FeaturesSection from "@/sections/home/FeaturesSection";
import RecentBlogsSection from "@/sections/home/RecentBlogsSection";
import CTASection from "@/sections/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <HeroSection />

      <main>
        <FeaturesSection />
        <RecentBlogsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
