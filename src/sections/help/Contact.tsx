import React from 'react'

function Contact() {
    return (
        <div>
            <p className='text-2xl md:text-4xl font-bold mb-4 mx-[5%]'>Contact Us</p>
            <div className="rounded-2xl bg-[#ffffff1a] w-[90%] xl:w-full p-4 md:py-6 md:pl-6 md:pr-10 my-4 mx-auto">
                <p className='text-base md:text-xl'>Support</p>
                <p className='text-sx md:text-base text-white/60'>For technical issues or help with your account.</p>
                <p className='text-sx md:text-base text-[#ff7802] mt-1 md:mt-4'>support@recce.site</p>
            </div>
            <div className="rounded-2xl bg-[#ffffff1a] w-[90%] xl:w-full p-4 md:py-6 md:pl-6 md:pr-10 my-4 mx-auto">
                <p className='text-base md:text-xl'>Press</p>
                <p className='text-sx md:text-base text-white/60'>For media inquiries and press materials.</p>
                <p className='text-sx md:text-base text-[#ff7802] mt-1 md:mt-4 '>support@recce.site</p>
            </div>
            <div className="rounded-2xl bg-[#ffffff1a] w-[90%] xl:w-full p-4 md:py-6 md:pl-6 md:pr-10 my-4 mx-auto">
                <p className='text-base md:text-xl'>Partnerships</p>
                <p className='text-sx md:text-base text-white/60'>For collaboration proposals.</p>
                <p className='text-sx md:text-base text-[#ff7802] mt-1 md:mt-4'>support@recce.site</p>
            </div>
        </div>
    )
}

export default Contact