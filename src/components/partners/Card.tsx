import React from 'react'

function Card({ imgUrl, description }: { imgUrl: string, description: string }) {
    return (
        <div className='bg-[#ffffff1a] rounded-[20px] p-4 hover:scale-105 transition-all duration-300 cursor-pointer'>
            <img src={imgUrl} alt="" className='mb-4' />
            <p className='text-white'>
                {description}
            </p>
        </div>
    )
}

export default Card