"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function Navbar({ isLoading }: { isLoading: boolean }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Premium Hybrid', href: '/fusion-hybrid' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' }
  ];

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
        @keyframes mobileSlideIn {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes mobileFadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ease-in-out flex items-center justify-between ${
        isScrolled
          ? 'bg-[#fdfaf6]/95 backdrop-blur-md shadow-lg border-b border-[#8c5430]/10 py-3 px-4 md:px-12 pointer-events-auto'
          : 'bg-transparent py-6 md:py-8 px-4 md:px-12 pointer-events-none'
      }`}>

        {/* Logo */}
        <div className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'relative w-10 h-10 md:w-16 md:h-16 opacity-100'
            : `relative w-14 h-14 md:w-24 md:h-24 ${!isLoading ? 'opacity-100' : 'opacity-0'}`
        }`}>
          <Link href="/" className="block w-full h-full overflow-hidden rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300">
            <Image src="/portland-logo.webp" alt="Portland Flooring Logo" fill className="object-cover" priority />
          </Link>
        </div>

        {/* ─── DESKTOP NAV ─── */}
        <nav
          className={`pointer-events-auto transition-all duration-500 ease-in-out hidden lg:flex items-center relative ${
            isScrolled ? 'px-0 py-0' : 'px-6 py-2'
          } ${!isLoading && !isScrolled ? 'animate-drop-swing' : ''} ${isLoading && !isScrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Background for Unscrolled State (Hanging Sign) */}
          <div className={`absolute inset-0 rounded-lg shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] border-t border-white/20 border-b-2 border-[#8c5430]/30 transition-all duration-500 ease-in-out ${
            isScrolled ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="absolute inset-0 rounded-lg z-[-2]" style={{ backgroundImage: 'url(/light-wood-texture.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 rounded-lg bg-[#8c5430]/10 mix-blend-multiply z-[-1]" />
          </div>

          {/* Straps (Unscrolled State) */}
          <div className={`absolute -top-8 left-6 w-3 h-10 bg-gradient-to-b from-[#8c5430] to-[#5b3219] shadow-[2px_0_5px_rgba(0,0,0,0.2)] flex flex-col justify-end items-center pb-2 z-[-3] transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#fce8d5] shadow-sm" />
          </div>
          <div className={`absolute -top-8 right-6 w-3 h-10 bg-gradient-to-b from-[#8c5430] to-[#5b3219] shadow-[2px_0_5px_rgba(0,0,0,0.2)] flex flex-col justify-end items-center pb-2 z-[-3] transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#fce8d5] shadow-sm" />
          </div>

          {/* Nav Links */}
          <div className="relative z-10 flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${pathname === item.href ? 'text-[#8c5430] border-b-2 border-[#8c5430]' : 'text-[#4a2810]'} font-bold tracking-wide hover:text-[#8c5430] transition-colors drop-shadow-sm text-sm uppercase`}
              >
                {item.name}
              </Link>
            ))}

            {/* Get a Quote Button */}
            <Link href="/quote"
              className={`relative ml-4 rounded-md font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 active:translate-y-0.5 inline-block overflow-hidden ${
                isScrolled
                  ? 'px-4 py-2 bg-[#8c5430] text-white shadow-sm hover:bg-[#6b3e21]'
                  : 'px-5 py-2 text-white shadow-[0_4px_10px_rgba(140,84,48,0.3)] hover:shadow-[0_6px_15px_rgba(140,84,48,0.4)] border border-[#8c5430]/30'
              }`}
            >
              <div className={`absolute inset-0 z-[-2] transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundImage: 'url(/wood-texture.webp)', backgroundSize: 'cover', backgroundPosition: 'bottom' }} />
              <div className={`absolute inset-0 bg-gradient-to-b from-[#b56b3a]/80 to-[#6b3e21]/90 mix-blend-multiply z-[-1] transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`relative z-10 transition-all duration-500 ${isScrolled ? '' : 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'}`}>Get a Quote</span>
            </Link>
          </div>
        </nav>

        {/* ─── MOBILE HAMBURGER ─── */}
        <button
          onClick={toggleMobile}
          className={`pointer-events-auto lg:hidden relative z-[1001] w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-300 ${
            mobileOpen
              ? 'bg-transparent'
              : isScrolled
                ? 'bg-[#251208] shadow-md'
                : 'bg-[#251208]/80 backdrop-blur-sm shadow-lg'
          } ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${
            mobileOpen ? 'bg-white rotate-45 translate-y-[7px]' : 'bg-white'
          }`} />
          <span className={`block w-5 h-[2px] rounded-full bg-white transition-all duration-300 ${
            mobileOpen ? 'opacity-0 scale-0' : 'opacity-100'
          }`} />
          <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${
            mobileOpen ? 'bg-white -rotate-45 -translate-y-[7px]' : 'bg-white'
          }`} />
        </button>
      </header>

      {/* ─── MOBILE OVERLAY ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ─── MOBILE DRAWER ─── */}
      <div className={`fixed top-0 right-0 z-[999] h-full w-[300px] max-w-[85vw] lg:hidden transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
        style={{ animation: mobileOpen ? 'mobileSlideIn 0.4s ease-out' : 'none' }}
      >
        {/* Drawer Background */}
        <div className="absolute inset-0 bg-[#1a0d07]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/wood-texture.webp)', backgroundSize: 'cover' }} />
        </div>

        {/* Drawer Content */}
        <div className="relative z-10 flex flex-col h-full pt-8 pb-8 px-8">
          {/* Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="self-end mb-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 active:scale-90"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Nav Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 group ${
                  pathname === item.href
                    ? 'bg-[#8c5430]/20 text-[#fce8d5]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                style={{ animation: mobileOpen ? `mobileFadeIn 0.4s ease-out ${0.1 + i * 0.05}s both` : 'none' }}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  pathname === item.href ? 'bg-[#8c5430] scale-100' : 'bg-white/20 scale-75 group-hover:scale-100 group-hover:bg-white/40'
                }`} />
                <span className="font-bold tracking-wider text-sm uppercase">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-white/10" />

          {/* CTA Button */}
          <Link
            href="/quote"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-6 py-4 font-bold text-white uppercase tracking-widest text-sm text-center shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#b56b3a] to-[#8c5430] hover:from-[#c97d4a] hover:to-[#a0643a]"
            style={{ animation: mobileOpen ? `mobileFadeIn 0.4s ease-out 0.5s both` : 'none' }}
          >
            Get a Quote
          </Link>

          {/* Bottom Branding */}
          <div className="mt-auto flex flex-col items-center gap-3 opacity-40">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/portland-logo.webp" alt="Portland Flooring" fill className="object-cover" />
            </div>
            <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-bold">Portland Flooring</span>
          </div>
        </div>
      </div>
    </>
  );
}
