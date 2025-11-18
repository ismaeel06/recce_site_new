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
    <div className="bg-[#404040] rounded-2xl p-6 border border-[#383838] hover:border-[#ff7802] transition-colors">
      <div className="flex flex-col gap-2">
        <div className="text-[#ff7802] text-3xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
