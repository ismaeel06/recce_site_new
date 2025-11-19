interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export default function FeatureCard({ icon, title, description, image }: FeatureCardProps) {
  return (
    <div className="relative h-80 bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer">
      {/* Background Image */}
      {image ? (
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
      
      {/* Content - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Icon */}
        <div className="text-3xl mb-3">
          <img src={icon} alt={`Icon for ${title}`} />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-200 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}