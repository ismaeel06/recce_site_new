"use client";

function Card({ imgUrl, description, date, tag }: { imgUrl: string | null, description: string, date: string, tag: string }) {
    return (
        <div className="rounded-2xl bg-[#ffffff1a] h-full flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer">

            {/* Image area */}
            <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-t-2xl overflow-hidden relative flex-shrink-0">

                {/* Top-right Text */}
                <span className="absolute top-2 right-2 bg-[#ff7802] text-white text-xs sm:text-sm px-2 py-1 rounded-lg z-10">
                    {tag.toUpperCase()}
                </span>

                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#ffffff0a]" />
                )}
            </div>

            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed flex-grow">
                    {description}
                </p>
                <p className="text-white/60 text-xs sm:text-sm md:text-base mt-3 md:mt-4">{date}</p>
            </div>
        </div>
    );
}

export default Card;