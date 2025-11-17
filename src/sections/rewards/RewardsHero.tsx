'use client';

import Image from 'next/image';
import RewardActionCard from '../../components/rewards/RewardActionCard';

export default function RewardsHero() {
  const actionCards = [
    {
      icon: '✏️',
      title: 'Share a Review',
      description:
        'Post your first thoughtful review of a movie or TV show to kick things off. Quality matters!',
    },
    {
      icon: '👥',
      title: 'Invite a Friend',
      description:
        'Bring a friend to Recce using your unique invite link. You both get bonus points when they join.',
    },
    {
      icon: '🤝',
      title: 'Trust a Recce',
      description:
        'Watch something based on a friend\'s recommendation and mark it as "Watched" in the app',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-white mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Get Rewarded for Your <span className="text-orange-500">Great Taste</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mx-auto max-w-3xl">
            Your opinions have value. At Recce, we make sure you're recognized for contributing to the community and helping others discover content they'll love.
          </p>
        </div>

        {/* Left and Right Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Gift Image */}
          <div>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden">
              <Image
                src="/assets/gift.webp"
                alt="Get Rewarded"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Action Cards */}
          <div className="text-white">
            {/* Action Cards */}
            <div className="space-y-4">
              {actionCards.map((card, index) => (
                <RewardActionCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
