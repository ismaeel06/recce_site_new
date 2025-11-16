import Image from "next/image";

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  href?: string;
}

export default function BlogCard({ title, date, image, href = "#" }: BlogCardProps) {
  return (
    <a href={href} className="group block">
      <div className="bg-gray-800 rounded-2xl overflow-hidden">
        {/* Image Section - Top */}
        <div className="relative h-48 overflow-hidden bg-gray-700">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Text Section - Bottom */}
        <div className="p-6 bg-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
    </a>
  );
}