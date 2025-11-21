"use client";

function Card({ imgUrl, description, date, tag }: { imgUrl: string | null, description: string, date: string, tag: string }) {
    return (
        <div className="rounded-[20px] bg-[#ffffff1a] w-[90%] sm:w-[416px]">

            {/* Image area */}
            <div className="w-full h-[200px] rounded-t-[20px] overflow-hidden relative">

                {/* Top-right Text */}
                <span className="absolute top-2 right-2 bg-[#ff7802] text-white text-base px-2 py-1 rounded-md">
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

            <div className="p-6 pt-2">
                <p className="text-base md:text-xl">
                    {description}
                </p>
                <p className="text-white/60 text-xs md:text-base">{date}</p>
            </div>
        </div>
    );
}

export default Card;