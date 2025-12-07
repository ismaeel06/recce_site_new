import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileClient from '@/components/profile/ProfileClient';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const referralCode = typeof search.referralCode === 'string' ? search.referralCode : null;

  return (
    <>
      <Header />
      <ProfileClient profileId={slug} referralCode={referralCode} />
      <Footer />
    </>
  );
}
