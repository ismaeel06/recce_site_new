import React from 'react'

function TeamMember({ name, title, description }: { name: string, title: string, description: string }) {
    return (
        <div className='flex flex-col items-center mt-8 mb-16'>
            <div className={`rounded-[66px] md:rounded-[88px] border-3 border-[#ffffff1a] h-[132px] w-[132px] md:h-[176px] md:w-[176px] ${name === 'Join Our Team' ? "bg-[#404040] cursor-pointer flex text-2xl text-[#ff7802] text-center justify-center items-center" : ""}`}>
                {name === 'Join Our Team' ? "You?" : ""}
            </div>
            <p className={`font-bold font-2xl mt-4 mb-1 ${name === 'Join Our Team' ? 'cursor-pointer' : ''}`}>{name}</p>
            <p className='my-1 text-[#ff7802]'>{title}</p>
            <p className='text-white/60 max-w-[250px] text-center'>
                {description}
            </p>
        </div>
    )
}

export default TeamMember