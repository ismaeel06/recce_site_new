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
            <div className="flex items-center bg-black rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="mr-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-300">GET IT ON</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </div>

            <div className="flex items-center bg-black rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="mr-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-300">Download on the</div>
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Phone Mockup */}
        <div className="flex justify-center mb-16">
          <div className="relative flex justify-center items-center z-10">
            <div className="w-64 h-96 bg-[#404040] rounded-3xl border-8 border-[#383838] overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                <p className="text-white text-sm">App Preview</p>
                <p className="text-white text-xs mt-2">(To be added later)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Newsletter */}
        <div className="mt-32 bg-[#404040] rounded-3xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Get the Best Stories, Straight to Your Inbox
              </h3>
              <p className="text-[#848686] text-sm">
                Sign up for our newsletter for a weekly round-up of our top articles and picks
              </p>
            </div>

            <div className="flex gap-0 w-full md:w-auto border border-geay-100 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-[#2a2a2a] text-white placeholder-text-gray-100 focus:outline-none text-sm"
              />
              <button className="px-1 md:px-8 py-2 md:py-3 bg-[#ff7802] hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}