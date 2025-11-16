import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/pages/home/HeroSection";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import RecentBlogsSection from "@/components/pages/home/RecentBlogsSection";
import CTASection from "@/components/pages/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
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
