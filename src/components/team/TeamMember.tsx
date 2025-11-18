import React from 'react'

function TeamMember({ you = false, name, title, description }: { you?: boolean, name: string, title: string, description: string }) {
    return (
        <div className='flex flex-col items-center mt-8 mb-16'>
            <div className={`rounded-[66px] md:rounded-[88px] border-3 border-[#ffffff1a] h-[132px] w-[132px] md:h-[176px] md:w-[176px] ${you ? "bg-[#404040] flex text-2xl text-[#ff7802] text-center justify-center items-center" : ""}`}>
                {you ? "You?" : ""}
            </div>
            <p className='font-bold font-2xl mt-4 mb-1'>{name}</p>
            <p className='my-1 text-[#ff7802]'>{title}</p>
            <p className='text-white/60 max-w-[250px] text-center'>
                {description}
            </p>
        </div>
    )
}

export default TeamMember