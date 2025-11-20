import React from 'react'

function Card({ imgUrl, description }: { imgUrl: string, description: string }) {
    return (
        <div className='bg-[#ffffff1a] border-white/60 w-[300px] sm:w-[416px] rounded-[20px] p-4'>
            <img src={imgUrl} alt="" className='mb-4' />
            <p className='text-white'>
                {description}
            </p>
        </div>
    )
}

export default Card