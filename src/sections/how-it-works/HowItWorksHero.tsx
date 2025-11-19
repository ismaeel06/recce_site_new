import HowItWorksStep from '@/components/how-it-works/HowItWorksStep';

export default function HowItWorksHero() {
  const steps = [
    {
      number: 1,
      title: 'Set Up Your Tastes',
      description:
        'Tell us your favorite genres, directors, and actors. This helps us calibrate your initial discovery feed.',
      image: '/assets/SetTastes.svg',
    },
    {
      number: 2,
      title: 'Follow & Discover',
      description:
        "Connect with friends or follow curated tastemakers. Your feed will instantly populate with trusted recommendations.",
      image: '/assets/FollowDiscover.svg',
    },
    {
      number: 3,
      title: 'Decide & Earn',
      description:
        'Find your next favorite show or movie in, and share your own review to help others and earn rewards.',
      image: '/assets/DecideEarn.svg',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Started in <span className="text-orange-500">3 Easy Steps</span>
          </h1>
          <p className="text-gray-300 text-lg">
            From setup to your first great recommendation in minutes.
          </p>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <HowItWorksStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
