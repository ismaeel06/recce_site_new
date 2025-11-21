import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PerksCard from "@/components/benefits/PerksCard";

export default function Partners() {
  const perks = [
    {
      imgUrl: "/assets/Perk1.png",
      title: "Early Screenings",
      number: "01",
      description: "Get exclusive invitations to pre-release digital and in-person screenings of upcoming movies and shows from our partner studios."
    },
    {
      imgUrl: "/assets/Perk2.png",
      title: "Exclusive Quizzes",
      number: "02",
      description: "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights."
    },
    {
      imgUrl: "/assets/Perk3.png",
      title: "Product Lab Access",
      number: "03",
      description: "Test your cinematic knowledge with members-only quizzes. Compete on the Auteur leaderboard for unique prizes and bragging rights."
    },
    {
      imgUrl: "/assets/Perk4.png",
      title: "Creator Q&As",
      number: "04",
      description: "Join live, intimate Q&A sessions with directors, writers, and actors. Ask the questions you've always wanted to ask."
    },
    {
      imgUrl: "/assets/Perk5.png",
      title: "Prestige Profile Badge",
      number: "05",
      description: "Your profile will be adorned with the exclusive Auteur Club badge, signaling your status as a top contributor in the community."
    },
    {
      imgUrl: "/assets/Perk6.png",
      title: "Priority Support",
      number: "06",
      description: "Get white-glove service from our dedicated community team. Your questions and feedback move to the front of the line, always."
    }
  ]
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col py-32 items-center min-h-screen">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 text-center font-bold">
              The Auteur Club <span className="text-[#ff7802]">Top 1%</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              An exclusive circle for our Top 1% of contributors. This is where your passion for film and TV gets the VIP treatment you deserve.
            </p>
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col py-32 items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 text-center font-bold">
              Exclusive Member <span className="text-[#ff7802]">Perks</span>
            </h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              As a member of The Auteur Club, you unlock a suite of benefits designed to enhance your entertainment experience.
            </p>
          </div>
        </div>
        <div className="flex w-[90%] mx-auto gap-8">
          <div className="w-[50%]">
            <img src="/assets/TvLounge.png" alt="" />
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            {perks.map((perk: any, index: number) => <PerksCard key={index} number={perk.number} title={perk.title} description={perk.description} imgUrl={perk.imgUrl} />)}
            <h1 className="text-[26px] md:text-[60px] font-medium mt-32">
              How to <span className="text-[#ff7802]">Qualify</span>
            </h1>
            <p className="text-base md:text-xl text-white/60">
              Membership to The Auteur Club is exclusive and earned. There's no application—only recognition of your valuable contributions to the Recce community.
            </p>
            <div className="flex-col gap-4 bg-[#ffffff1a] p-8 rounded-[20px]">
              <div className="flex gap-4 my-4">
                <img src="/assets/Star.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Be in the Top 1%</p>
                  <p className="text-base text-white/60">
                    Membership is automatically granted each quarter to the top 1% of users based on the quality and impact of their recommendations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <img src="/assets/MessageBubble.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Quality over Quantity</p>
                  <p className="text-base text-white/60">
                    Our algorithm values insightful, well-written reviews that genuinely help others discover new content. A single great review is worth more than a dozen one-liners.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <img src="/assets/Graph.png" alt="" className="w-[27px] h-[32px]" />
                <div>
                  <p className="font-semibold font-lg">Community Impact</p>
                  <p className="text-base text-white/60">
                    How many people watched a show because of your rec? How many found your review helpful? Your influence is a key metric for qualification.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs md:text-base text-white/60 mt-4 mb-16">
              Your status is reviewed every three months. Keep sharing your passion to secure or reclaim your spot in the club.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}