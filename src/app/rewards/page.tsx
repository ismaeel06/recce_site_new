import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RewardsHero from "@/sections/rewards/RewardsHero";
import EarnWays from "@/sections/rewards/EarnWays";
import RedeemRewards from "@/sections/rewards/RedeemRewards";
import RewardFAQs from "@/sections/rewards/RewardFAQs";

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