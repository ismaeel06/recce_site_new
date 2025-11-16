import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Benefits() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Benefits</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the ways Recce enhances your content discovery and social experience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              This page will detail all the benefits users get from using Recce, 
              including premium features, community perks, and exclusive content access.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}