import React from 'react'
// import ShowSelection from "@/public/svg/ShowSelection";

function Card({ title, description, imgUrl }: { title: string, description: string, imgUrl: string }) {
	return (
		<div className="p-4 rounded-[20px] bg-gradient-to-r from-[#ffffff1a] to-[#282828] flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer h-full">
			<div className="w-full h-[200px] sm:h-[220px] md:h-[240px] rounded-[14px] overflow-hidden">
				<img
					src={imgUrl}
					className="w-full h-full object-cover"
					alt="icon"
				/>
			</div>
			<p className="mt-4 mb-2 text-lg sm:text-xl md:text-2xl font-semibold text-white">{title}</p>
			<p className="text-white/60 text-sm sm:text-base flex-grow">{description}</p>
		</div>
	)
}

export default Card