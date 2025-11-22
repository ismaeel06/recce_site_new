import React from 'react'

function NewsLetter() {
    return (
        <div className="mt-12 md:mt-20 lg:mt-32 bg-[#2a2a2a] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                <div className="w-full md:flex-1">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2">
                        Get the Best Stories, Straight to Your Inbox
                    </h3>
                    <p className="text-xs md:text-sm text-[#848686]">
                        Sign up for our newsletter for a weekly round-up of our top articles and picks
                    </p>
                </div>

                <div className="flex gap-0 w-full md:w-auto border border-[rgba(255, 255, 255, 0.2)] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 md:flex-none px-3 md:px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-white placeholder-[#848686] focus:outline-none text-xs md:text-sm"
                    />
                    <button className="px-4 md:px-6 lg:px-8 py-2.5 md:py-3 bg-[#ff7802] hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap text-xs md:text-sm">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter