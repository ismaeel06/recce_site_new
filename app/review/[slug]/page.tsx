import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ReviewClient from '@/app/components/review/ReviewClient';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReviewPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const referralCode = typeof search.referralCode === 'string' ? search.referralCode : null;

  return (
    <>
      <Header />
      <ReviewClient reviewId={slug} referralCode={referralCode} />
      <Footer />
    </>
  );
}
