export default function CTASection() {
  return (
    <section className="py-20 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Title and Download Buttons */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
            Ready to Discover Your <span className="text-[#ff7802] block md:inline-block">Next Favorite Show?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of movie and TV lovers who trust Recce for authentic recommendations. Build your watchlist, share reviews, and earn rewards for helping others discover great content.
          </p> 

          {/* Download Buttons */}
          <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
            <div className="flex items-center bg-[#FFFFFF1A] rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="mr-3">
                <img src="/assets/icons/Google_Play.svg" alt="" className="w-5 md:w-6 h-5 md:h-6"/>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-300">GET IT ON</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </div>

            <div className="flex items-center bg-[#FFFFFF1A] rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="mr-3">
                <img src="/assets/icons/Apple.svg" alt="" className="w-5 md:w-6 h-5 md:h-6"/>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-300">Download on the</div>
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Phone Mockup with Rings and Side Badges */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-4xl flex flex-col justify-center items-center">
            {/* Desktop: Full height container (only for 2xl and above) */}
            <div className="hidden xl:flex relative w-full h-screen justify-center items-center">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute w-48 h-48 md:w-96 md:h-96 border border-gray-700 rounded-full opacity-30"></div>
                <div className="absolute w-64 h-64 md:w-[28rem] md:h-[28rem] border border-gray-700 rounded-full opacity-20"></div>
                <div className="absolute w-80 h-80 md:w-[32rem] md:h-[32rem] border border-gray-700 rounded-full opacity-10"></div>
              </div>

              {/* Phone Mockup */}
              <div className="relative z-10 flex justify-center items-center">
                <img src="/assets/HomeCTA.svg" width="600" height="700" />
              </div>

              {/* Top Left Badge */}
              <div className="absolute top-20 left-4 md:top-32 md:left-[-118px] flex items-center gap-3 md:gap-4 z-20">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-white text-xs md:text-sm font-medium max-w-xs">
                    Never waste time on disappointing content again
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                  <img src="/assets/icons/time.svg" alt="" />
                </div>
              </div>

              {/* Bottom Left Badge */}
              <div className="absolute bottom-20 left-4 md:bottom-44  md:left-[-78px] flex items-center gap-3 md:gap-4 z-20">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-white text-xs md:text-sm font-medium max-w-xs">
                    Build your ultimate personalized watchlist
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                  <img src="/assets/icons/flame.svg" alt="" />
                </div>
              </div>

              {/* Top Right Badge */}
              <div className="absolute top-20 right-4 md:top-26 md:right-[-56px] flex items-center gap-3 md:gap-4 z-20">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                  <img src="/assets/icons/binoculor.svg" alt="" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-white text-xs md:text-sm font-medium max-w-xs text-right">
                    Discover shows your friends actually love
                  </p>
                </div>
              </div>

              {/* Bottom Right Badge */}
              <div className="absolute bottom-20 right-4 md:bottom-44 md:right-[-56px] flex items-center gap-3 md:gap-4 z-20">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center">
                  <img src="/assets/icons/ctagift.svg" alt="" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-white text-xs md:text-sm font-medium max-w-xs text-right">
                    Get rewarded for sharing honest reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet (iPad Pro): Phone centered with badges below in 2x2 grid */}
            <div className="xl:hidden flex flex-col items-center w-full">
              <div className="relative w-full flex justify-center mb-8">
                <img src="/assets/HomeCTA.svg" width="200" height="280" />
              </div>

              {/* Mobile Badge Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                {/* Top Left Badge */}
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                    <img src="/assets/icons/time.svg" alt="" />
                  </div>
                  <p className="text-white text-xs font-medium">
                    Never waste time on disappointing content again
                  </p>
                </div>

                {/* Top Right Badge */}
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                    <img src="/assets/icons/binoculor.svg" alt="" />
                  </div>
                  <p className="text-white text-xs font-medium">
                    Discover shows your friends actually love
                  </p>
                </div>

                {/* Bottom Left Badge */}
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                    <img src="/assets/icons/flame.svg" alt="" />
                  </div>
                  <p className="text-white text-xs font-medium">
                    Build your ultimate personalized watchlist
                  </p>
                </div>

                {/* Bottom Right Badge */}     
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
                    <img src="/assets/icons/ctagift.svg" alt="" />
                  </div>
                  <p className="text-white text-xs font-medium">
                    Get rewarded for sharing honest reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Newsletter */}
        <div className="mt-32 bg-[#FFFFFF1A] rounded-3xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Get the Best Stories, Straight to Your Inbox
              </h3>
              <p className="text-[#848686] text-sm">
                Sign up for our newsletter for a weekly round-up of our top articles and picks
              </p>
            </div>

            <div className="flex gap-0 w-full md:w-auto border border-[rgba(255, 255, 255, 0.3)] rounded-2xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-[#2a2a2a] text-white placeholder-text-gray-100 focus:outline-none text-sm"
              />
              <button className="px-1 md:px-8 py-2 md:py-3 bg-[#ff7802] border border-[#ff7802] hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>                                                      
        </div>
      </div>
    </section>
  );
}