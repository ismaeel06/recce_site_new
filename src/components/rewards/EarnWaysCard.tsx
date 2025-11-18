interface EarnWaysCardProps {
  title: string;
  description: string;
  points: string[];
}

export default function EarnWaysCard({
  title,
  description,
  points,
}: EarnWaysCardProps) {
  return (
    <div className="bg-[#404040] rounded-2xl p-8 border border-[#383838]">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-neutral-400 mb-6">{description}</p>

      <ul className="space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[#ff7802] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
