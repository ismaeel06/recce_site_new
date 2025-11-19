import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/whyRecce/Card";
import Rationale from "@/components/whyRecce/Rationale";

export default function WhyRecce() {
  const cards = [
    {
      title: 'The Problem',
      description: 'Endless scrolling through platforms, generic recommendations, and wasted time on disappointing content. Decision fatigue kills the joy of movie night.',
      imgUrl: '/svg/ShowSelection.svg'
    },
    {
      title: 'The Solution',
      description: 'Recce connects you with friends and tastemakers you actually trust. Get honest, personalized recommendations from your inner circle.',
      imgUrl: '/svg/TheGodFather.svg'
    },
    {
      title: 'The Outcome',
      description: 'Confidently pick your next watch in minutes. Discover hidden gems and enjoy movie nights that actually deliver, every single time.',
      imgUrl: '/svg/Clock.svg'
    }
  ]
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 md:w-[800px] text-center">Do you struggle to find something to <span className="text-[#ff7802]">watch?</span></h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-2xl mx-auto text-center">
              You're not alone. The endless scroll is real, but finding your next favorite show shouldn't feel like a chore.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center items-stretch">
            {cards.map((card: any, index: number) => {
              return <Card key={index} title={card.title} description={card.description} imgUrl={card.imgUrl} />
            })}
          </div>
          <Rationale />
        </div>
      </main>

      <Footer />
    </div>
  );
}