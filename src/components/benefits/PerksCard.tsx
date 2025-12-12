import React from 'react'

function PerksCard({ title, imgUrl, description, number, isActive }: { title: string, imgUrl: string, description: string, number: string, isActive?: boolean }) {
    return (
        <div className='group bg-gradient-to-r from-[#ffffff1a] to-[#ffffff0a] rounded-[20px] p-8 flex flex-col md:flex-row md:min-h-[0px] md:mb-8 hover:scale-102 transition-all duration-300 cursor-pointer relative'>
            <div className="flex-1">
                <div className='flex gap-2'>
                    <img src={imgUrl} alt="" />
                    <p>{title}</p>
                </div>
                <p className='text-white/60 mt-6 lg:mt-2 md:w-[85%] text-xs md:text-base'>
                    {description}
                </p>
            </div>
            <div className={`text-[60px] font-bold transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 md:group-hover:text-white'} mt-6 md:mt-0 md:ml-4 flex-shrink-0`}>{parseInt(number) < 10 ? '0' + number : number}</div>
        </div>
    )
}

export default PerksCard