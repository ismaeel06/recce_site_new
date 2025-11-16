import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";

export default function Gossip() {
  // Placeholder blog data
  const samplePosts = [
    {
      title: "In a world overflowing with choices and where Content Overload is a problem...",
      excerpt: "Explore how Recce addresses the overwhelming amount of content available and helps users make informed decisions.",
      slug: "content-overload-problem",
      date: "Sunday, 1 Jan 2023",
      image: "/placeholder-blog-1.jpg"
    },
    {
      title: "With around 100 Alpha testers on Recce, we're already changing what people...",
      excerpt: "Discover how our early users are transforming their content discovery experience with Recce.",
      slug: "alpha-testers-changing-discovery",
      date: "Sunday, 1 Jan 2023",
      image: "/placeholder-blog-2.jpg"
    },
    {
      title: "Thrilled to introduce Recce's new Marketing team",
      excerpt: "Meet the talented individuals behind Recce's marketing efforts and content strategy.",
      slug: "new-marketing-team",
      date: "Sunday, 1 Jan 2023",
      image: "/placeholder-blog-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Recent Blog Posts</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, insights, and updates from the Recce community.
            </p>
            <div className="flex justify-end mt-6">
              <button className="text-gray-600 hover:text-gray-800 font-medium">
                View All
              </button>
            </div>
          </div>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePosts.map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                image={post.image}
              />
            ))}
          </div> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}