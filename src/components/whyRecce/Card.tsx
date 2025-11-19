import React from 'react'
// import ShowSelection from "@/public/svg/ShowSelection";

function Card({ title, description, imgUrl }: { title: string, description: string, imgUrl: string }) {
	return (
		<div className="p-4 rounded-[20px] bg-gradient-to-r from-[#ffffff1a] to-[#282828] flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer">
			<div className="w-[100%] md:w-[392px] h-[231px] rounded-[14px] overflow-hidden">
				<img
					src={imgUrl}
					className="w-full h-full object-cover"
					alt="icon"
				/>
			</div>
			<p className="mt-4 mb-2 text-2xl">{title}</p>
			<p className="text-white/60">{description}</p>
		</div>
	)
}

export default Card