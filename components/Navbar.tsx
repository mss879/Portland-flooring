"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ isLoading }: { isLoading: boolean }) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @keyframes dropAndSwing {
          0% { transform: perspective(1000px) rotateX(-90deg); opacity: 0; animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          50% { transform: perspective(1000px) rotateX(15deg); opacity: 1; animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          70% { transform: perspective(1000px) rotateX(-10deg); animation-timing-function: ease-in-out; }
          85% { transform: perspective(1000px) rotateX(5deg); animation-timing-function: ease-in-out; }
          100% { transform: perspective(1000px) rotateX(0deg); animation-timing-function: ease-in-out; }
        }
        .animate-drop-swing {
          transform-origin: top center;
          animation: dropAndSwing 1.5s forwards;
        }
      `}</style>
      
      {/* Logo */}
      <div className={`absolute top-8 left-12 z-50 flex items-center transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Link href="/" className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300">
          <Image src="/portland-logo.png" alt="Portland Flooring Logo" fill className="object-cover" priority />
        </Link>
      </div>

      {/* Navigation - Hanging Sign Style */}
      <nav
        className={`${!isLoading ? 'animate-drop-swing' : 'opacity-0'} absolute top-8 right-6 z-50 flex items-center rounded-lg px-6 py-2 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] border-t border-white/20 border-b-2 border-[#8c5430]/30`}
      >
        {/* Light Wood Background */}
        <div
          className="absolute inset-0 rounded-lg z-[-2]"
          style={{
            backgroundImage: 'url(/light-wood-texture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Subtle warm tint to tone down the stark whiteness */}
        <div className="absolute inset-0 rounded-lg bg-[#8c5430]/10 mix-blend-multiply z-[-1]" />

        {/* Straps hanging from above */}
        <div className="absolute -top-8 left-6 w-3 h-10 bg-gradient-to-b from-[#8c5430] to-[#5b3219] shadow-[2px_0_5px_rgba(0,0,0,0.2)] flex flex-col justify-end items-center pb-2 z-[-3]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fce8d5] shadow-sm" />
        </div>
        <div className="absolute -top-8 right-6 w-3 h-10 bg-gradient-to-b from-[#8c5430] to-[#5b3219] shadow-[2px_0_5px_rgba(0,0,0,0.2)] flex flex-col justify-end items-center pb-2 z-[-3]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#fce8d5] shadow-sm" />
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Services', href: '/services' },
            { name: 'Products', href: '/products' },
            { name: 'Fusion Hybrid', href: '/fusion-hybrid' },
            { name: 'Blogs', href: '/blogs' },
            { name: 'Contact Us', href: '/contact' }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${pathname === item.href ? 'text-[#8c5430] border-b-2 border-[#8c5430]' : 'text-[#4a2810]'} font-bold tracking-wide hover:text-[#8c5430] transition-colors drop-shadow-sm text-sm uppercase`}
            >
              {item.name}
            </Link>
          ))}

          <Link href="/quote"
            className="relative ml-4 rounded-md px-5 py-2 font-bold text-white uppercase tracking-wider text-sm shadow-[0_4px_10px_rgba(140,84,48,0.3)] border border-[#8c5430]/30 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(140,84,48,0.4)] active:translate-y-0.5 inline-block"
          >
            <div
              className="absolute inset-0 rounded-md z-[-2]"
              style={{
                backgroundImage: 'url(/wood-texture.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom'
              }}
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#b56b3a]/80 to-[#6b3e21]/90 mix-blend-multiply z-[-1]" />
            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Get a Quote</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
