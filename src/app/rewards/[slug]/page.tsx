import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RewardsClient from '@/components/rewards/RewardsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RewardsPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const referralCode = typeof search.referralCode === 'string' ? search.referralCode : null;

  return (
    <>
      <Header />
      <RewardsClient rewardCode={slug} referralCode={referralCode} />
      <Footer />
    </>
  );
}
