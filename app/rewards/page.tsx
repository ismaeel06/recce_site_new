import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import RewardsHero from "@/app/sections/rewards/RewardsHero";
import EarnWays from "@/app/sections/rewards/EarnWays";
import RedeemRewards from "@/app/sections/rewards/RedeemRewards";
import RewardFAQs from "@/app/sections/rewards/RewardFAQs";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-[#191919]">
      <Header />

      <main>
        <RewardsHero />
        <EarnWays />
        <RedeemRewards />
        <RewardFAQs />
      </main>

      <Footer />
    </div>
  );
}