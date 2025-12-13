'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Linkedin } from 'lucide-react';
import { getDownloadLinks, getGlobalSocialLinks } from "@/app/lib/strapi";

// Helper function to ensure URL has protocol
const ensureProtocol = (url: string | undefined): string => {
  if (!url) return "#";
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

export default function Footer() {
  const [downloadLinks, setDownloadLinks] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [downloadData, socialData] = await Promise.all([
          getDownloadLinks(),
          getGlobalSocialLinks(),
        ]);

        console.log("Data for download links: ", downloadData);
        console.log("Data for social links: ", socialData);

        setDownloadLinks({
          playstoreLink: downloadData?.playstoreLink,
          appstoreLink: downloadData?.appstoreLink
        });

        setSocialLinks({
          facebook: ensureProtocol(socialData?.facebook),
          instagram: ensureProtocol(socialData?.instagram),
          linkedin: ensureProtocol(socialData?.linkedin),
          twitter: ensureProtocol(socialData?.twitter),
          tiktok: ensureProtocol(socialData?.tiktok)
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setDownloadLinks({
          playstoreLink: "",
          appstoreLink: ""
        });
        setSocialLinks({
          facebook: "#",
          instagram: "#",
          linkedin: "#",
          twitter: "#",
          tiktok: "#"
        });
      }
    }

    fetchData();
  }, []);

  const redirectToPlaystore = () => {
    window.open(downloadLinks?.playstoreLink, "_blank");
  }

  const redirectToAppstore = () => {
    window.open(downloadLinks?.appstoreLink, "_blank");
  }

  return (
    <footer className="w-full">
      <div className="w-full">
        <div className="bg-[#FFFFFF1A] text-white rounded-t-[28px] lg:rounded-t-[48px] border-t-[1.5px] overflow-hidden shadow-inner">
          <div className="py-10">
            {/* Desktop Layout - visible on lg and above */}
            <div className="hidden lg:block">
              <div className="flex items-start justify-between px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-24">
                {/* Left: Brand */}
                <div>
                  <Link href="/" className="inline-block">
                    <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Rockwell, serif' }}>Recce</h2>
                  </Link>
                  <p className="mt-1 text-[#848686]">Cures Content Overload</p>

                  <div className="mt-6 flex items-center gap-3">
                    <a href={socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img src="/assets/icons/Facebook.svg" alt="Facebook" className="w-9 h-9 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90 hover:scale-110 transition-all duration-300 cursor-pointer" />
                    </a>
                    <a href={socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img src="/assets/icons/Instagram.svg" alt="Instagram" className="w-9 h-9 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90 hover:scale-110 transition-all duration-300 cursor-pointer" />
                    </a>
                    <a href={socialLinks?.tiktok} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img src="/assets/icons/Tiktok.svg" alt="TikTok" className="w-9 h-9 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90 hover:scale-110 transition-all duration-300 cursor-pointer" />
                    </a>
                    {socialLinks?.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block">
                        <div className="w-9 h-9 rounded-full bg-[#FFFFFF1A] flex items-center justify-center text-sm text-white/90 hover:scale-110 transition-all duration-300 cursor-pointer">
                          <Linkedin className="w-5 h-5" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Middle: Navigation columns */}
                <div className="flex justify-center flex-1">
                  <div className="grid grid-cols-2 gap-12 lg:gap-16 2xl:gap-38">
                    <div>
                      <ul className="space-y-3 text-gray-300 text-sm">
                        <li><Link href="/why-recce" className="hover:text-white">Why Recce?</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-white">How it Works</Link></li>
                        <li><Link href="/rewards" className="hover:text-white">Rewards</Link></li>
                        <li><Link href="/gossip" className="hover:text-white">Gossip</Link></li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-3 text-gray-300 text-sm">
                        <li><Link href="/help" className="hover:text-white">Help</Link></li>
                        <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
                        <li><Link href="/team" className="hover:text-white">Team</Link></li>
                        <li><Link href="/benefits" className="hover:text-white">Benefits</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: Download buttons */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-white/90 mb-4">Download app</h3>
                  <div className="flex flex-col gap-3 w-48">
                    <button
                      className="flex items-center gap-3 bg-[#FFFFFF1A] hover:bg-[#484848] px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      onClick={redirectToPlaystore}
                    >
                      <img src="/assets/icons/Google_Play.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                      <div className="text-left text-sm">
                        <div className="text-xs text-gray-300">GET IT ON</div>
                        <div className="font-medium text-white">Google Play</div>
                      </div>
                    </button>

                    <button
                      className="flex items-center gap-3 bg-[#FFFFFF1A] hover:bg-[#484848] px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      onClick={redirectToAppstore}
                    >
                      <img src="/assets/icons/Apple.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                      <div className="text-left text-sm">
                        <div className="text-xs text-gray-300">Download on the</div>
                        <div className="font-medium text-white">App Store</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet/iPad Layout - visible on md to lg */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
              {/* Left: Brand with socials */}
              <div>
                <Link href="/" className="inline-block">
                  <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Rockwell, serif' }}>Recce</h2>
                </Link>
                <p className="mt-1 text-[#848686] text-sm">Cures Content Overload</p>

                <div className="mt-6 flex items-center gap-3">
                  <a href={socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Facebook.svg" alt="Facebook" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  <a href={socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Instagram.svg" alt="Instagram" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  <a href={socialLinks?.tiktok} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Tiktok.svg" alt="TikTok" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  {socialLinks?.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <div className="w-8 h-8 rounded-full bg-[#FFFFFF1A] flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                        <Linkedin className="w-5 h-5 text-white/90" />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Navigation and Download */}
              <div className="flex flex-col gap-6">
                {/* Navigation */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li><Link href="/why-recce" className="hover:text-white">Why Recce?</Link></li>
                      <li><Link href="/how-it-works" className="hover:text-white">How it Works</Link></li>
                      <li><Link href="/rewards" className="hover:text-white">Rewards</Link></li>
                      <li><Link href="/gossip" className="hover:text-white">Gossip</Link></li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li><Link href="/help" className="hover:text-white">Help</Link></li>
                      <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
                      <li><Link href="/team" className="hover:text-white">Team</Link></li>
                      <li><Link href="/benefits" className="hover:text-white">Benefits</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Download buttons */}
                <div>
                  <h3 className="text-sm font-semibold text-white/90 mb-3">Download app</h3>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#484848] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      onClick={redirectToPlaystore}
                    >
                      <img src="/assets/icons/Google_Play.svg" alt="" className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left text-xs">
                        <div className="text-gray-300 text-xs">GET IT ON</div>
                        <div className="font-medium text-white text-xs whitespace-nowrap">Google Play</div>
                      </div>
                    </button>

                    <button
                      className="flex-1 flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#484848] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      onClick={redirectToAppstore}
                    >
                      <img src="/assets/icons/Apple.svg" alt="" className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left text-xs">
                        <div className="text-gray-300 text-xs whitespace-nowrap">Download on the</div>
                        <div className="font-medium text-white text-xs">App Store</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - visible on below md */}
            <div className="md:hidden flex flex-col gap-8 px-4 sm:px-6">
              {/* Top: Brand with socials on right */}
              <div className="flex items-start justify-between">
                <div>
                  <Link href="/" className="inline-block">
                    <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Rockwell, serif' }}>Recce</h2>
                  </Link>
                  <p className="mt-1 text-[#848686] text-sm">Cures Content Overload</p>
                </div>

                <div className="flex items-center gap-2 self-end">
                  <a href={socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Facebook.svg" alt="Facebook" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  <a href={socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Instagram.svg" alt="Instagram" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  <a href={socialLinks?.tiktok} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img src="/assets/icons/Tiktok.svg" alt="TikTok" className="w-8 h-8 hover:scale-110 transition-all duration-300 cursor-pointer" />
                  </a>
                  {socialLinks?.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <div className="w-8 h-8 rounded-full bg-[#FFFFFF1A] flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                        <Linkedin className="w-5 h-5 text-white/90" />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation links in 2 columns */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li><Link href="/" className="hover:text-white">Home</Link></li>
                    <li><Link href="/why-recce" className="hover:text-white">Why Recce?</Link></li>
                    <li><Link href="/how-it-works" className="hover:text-white">How it Works</Link></li>
                    <li><Link href="/rewards" className="hover:text-white">Rewards</Link></li>
                    <li><Link href="/gossip" className="hover:text-white">Gossip</Link></li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li><Link href="/help" className="hover:text-white">Help</Link></li>
                    <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
                    <li><Link href="/team" className="hover:text-white">Team</Link></li>
                    <li><Link href="/benefits" className="hover:text-white">Benefits</Link></li>
                  </ul>
                </div>
              </div>

              {/* Download buttons */}
              <div>
                <h3 className="text-sm font-semibold text-white/90 mb-3">Download app</h3>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#484848] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    onClick={redirectToPlaystore}
                  >
                    <img src="/assets/icons/Google_Play.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left text-xs">
                      <div className="text-gray-300 text-xs">GET IT ON</div>
                      <div className="font-medium text-white text-xs whitespace-nowrap">Google Play</div>
                    </div>
                  </button>

                  <button
                    className="flex-1 flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#484848] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    onClick={redirectToAppstore}
                  >
                    <img src="/assets/icons/Apple.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left text-xs">
                      <div className="text-gray-300 text-xs whitespace-nowrap">Download on the</div>
                      <div className="font-medium text-white text-xs">App Store</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700/60 px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-24 py-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 text-sm">
              <div className="text-[#848686]">© 2025 Recce. All rights reserved.</div>

              <div className="flex gap-4 md:gap-6 text-sm">
                <Link href="/privacy-policy" className="text-[#848686] hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="text-[#848686] hover:text-white transition-colors">Terms and Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}