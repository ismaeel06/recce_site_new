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
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-orange-500 transition-colors">
      <div className="flex flex-col gap-2">
        <div className="text-orange-500 text-3xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
