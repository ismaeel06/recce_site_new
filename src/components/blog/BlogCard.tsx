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
      <div className="rounded-2xl overflow-hidden">
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
        <div className="p-6 bg-[#FFFFFF1A]">
          <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-[#ff7802] transition-colors">
            {title}
          </h3>
          <p className="text-[#848686] text-sm">{date}</p>
        </div>
      </div>
    </a>
  );
}