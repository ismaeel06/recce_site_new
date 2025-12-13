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
    <div className="bg-[#FFFFFF1A] rounded-2xl p-8 border border-[#383838] hover:scale-105 transition-all duration-300 cursor-pointer">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-neutral-400 mb-6">{description}</p>

      <ul className="space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <img src="/assets/icons/tick.svg" alt="" />
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
