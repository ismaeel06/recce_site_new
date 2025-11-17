import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RewardsHero from "@/components/pages/rewards/RewardsHero";
import EarnWays from "@/components/pages/rewards/EarnWays";
import RedeemRewards from "@/components/pages/rewards/RedeemRewards";
import RewardFAQs from "@/components/pages/rewards/RewardFAQs";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gray-900">
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