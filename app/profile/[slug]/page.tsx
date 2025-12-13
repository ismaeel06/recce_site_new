import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ProfileClient from '@/app/components/profile/ProfileClient';

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
