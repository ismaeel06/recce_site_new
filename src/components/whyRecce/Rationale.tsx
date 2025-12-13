'use client';
import { getWhyRecceRationale, getWhyRecceStandouts } from '@/lib/strapi';
import React, { useState, useEffect } from 'react'

function Rationale() {
    const [rationale, setRationale] = useState<any>();
    const [standouts, setStandouts] = useState<any[]>();
    useEffect(() => {
        const getData = async () => {
            const rationaleData = await getWhyRecceRationale();
            setRationale({
                title: rationaleData?.title,
                thumbnail: rationaleData?.thumbnail?.url
            })
            const standoutData = await getWhyRecceStandouts();
            setStandouts(standoutData?.map((d: any) => ({
                title: d.title,
                description: d.description
            })))
        }
        getData();
    }, [])
    return (
        <div className='flex flex-col-reverse lg:flex-row gap-8 md:gap-12 lg:gap-16 p-6 md:p-8 lg:p-12 bg-[#ffffff1a] rounded-[32px] md:rounded-[48px] lg:rounded-[64px] mt-12 md:mt-16 lg:mt-[100px] items-center mb-8 md:mb-12'>
            <div className='w-full lg:w-1/2 flex justify-center items-center'>
                <img src={rationale?.thumbnail} alt="social web" className='w-full' />
            </div>
            <div className='w-full lg:w-1/2'>
                <p className='font-bold text-2xl md:text-3xl lg:text-5xl mb-6 md:mb-8 text-white'>{rationale?.title}</p>
                <ul className='space-y-4 md:space-y-6'>
                    {standouts && standouts.map((s: any, index: number) => {
                        return <li key={index}>
                            <p className='font-bold text-lg md:text-xl lg:text-2xl text-white mb-2'>{s.title}</p>
                            <p className='text-white/60 text-sm md:text-base'>
                                {s.description}
                            </p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Rationale