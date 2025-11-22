import React from 'react'

function Rationale() {
    return (
        <div className='flex flex-col-reverse lg:flex-row gap-8 md:gap-12 lg:gap-16 p-6 md:p-8 lg:p-12 bg-[#ffffff1a] rounded-[32px] md:rounded-[48px] lg:rounded-[64px] mt-12 md:mt-16 lg:mt-[100px] items-center mb-8 md:mb-12'>
            <div className='w-full lg:w-1/2 flex justify-center items-center'>
                <img src="/assets/SocialWeb.png" alt="social web" className='w-full' />
            </div>
            <div className='w-full lg:w-1/2'>
                <p className='font-bold text-2xl md:text-3xl lg:text-5xl mb-6 md:mb-8 text-white'>Why it works?</p>
                <ul className='space-y-4 md:space-y-6'>
                    <li>
                        <p className='font-bold text-lg md:text-xl lg:text-2xl text-white mb-2'>Human-Powered Algorithm</p>
                        <p className='text-white/60 text-sm md:text-base'>
                            Your feed is curated by people you know, not bots. This means more relevance, context, and serendipitous discoveries.
                        </p>
                    </li>
                    <li>
                        <p className='font-bold text-lg md:text-xl lg:text-2xl text-white mb-2'>Context is King</p>
                        <p className='text-white/60 text-sm md:text-base'>
                            See why someone recommended a show. Was it the acting? The plot twist? Get the specific insights you need to make a great choice.
                        </p>
                    </li>
                    <li>
                        <p className='font-bold text-lg md:text-xl lg:text-2xl text-white mb-2'>Rewarding Quality</p>
                        <p className='text-white/60 text-sm md:text-base'>
                            Our system encourages thoughtful, detailed reviews, rewarding users who genuinely help others discover great content.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Rationale