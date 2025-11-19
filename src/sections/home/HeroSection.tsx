import Header from "@/components/layout/Header";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Background Image Container */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="/assets/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover "
          priority
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Gradient overlay at bottom to blend with content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#191919]"></div>
        
        {/* Header positioned over background */}
        <div className="relative z-10">
          <Header />
        </div>

        {/* Welcome to Recce - Centered at bottom of image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <p className="text-white text-sm md:text-2xl mb-[-10px] md:mb-[-26px] md:text-left md:relative md:left-7 leading-tight">Welcome to</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight md:relative md:right-6">Recce</h1>
        </div>
      </div>

      {/* Content Band - Dark section below image */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start md:items-center">

            {/* Left: Cures Content Overload (single row on mobile) */}
            <div className="text-white text-center md:text-left flex flex-row md:block items-center justify-center md:justify-start">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-0 md:mb-4">
                Cures Content
              </h2>
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-[#ff7802] ml-3 md:ml-0">
                Overload
              </h2>
            </div>

            {/* Right: Description and App Store Buttons */}
            <div className="text-white text-center md:text-left">
              <p className="text-sm md:text-lg mb-6 md:mb-8 opacity-90 text-gray-300 md:pl-8 lg:pl-20">
                Recce is the home of authentic reviews. See what your friends are watching, what they loved (or didn't), and why it's worth your time tonight.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start md:pl-8 lg:pl-20">
                <div className="flex items-center bg-[#FFFFFF1A] rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="mr-3">
                    <img src="/assets/icons/Google_Play.svg" alt="" className="w-5 md:w-6 h-5 md:h-6"/>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>

                <div className="flex items-center bg-[#FFFFFF1A] rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="mr-3">
                    <img src="/assets/icons/Apple.svg" alt="" className="w-5 md:w-6 h-5 md:h-6"/>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}