interface RewardActionCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function RewardActionCard({
  icon,
  title,
  description,
}: RewardActionCardProps) {
  return (
    <div className="bg-[#FFFFFF1A] rounded-2xl p-6 border border-[#383838] hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex flex-col gap-2">
        <img src={icon} alt={title} className="w-8 h-8" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
