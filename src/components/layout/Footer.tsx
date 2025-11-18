import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full">
        <div className="bg-[#404040] text-white rounded-t-[28px] border-t overflow-hidden shadow-inner">
          <div className="px-8 py-10">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 gap-8 items-start">
              {/* Left: Brand */}
              <div className="col-span-1">
                <Link href="/" className="inline-block">
                  <h2 className="text-4xl font-extrabold tracking-tight">Recce</h2>
                </Link>
                <p className="mt-3 text-[#848686]">Cures Content Overload</p>

                <div className="mt-6 flex items-center gap-3">
                  <a className="w-8 h-8 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90">f</a>
                  <a className="w-8 h-8 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90">ig</a>
                  <a className="w-8 h-8 rounded-full bg-[#383838] flex items-center justify-center text-sm text-white/90">t</a>
                </div>
              </div>

              {/* Middle: Navigation columns */}
              <div className="col-span-2 flex justify-center">
                <div className="grid grid-cols-2 gap-8">
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
              <div className="col-span-1 flex flex-col items-end">
                <h3 className="text-sm font-semibold text-white/90 self-start">Download app</h3>
                <div className="mt-4 flex flex-col items-end gap-3 w-full">
                  <button className="flex items-center gap-3 bg-[#383838] hover:bg-[#484848] px-4 py-2 rounded-md w-full cursor-pointer">
                    <div className="w-8 h-8 bg-white/10 rounded-sm" />
                    <div className="text-left text-sm">
                      <div className="text-xs text-gray-300">GET IT ON</div>
                      <div className="font-medium text-white">Google Play</div>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 bg-[#383838] hover:bg-[#484848] px-4 py-2 rounded-md w-full cursor-pointer">
                    <div className="w-8 h-8 bg-white/10 rounded-sm" />
                    <div className="text-left text-sm">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="font-medium text-white">App Store</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-8">
              {/* Top: Brand with socials on right */}
              <div className="flex items-start justify-between">
                <div>
                  <Link href="/" className="inline-block">
                    <h2 className="text-3xl font-extrabold tracking-tight">Recce</h2>
                  </Link>
                  <p className="mt-2 text-gray-400 text-sm">Cures Content Overload</p>
                </div>

                <div className="flex items-center gap-2 self-end">
                  <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white/90">f</a>
                  <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white/90">ig</a>
                  <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white/90">t</a>
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
                  <button className="flex-1 flex items-center gap-2 bg-[#383838] hover:bg-[#484848] px-2 py-2 rounded-md">
                    <div className="w-6 h-6 rounded-sm flex-shrink-0" />
                    <div className="text-left text-xs">
                      <div className="text-gray-300 text-xs">GET IT ON</div>
                      <div className="font-medium text-white text-xs">Google Play</div>
                    </div>
                  </button>

                  <button className="flex-1 flex items-center gap-2bg-[#383838] hover:bg-[#484848] px-2 py-2 rounded-md">
                    <div className="w-6 h-6 rounded-sm flex-shrink-0" />
                    <div className="text-left text-xs">
                      <div className="text-gray-300 text-xs">Download on the</div>
                      <div className="font-medium text-white text-xs">App Store</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700/60 px-8 py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="text-[#848686] text-sm">© 2025 Recce. All rights reserved.</div>

              <div className="flex gap-6 text-sm">
                <Link href="#" className="text-[#848686] hover:text-white">Privacy Policy</Link>
                <Link href="#" className="text-[#848686] hover:text-white">Terms and Conditions</Link>
              </div>

              <div className="text-[#848686] text-sm">Design & Developed by <Link href="#" className="underline">Yellow Panther</Link></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}