import EarnWaysCard from '../../rewards/EarnWaysCard';

export default function EarnWays() {
  const personalRewards = [
    'Writing detailed reviews',
    'Rating movies and shows',
    'Creating and sharing watchlists',
    'Daily check-ins',
  ];

  const communityRewards = [
    'Your review gets upvoted',
    'A friend watches your recommendation',
    'Climb the leaderboard for monthly prizes',
    'Unlock special badges for your profile',
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Two Ways to <span className="text-orange-500">Earn</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
            Earn points for your individual contributions and get bonuses when your recommendations make an impact.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EarnWaysCard
            title="Personal Rewards"
            description="Earn points for every quality action you take. The more you contribute, the more you earn. It's that simple."
            points={personalRewards}
          />
          <EarnWaysCard
            title="Community Rewards"
            description="When your recommendations help others, you earn even more. Get bonus points when friends watch and love your suggestions."
            points={communityRewards}
          />
        </div>
      </div>
    </section>
  );
}
