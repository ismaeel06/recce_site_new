import Footer from "@/app/components/layout/Footer";
import HeroSection from "@/app/sections/home/HeroSection";
import FeaturesSection from "@/app/sections/home/FeaturesSection";
import RecentBlogsSection from "@/app//sections/home/RecentBlogsSection";
import CTASection from "@/app/sections/home/CTASection";

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
