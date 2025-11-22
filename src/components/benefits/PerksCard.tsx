import React from 'react'

function PerksCard({ title, imgUrl, description, number }: { title: string, imgUrl: string, description: string, number: string }) {
    return (
        <div className='bg-gradient-to-r from-[#ffffff1a] to-[#ffffff0a] rounded-[20px] p-8 flex flex-col md:flex-row md:min-h-[0px] md:mb-8 hover:scale-105 transition-all duration-300 cursor-pointer'>
            <div>
                <div className='flex gap-2'>
                    <img src={imgUrl} alt="" />
                    <p>{title}</p>
                </div>
                <p className='text-white/60 mt-6 lg:mt-2 md:w-[85%] text-xs md:text-base'>
                    {description}
                </p>
            </div>
            <div className={`text-[60px] font-bold ${number === '01' ? 'text-white' : 'text-white/60'} mt-6 lg:mt-2`}>{number}</div>
        </div>
    )
}

export default PerksCard