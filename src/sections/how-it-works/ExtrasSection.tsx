import ExtrasCard from '@/components/how-it-works/ExtrasCard';

export default function ExtrasSection() {
  const extras = [
    {
      icon: <img src="/assets/icons/star.svg" alt="Star Icon" className="w-full h-full" />,
      title: 'Creator Recommendations',
      description:
        'Go beyond your network and explore picks from critics, filmmakers, and top Recce community members.',
    },
    {
      icon: <img src="/assets/icons/list.svg" alt="List Icon" className="w-full h-full" />,
      title: 'Power-Up Your Lists',
      description:
        'Create and share custom watchlists for any mood—"Friday Night Thrillers," "Oscar Winners," or "Comfort Comedies."',
    },
    {
      icon: <img src="/assets/icons/filter.svg" alt="Filter Icon" className="w-full h-full" />,
      title: 'Advanced Filters',
      description:
        'Drill down with powerful filters. Search by streaming service, runtime, audience score, and even "recommended by" specific friends.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF1A] rounded-4xl px-8 md:px-16 py-8 md:py-10 border border-gray-700">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              And a Few <span className="text-orange-500">Optional Extras...</span>
            </h2>
          </div>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {extras.map((extra, index) => (
              <ExtrasCard
                key={index}
                icon={extra.icon}
                title={extra.title}
                description={extra.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
