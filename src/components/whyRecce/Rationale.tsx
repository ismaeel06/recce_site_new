import React from 'react'

function Rationale() {
    return (
        <div className='flex flex-col-reverse md:flex-row gap-16 p-8 bg-[#ffffff1a] rounded-[64px] mt-[100px] items-center mb-12'>
            <img src="/svg/SocialWeb.svg" alt="social web" className='-mt-16 md:mt-0' />
            <div>
                <p className='font-bold text-3xl md:text-[48px] mb-8'>Why it works?</p>
                <ul>
                    <li className='my-4'>
                        <p className='font-bold text-xl md:text-2xl'>Human-Powered Algorithm</p>
                        <p className='text-white/60 text-xs md:text-base'>
                            Your feed is curated by people you know, not bots. This means more relevance, context, and serendipitous discoveries.
                        </p>
                    </li>
                    <li className='my-4'>
                        <p className='font-bold text-xl md:text-2xl'>Context is King</p>
                        <p className='text-white/60 text-xs md:text-base'>
                            See why someone recommended a show. Was it the acting? The plot twist? Get the specific insights you need to make a great choice.
                        </p>
                    </li>
                    <li className='my-4'>
                        <p className='font-bold text-xl md:text-2xl'>Rewarding Quality</p>
                        <p className='text-white/60 text-xs md:text-base'>
                            Our system encourages thoughtful, detailed reviews, rewarding users who genuinely help others discover great content.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Rationale