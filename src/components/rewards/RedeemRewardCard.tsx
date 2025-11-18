import Image from 'next/image';

interface RedeemRewardCardProps {
  image: string;
  title: string;
  description: string;
}

export default function RedeemRewardCard({
  image,
  title,
  description,
}: RedeemRewardCardProps) {
  return (
    <div className="bg-[#484848] rounded-2xl overflow-hidden border border-[#383838] hover:border-orange-500 transition-colors group">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-700 group-hover:bg-gray-600 transition-colors">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
