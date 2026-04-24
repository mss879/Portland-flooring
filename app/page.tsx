"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isLoading && heroVideoRef.current) {
      heroVideoRef.current.play();
    }
  }, [isLoading]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const unmountTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      <style>{`
        @font-face {
          font-family: 'Signwood';
          src: url('/Signwood-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @keyframes dropAndSwing {
          0% {
            transform: perspective(1000px) rotateX(-90deg);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          30% {
            transform: perspective(1000px) rotateX(35deg);
            opacity: 1;
            animation-timing-function: ease-in-out;
          }
          50% {
            transform: perspective(1000px) rotateX(-15deg);
            animation-timing-function: ease-in-out;
          }
          70% {
            transform: perspective(1000px) rotateX(8deg);
            animation-timing-function: ease-in-out;
          }
          85% {
            transform: perspective(1000px) rotateX(-3deg);
            animation-timing-function: ease-in-out;
          }
          100% {
            transform: perspective(1000px) rotateX(0deg);
          }
        }
        .animate-drop-swing {
          animation: dropAndSwing 1.8s forwards;
          transform-origin: 50% -32px;
        }
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 1s;
        }
        @keyframes slideInLeft {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-center justify-center p-[9px]">
        {showPreloader && (
          <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0d07] transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
            {/* Flooring Planks Animation */}
            <div className="flex flex-col gap-1.5 mb-8 w-48 overflow-hidden py-2">
              <div className="h-5 w-36 bg-[#b56b3a] rounded-sm ml-auto shadow-md" style={{ animation: 'slideInRight 0.4s ease-out 0.1s forwards', opacity: 0 }} />
              <div className="h-5 w-40 bg-[#8c5430] rounded-sm shadow-md" style={{ animation: 'slideInLeft 0.4s ease-out 0.3s forwards', opacity: 0 }} />
              <div className="h-5 w-32 bg-[#6b3e21] rounded-sm ml-auto shadow-md" style={{ animation: 'slideInRight 0.4s ease-out 0.5s forwards', opacity: 0 }} />
              <div className="h-5 w-48 bg-[#5b3219] rounded-sm shadow-md" style={{ animation: 'slideInLeft 0.4s ease-out 0.7s forwards', opacity: 0 }} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-[0.3em] text-white uppercase drop-shadow-md">
              Welcome
            </h2>
          </div>
        )}

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-black shadow-2xl">

          {/* Logo - Top Left */}
          <div className="absolute top-10 left-12 z-50 flex items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo.png"
                alt="Portland Flooring Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Navigation - Hanging Sign Style */}
          <nav
            className={`${!isLoading ? 'animate-drop-swing' : 'opacity-0'} absolute top-8 right-12 z-50 flex items-center rounded-lg px-8 py-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-t border-[#8c5430]/60 border-b-4 border-[#251208]`}
          >
            {/* Wood texture background */}
            <div
              className="absolute inset-0 rounded-lg z-[-2]"
              style={{
                backgroundImage: 'url(/wood-texture.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            {/* Color Tint Overlay for the warm brown look */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#a35e31]/80 to-[#5b3219]/90 mix-blend-multiply z-[-1]" />

            {/* Straps hanging from above */}
            <div className="absolute -top-8 left-8 w-3 h-10 bg-gradient-to-b from-[#2a160d] to-[#1a0d07] shadow-[2px_0_5px_rgba(0,0,0,0.5)] flex flex-col justify-end items-center pb-2 z-[-3]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c5430] shadow-sm" />
            </div>
            <div className="absolute -top-8 right-8 w-3 h-10 bg-gradient-to-b from-[#2a160d] to-[#1a0d07] shadow-[2px_0_5px_rgba(0,0,0,0.5)] flex flex-col justify-end items-center pb-2 z-[-3]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c5430] shadow-sm" />
            </div>

            <div className="relative z-10 flex items-center gap-8">
              {['Home', 'About', 'Products', 'Contact Us'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#fce8d5] font-semibold tracking-wide hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] text-sm uppercase"
                >
                  {item}
                </a>
              ))}

              <button
                className="relative ml-4 rounded-md px-6 py-2.5 font-bold text-white uppercase tracking-wider text-sm shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.4)] border border-[#8c5430]/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.7),inset_0_2px_3px_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.4)] active:translate-y-0.5 active:shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.4)]"
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
              </button>
            </div>
          </nav>

          {/* Hero Background Video */}
          <video
            ref={heroVideoRef}
            src="/House_interior_renovation_web.mp4"
            loop
            muted
            playsInline
            suppressHydrationWarning
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Plain Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Hero Text - Bottom Left */}
          <div className={`absolute bottom-52 left-12 z-20 flex flex-col items-start ${!isLoading ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Signwood', serif" }}>
              The Art of Hybrid <br /> Flooring
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white font-medium tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] uppercase" style={{ wordSpacing: '0.2em' }}>
              Elegant. Durable. Sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* Partners / Brands Infinite Scroll Section */}
      <section className="w-full py-20 bg-white overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full relative">
          {/* Gradient masks for smooth fade effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-[200%] animate-infinite-scroll hover:[animation-play-state:paused]">
            {/* First Set */}
            <div className="flex w-1/2 items-center justify-around px-16 gap-32">
              <div className="relative w-[300px] h-[100px]">
                <Image
                  src="/cr=w_904,h_300.webp"
                  alt="Brand 1"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="relative w-[400px] h-[100px]">
                <Image
                  src="/rs=w_1277,h_300,cg_true.webp"
                  alt="Brand 2"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              {/* Duplicating within the set to fill space */}
              <div className="relative w-[300px] h-[100px]">
                <Image
                  src="/cr=w_904,h_300.webp"
                  alt="Brand 1"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="relative w-[400px] h-[100px]">
                <Image
                  src="/rs=w_1277,h_300,cg_true.webp"
                  alt="Brand 2"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex w-1/2 items-center justify-around px-16 gap-32">
              <div className="relative w-[300px] h-[100px]">
                <Image
                  src="/cr=w_904,h_300.webp"
                  alt="Brand 1"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="relative w-[400px] h-[100px]">
                <Image
                  src="/rs=w_1277,h_300,cg_true.webp"
                  alt="Brand 2"
                  fill
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="relative w-[300px] h-[100px]">
                <Image
                  src="/cr=w_904,h_300.webp"
                  alt="Brand 1"
                  fill
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative w-[400px] h-[100px]">
                <Image
                  src="/rs=w_1277,h_300,cg_true.webp"
                  alt="Brand 2"
                  fill
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-End About Us Bento Section */}
      <section id="about" className="w-full py-20 px-8 md:px-12 lg:px-24 bg-[#faf6f3] overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">

          {/* Section Header */}
          <div className="flex flex-col gap-3 md:items-center md:text-center">
            <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase drop-shadow-sm">Our Legacy</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-[#251208]" style={{ fontFamily: "'Signwood', serif" }}>
              Crafting Floors That <br className="hidden md:block" /> Define Your Space
            </h3>
          </div>

          {/* High-End Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

            {/* 1. Main Intro Card (Spans 2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col justify-center shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/5">
              
              {/* Subtle architectural grid / blueprint background that fades in */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#8c5430 1px, transparent 1px), linear-gradient(90deg, #8c5430 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              {/* Soft warm glow that shifts on hover */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#fdf2e9] to-transparent rounded-full blur-3xl opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-1000 ease-out pointer-events-none" />

              <div className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-700 ease-out">
                <h4 className="text-3xl md:text-4xl lg:text-[3rem] font-black text-[#251208] mb-6 leading-[1.1] uppercase group-hover:text-[#1a0d07] transition-colors duration-500" style={{ fontFamily: "Impact, ui-sans-serif, system-ui, sans-serif" }}>
                  Elevating Spaces With <br className="hidden md:block" /> Timeless Craftsmanship
                </h4>
                <p className="text-[#6b3e21]/90 text-lg md:text-xl max-w-3xl leading-relaxed font-medium group-hover:text-[#4a2810] transition-colors duration-500">
                  Portland Flooring delivers elegant, durable, and sustainable flooring solutions. We bring your vision to life with materials that stand the test of time, blending aesthetic beauty with uncompromising quality.
                </p>
              </div>
            </div>

            {/* 2. Stat Card (Spans 1 col) */}
            <div className="bg-[#fbf5f0] rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/5">
              
              {/* Floor Polishing / Shine Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 group-hover:translate-x-[150%] -translate-x-[150%] transition-all duration-[1.5s] ease-in-out transform scale-150 rotate-45 pointer-events-none z-20" />
              
              {/* Abstract Floor Planks Shifting Animation */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex flex-col z-0 overflow-hidden">
                 <div className="h-1/4 w-[200%] bg-gradient-to-r from-transparent via-[#8c5430]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-[1.5s] ease-out" />
                 <div className="h-1/4 w-[200%] bg-gradient-to-r from-[#8c5430]/5 via-transparent to-[#8c5430]/5 translate-x-[-50%] group-hover:translate-x-0 transition-transform duration-[1.8s] ease-out delay-75" />
                 <div className="h-1/4 w-[200%] bg-gradient-to-r from-transparent via-[#8c5430]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-[1.6s] ease-out delay-150" />
                 <div className="h-1/4 w-[200%] bg-gradient-to-r from-[#8c5430]/5 via-transparent to-[#8c5430]/5 translate-x-[-50%] group-hover:translate-x-0 transition-transform duration-[1.4s] ease-out delay-200" />
              </div>

              <div className="relative z-10 flex flex-col items-center group-hover:scale-110 transition-transform duration-700 ease-out">
                {/* 15+ Using geometric blocky text similar to the image */}
                <span className="text-7xl md:text-8xl font-black text-[#8c5430] mb-3 tracking-tighter drop-shadow-sm group-hover:drop-shadow-md group-hover:text-[#6b3e21] transition-all duration-500" style={{ fontFamily: "Impact, ui-sans-serif, system-ui, sans-serif" }}>15+</span>
                <span className="text-sm md:text-base text-[#5b3219] uppercase tracking-[0.25em] font-bold text-center group-hover:text-[#251208] transition-colors duration-500">Years of<br />Excellence</span>
              </div>
            </div>

            {/* 3. Video Card (Spans 1 col, tall) */}
            <div className="rounded-3xl overflow-hidden relative shadow-sm h-[280px] md:h-auto group">
              <video
                src="/her-vid-2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white z-10 flex items-center gap-3">
                <div className="w-2 h-2 bg-[#8c5430] rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-90">Craftsmanship</span>
              </div>
            </div>

            {/* 4. Stacked Small Cards (Spans 1 col) */}
            <div className="flex flex-col gap-4">
              {/* Top Small Card - Sustainability (Wood Rings) */}
              <div className="group bg-[#fdfaf6] rounded-3xl p-6 flex-1 border border-[#8c5430]/10 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-center relative overflow-hidden">
                {/* Wood Rings Animation Background */}
                <div className="absolute -right-12 -bottom-12 w-40 h-40 border-[2px] border-[#8c5430]/10 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-out pointer-events-none" />
                <div className="absolute -right-6 -bottom-6 w-28 h-28 border-[2px] border-[#8c5430]/15 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-out delay-75 pointer-events-none" />
                <div className="absolute right-0 bottom-0 w-16 h-16 border-[2px] border-[#8c5430]/20 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-out delay-150 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#f4ebd9] text-[#4a6b3e] flex items-center justify-center mb-4 shadow-inner group-hover:bg-[#4a6b3e] group-hover:text-[#f4ebd9] transition-colors duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                  </div>
                  <h5 className="font-extrabold text-[#251208] text-xl mb-2 group-hover:text-[#4a6b3e] transition-colors duration-300 tracking-tight">Eco-Crafted</h5>
                  <p className="text-[#6b3e21] text-sm leading-relaxed">Sustainably sourced materials that breathe life into your home naturally.</p>
                </div>
              </div>

              {/* Bottom Small Card - Installation (Click-Lock Planks) */}
              <div className="group bg-[#2a160d] rounded-3xl p-6 flex-1 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-center relative overflow-hidden">
                {/* Planks Animation Background */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  <div className="absolute top-2 -right-4 w-32 h-8 bg-gradient-to-r from-[#8c5430] to-[#6b3e21] rounded-sm transform rotate-[-15deg] group-hover:-translate-x-6 group-hover:rotate-0 transition-all duration-700 ease-in-out shadow-lg" />
                  <div className="absolute top-12 -right-8 w-32 h-8 bg-gradient-to-r from-[#6b3e21] to-[#4a2810] rounded-sm transform rotate-[-15deg] group-hover:-translate-x-10 group-hover:rotate-0 transition-all duration-700 ease-in-out delay-75 shadow-lg" />
                  <div className="absolute top-[88px] -right-12 w-32 h-8 bg-gradient-to-r from-[#b56b3a] to-[#8c5430] rounded-sm transform rotate-[-15deg] group-hover:-translate-x-14 group-hover:rotate-0 transition-all duration-700 ease-in-out delay-150 shadow-lg" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#3a2013] text-[#fce8d5] flex items-center justify-center mb-4 shadow-inner border border-[#8c5430]/30 group-hover:scale-110 transition-transform duration-500">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                     </svg>
                  </div>
                  <h5 className="font-extrabold text-[#fdf2e9] text-xl mb-2 group-hover:text-[#fce8d5] transition-colors duration-300 tracking-tight">Precision Fit</h5>
                  <p className="text-[#fce8d5]/70 text-sm leading-relaxed">Flawless execution. Every plank perfectly aligned with master craftsmanship.</p>
                </div>
              </div>
            </div>

            {/* 5. CTA / Process Card (Spans 1 col) */}
            <div className="bg-[#251208] rounded-3xl p-8 flex flex-col justify-between border border-transparent shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <h5 className="font-bold text-[#fce8d5] text-2xl mb-4 leading-snug">Ready to transform your home?</h5>
                <p className="text-[#fce8d5]/70 text-sm mb-8 leading-relaxed">From expert consultation to final walkthrough, we're with you every step.</p>
              </div>
              <button className="relative z-10 flex items-center justify-between bg-white text-[#251208] px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#fce8d5] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group-hover:shadow-lg">
                Get Started
                <div className="w-7 h-7 rounded-full bg-[#fdf2e9] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#8c5430]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
