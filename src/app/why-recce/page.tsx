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

      <main className="py-12 md:py-16 lg:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 lg:mb-20 flex flex-col justify-center items-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 text-center leading-snug">
              Do you struggle to find something to <span className="text-[#ff7802]">watch?</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-center">
              You're not alone. The endless scroll is real, but finding your next favorite show shouldn't feel like a chore.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-center items-stretch mb-12 md:mb-16 lg:mb-20">
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