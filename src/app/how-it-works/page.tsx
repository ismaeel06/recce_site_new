import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how Recce makes content discovery simple, social, and rewarding.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              This page will explain the step-by-step process of using Recce, 
              from signing up to discovering your next favorite show or movie.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}