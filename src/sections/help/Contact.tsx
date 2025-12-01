'use client';
import React, { useEffect, useState } from 'react'
import { getContactPoints } from '@/lib/strapi';

function Contact() {
    const [contactPoints, setContactPoints] = useState<any[]>([]);
    useEffect(() => {
        const getData = async () => {
            const contactData = await getContactPoints();
            setContactPoints(contactData);
        };
        getData();
    }, [])
    return (
        <div>
            <p className='text-2xl md:text-4xl font-bold mb-4 mx-[5%]'>Contact Us</p>
            {
                contactPoints.map((cp: any, index: number) => {
                    return <div key={index} className="rounded-2xl bg-[#ffffff1a] w-[90%] xl:w-full p-4 md:py-6 md:pl-6 md:pr-10 my-4 mx-auto">
                        <p className='text-base md:text-xl'>{cp.title}</p>
                        <p className='text-sx md:text-base text-white/60'>{cp.description}</p>
                        <p className='text-sx md:text-base text-[#ff7802] mt-1 md:mt-4'>{cp.contactEmail}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Contact