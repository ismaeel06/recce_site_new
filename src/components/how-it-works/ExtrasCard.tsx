import { ReactNode } from 'react';

interface ExtrasCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ExtrasCard({
  icon,
  title,
  description,
}: ExtrasCardProps) {
  return (
    <div className="flex flex-col items-start">
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-full bg-gray-750 flex items-center justify-center mb-6">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
