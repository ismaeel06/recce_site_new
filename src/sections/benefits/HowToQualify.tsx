import QualifyCard from "@/components/benefits/QualifyCard";

export default function HowToQualify() {
  const qualifyItems = [
    {
      icon: "/assets/Star.png",
      title: "Be in the Top 1%",
      description:
        "Membership is automatically granted each quarter to the top 1% of users based on the quality and impact of their recommendations.",
    },
    {
      icon: "/assets/MessageBubble.png",
      title: "Quality over Quantity",
      description:
        "Our algorithm values insightful, well-written reviews that genuinely help others discover new content. A single great review is worth more than a dozen one-liners.",
    },
    {
      icon: "/assets/Graph.png",
      title: "Community Impact",
      description:
        "How many people watched a show because of your rec? How many found your review helpful? Your influence is a key metric for qualification.",
    },
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center pt-12">
            <div className="rounded-3xl overflow-hidden w-full max-w-sm lg:max-w-none">
              <img 
                src="/assets/BenefitsPrize.png" 
                alt="Trophy" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-8">
              How to <span className="text-[#ff7802]">Qualify</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl md:max-w-4xl mb-8 md:mb-12">
              Membership to The Auteur Club is exclusive and earned. There's no application—only recognition of your valuable contributions to the Recce community.
            </p>

            <QualifyCard items={qualifyItems} />

            <p className="text-xs md:text-sm text-white/60 mt-6 md:mt-8">
              Your status is reviewed every three months. Keep sharing your passion to secure or reclaim your spot in the club.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-6 md:gap-8">
        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
            How to <span className="text-[#ff7802]">Qualify</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
            Membership to The Auteur Club is exclusive and earned. There's no application—only recognition of your valuable contributions to the Recce community.
          </p>
        </div>

        {/* Image */}
        <div className="w-full rounded-3xl overflow-hidden">
          <img 
            src="/assets/BenefitsPrize.png" 
            alt="Trophy" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content Cards */}
        <QualifyCard items={qualifyItems} />

        {/* Footer Note */}
        <p className="text-xs sm:text-sm text-white/60 text-left">
          Your status is reviewed every three months. Keep sharing your passion to secure or reclaim your spot in the club.
        </p>
      </div>
    </div>
  );
}
