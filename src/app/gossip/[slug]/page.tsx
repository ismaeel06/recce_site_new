'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsLetter from '@/sections/home/NewsLetter';
import MoreToExplore from '@/sections/gossip/MoreToExplore';
import { getBlogBySlug, getRelatedBlogs, formatBlogDate, getGlobalSocialLinks, getStrapiImageUrl } from '@/lib/strapi';
import { richTextToHtml } from '@/lib/richTextToHtml';
import { Blog, RelatedBlog, GlobalSocialLinks } from '@/types/strapi';

// Helper function to ensure URL has protocol
const ensureProtocol = (url: string | undefined): string => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

export default function BlogReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [socialLinks, setSocialLinks] = useState<GlobalSocialLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        // Fetch blog by slug
        const blogData = await getBlogBySlug(slug);
        if (!blogData) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        setBlog(blogData);

        // Fetch related blogs (same tag, different blog)
        const related = await getRelatedBlogs(blogData.documentId, blogData.tag, 3);
        setRelatedBlogs(related);

        // Fetch global social links
        const globalSocial = await getGlobalSocialLinks();
        setSocialLinks(globalSocial);

        setLoading(false);
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog post');
        setLoading(false);
      }
    }

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen font-sans flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-96 bg-gray-800 animate-pulse rounded-lg"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen font-sans flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-500">
              <h2 className="text-2xl font-bold mb-2">
                {error || 'Blog post not found'}
              </h2>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header />

      <main className="flex-grow py-4">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/gossip"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gossip
          </Link>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
            {blog.title}
          </h1>

          {/* Social Share Buttons */}
          {socialLinks && (
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              {socialLinks.facebook && (
                <a
                  href={ensureProtocol(socialLinks.facebook)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF1A] hover:bg-[#ff7802] rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <img src="/assets/icons/Facebook.svg" alt="" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={ensureProtocol(socialLinks.instagram)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF1A] hover:bg-[#ff7802] rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Instagram"
                >
                  <img src="/assets/icons/Instagram.svg" alt="" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={ensureProtocol(socialLinks.linkedin)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF1A] hover:bg-[#ff7802] rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={ensureProtocol(socialLinks.twitter)}
                  className="w-10 h-10 flex items-center justify-center bg-[#FFFFFF1A] hover:bg-[#ff7802] rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* Date */}
          <div className="mb-8 md:mb-12">
            <span className="text-gray-400 text-sm md:text-base">{formatBlogDate(blog.publishedAt)}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 lg:mb-16">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            {blog.featuredImage && (
              <img
                src={getStrapiImageUrl(blog.featuredImage) || '/assets/Blog6.png'}
                alt="Featured image"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Part of Content */}
          <div className="prose prose-invert max-w-none mb-8 md:mb-12">
            <div
              className="text-base md:text-lg text-gray-300 leading-relaxed space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-3 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:text-gray-300 [&_p]:text-gray-300 [&_strong]:text-white [&_em]:italic [&_a]:text-[#ff7802] [&_a:hover]:underline"
              dangerouslySetInnerHTML={{ __html: typeof blog.content === 'string' ? blog.content : richTextToHtml(blog.content) }}
            />
          </div>

          {/* Optional Image */}
          {blog.optionalImage && (
            <div className="relative w-full h-80 md:h-96 lg:h-[450px] mb-8 md:mb-12 lg:mb-16 rounded-lg overflow-hidden">
              {getStrapiImageUrl(blog.optionalImage) && (
                <img
                  src={getStrapiImageUrl(blog.optionalImage) || ''}
                  alt="Article image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Content Continued - Optional */}
          {blog.contentContinued && (
            <div className="prose prose-invert max-w-none mb-12 md:mb-16">
              <div
                className="text-base md:text-lg text-gray-300 leading-relaxed space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-3 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:text-gray-300 [&_p]:text-gray-300 [&_strong]:text-white [&_em]:italic [&_a]:text-[#ff7802] [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: typeof blog.contentContinued === 'string' ? blog.contentContinued : richTextToHtml(blog.contentContinued) }}
              />
            </div>
          )}

          {/* Author Section - Optional */}
          {blog.author && (
            <div className="border-t border-gray-700 pt-8 md:pt-12 mb-12 md:mb-16">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white font-semibold text-lg md:text-xl">
                    {blog.author}
                  </p>
                  <p className="text-gray-400 text-sm">Author</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* More To Explore Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 md:mt-20 lg:mt-24 mb-16 md:mb-20 lg:mb-24">
            <MoreToExplore blogs={relatedBlogs} />
          </div>
        )}

        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20 lg:mt-24">
          <NewsLetter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
