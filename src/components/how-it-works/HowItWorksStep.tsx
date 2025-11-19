import Image from 'next/image';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

export default function HowItWorksStep({
  number,
  title,
  description,
  image,
}: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
      {/* Image Container - Relative for absolute positioning of circle */}
      <div className="relative w-full mb-12">
        <div className="relative w-full h-90 rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Step Number Circle - Overlapping */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-24 h-24 rounded-full bg-[#ff7802] border-10 border-gray-900 flex items-center justify-center text-white text-3xl font-semibold">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
