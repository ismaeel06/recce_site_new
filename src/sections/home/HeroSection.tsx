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
          className="object-cover"
          priority
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
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
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start md:items-center">
            
            {/* Left: Cures Content Overload (single row on mobile) */}
            <div className="text-white text-center md:text-left flex flex-row md:block items-center justify-center md:justify-start">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-0 md:mb-4">
                Cures Content
              </h2>
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-orange-500 ml-3 md:ml-0">
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
                <div className="flex items-center bg-black rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="mr-3">
                    <svg className="w-5 md:w-6 h-5 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-black rounded-lg px-4 md:px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="mr-3">
                    <svg className="w-5 md:w-6 h-5 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                    </svg>
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