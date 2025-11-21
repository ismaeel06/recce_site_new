import React from 'react'

function NewsLetter() {
    return (
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
                    <button className="px-1 cursor-pointer md:px-8 py-2 md:py-3 bg-[#ff7802] border border-[#ff7802] hover:bg-orange-600 text-white font-semibold transition-colors whitespace-nowrap text-sm md:text-base">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter