import React from 'react'

function Rationale() {
    return (
        <div className='flex gap-16 p-8 bg-[#ffffff1a] rounded-[64px] mt-[100px] items-center mb-12'>
            <img src="/svg/SocialWeb.svg" alt="social web" />
            <div>
                <p className='font-bold text-[48px] mb-8'>Why it works?</p>
                <ul>
                    <li className='my-4'>
                        <p className='font-bold text-2xl'>Human-Powered Algorithm</p>
                        <p className='text-white/60'>
                            Your feed is curated by people you know, not bots. This means more relevance, context, and serendipitous discoveries.
                        </p>
                    </li>
                    <li className='my-4'>
                        <p className='font-bold text-2xl'>Context is King</p>
                        <p className='text-white/60'>
                            See why someone recommended a show. Was it the acting? The plot twist? Get the specific insights you need to make a great choice.
                        </p>
                    </li>
                    <li className='my-4'>
                        <p className='font-bold text-2xl'>Rewarding Quality</p>
                        <p className='text-white/60'>
                            Our system encourages thoughtful, detailed reviews, rewarding users who genuinely help others discover great content.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Rationale