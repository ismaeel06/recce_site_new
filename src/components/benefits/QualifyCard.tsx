interface QualifyCardProps {
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function QualifyCard({ items }: QualifyCardProps) {
  return (
    <div className="bg-[#2a2a2a] p-6 md:p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 py-4 last:pb-0">
          <img src={item.icon} alt={item.title} className="w-[27px] h-[32px] flex-shrink-0" />
          <div>
            <p className="font-semibold text-base md:text-lg text-white">{item.title}</p>
            <p className="text-sm md:text-base text-white/60 mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
