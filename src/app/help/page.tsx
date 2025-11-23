import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RewardFAQs from "@/sections/rewards/RewardFAQs";
import Contact from "@/sections/help/Contact";

export default function Partners() {
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-16">
        <div className="mx-auto">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium text-center">
              How Can We <span className="text-[#ff7802]">Help?</span>
            </h1>
            <p className="text-xs md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              Find what you need below or get in touch with our team.
            </p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-center gap-8 xl:gap-0">
          <RewardFAQs page="help" />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}