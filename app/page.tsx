"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Before & After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    handleMove(clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

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
    <>
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
      {/* Curated Collections Showcase */}
      <section id="collections" className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase drop-shadow-sm">The Archives</h2>
              <h3 className="text-5xl md:text-7xl font-black text-[#251208] leading-tight uppercase tracking-tighter" style={{ fontFamily: "Impact, ui-sans-serif, system-ui, sans-serif" }}>
                Curated <br /> Collections
              </h3>
            </div>
            <p className="text-[#6b3e21] max-w-md text-lg font-medium">
              Discover our signature materials, ethically sourced and crafted to perfection. Find the foundation that speaks to your space.
            </p>
          </div>

          {/* Interactive Gallery */}
          <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-4 w-full">
            
            {/* Collection 1 */}
            <div className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl cursor-pointer">
              <Image src="/collection-1.png" alt="European Oak" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-[2px] bg-[#8c5430] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-300" />
                  <span className="text-[#fdf2e9] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">01</span>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "'Signwood', serif" }}>European Oak</h4>
                <p className="text-white/80 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Timeless elegance with rich, warm undertones. Perfect for creating expansive, inviting living spaces.
                </p>
              </div>
            </div>

            {/* Collection 2 */}
            <div className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl cursor-pointer">
              <Image src="/collection-2.png" alt="Luxury Vinyl Plank" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-[2px] bg-[#8c5430] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-300" />
                  <span className="text-[#fdf2e9] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">02</span>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "'Signwood', serif" }}>Luxury Vinyl</h4>
                <p className="text-white/80 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Uncompromising durability meets stunning realism. Designed for modern, high-traffic homes.
                </p>
              </div>
            </div>

            {/* Collection 3 */}
            <div className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl cursor-pointer">
              <Image src="/collection-3.png" alt="Sustainable Bamboo" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-[2px] bg-[#8c5430] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-300" />
                  <span className="text-[#fdf2e9] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">03</span>
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "'Signwood', serif" }}>Sustainable Bamboo</h4>
                <p className="text-white/80 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Eco-friendly, resilient, and beautifully light. Bring a sense of serene nature into your bedroom.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Before & After */}
      <section className="w-full py-24 bg-[#1a0d07] relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('/wood-texture.png')] opacity-5 mix-blend-overlay" />
        
        <div className="max-w-[1200px] w-full px-8 md:px-12 flex flex-col items-center text-center mb-16 relative z-10">
          <h2 className="text-xs font-bold tracking-widest text-[#fce8d5] uppercase drop-shadow-sm mb-4">The Transformation</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Signwood', serif" }}>
            Seeing is Believing
          </h3>
          <p className="text-white/70 max-w-2xl text-lg font-medium">
            Drag the slider to experience the dramatic impact our premium flooring brings to a space. 
            From outdated to outstanding in just a few days.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative w-[90%] max-w-[1000px] aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl select-none z-10"
             ref={containerRef}
             onMouseDown={handleMouseDown}
             onTouchStart={handleMouseDown}>
          
          {/* After Image (Background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image src="/after.png" alt="After Renovation" fill className="object-cover" />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">After</div>
          </div>

          {/* Before Image (Foreground, Clipped) */}
          <div className="absolute inset-0 w-full h-full border-r-[3px] border-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
               style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            <Image src="/before.png" alt="Before Renovation" fill className="object-cover grayscale-[20%]" />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">Before</div>
          </div>

          {/* Slider Handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize flex items-center justify-center z-20"
               style={{ left: `calc(${sliderPosition}% - 2px)` }}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transform -translate-x-1/2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#251208" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" transform="rotate(90 12 12)" />
               </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Box Lead Gen CTA */}
      <section className="w-full py-24 bg-[#faf6f3] relative overflow-hidden flex justify-center px-8">
        <div className="max-w-[1200px] w-full bg-[#251208] rounded-[3rem] p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          
          {/* Decor background elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/wood-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#8c5430] rounded-full blur-[100px] opacity-30 pointer-events-none" />
          
          <div className="flex flex-col gap-6 relative z-10 max-w-xl text-center lg:text-left">
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-wide" style={{ fontFamily: "Impact, ui-sans-serif, system-ui, sans-serif" }}>
              Experience The <br className="hidden md:block" /> Quality At Home
            </h3>
            <p className="text-[#fce8d5]/80 text-lg md:text-xl font-medium leading-relaxed">
              Not sure which finish matches your walls? Request a curated box of our 4 most popular premium flooring samples, delivered free to your door.
            </p>
          </div>

          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl relative z-10">
            <h4 className="text-xl font-extrabold text-[#251208] mb-6 text-center">Request Free Samples</h4>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
              <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
              <button className="w-full bg-[#8c5430] hover:bg-[#6b3e21] text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0">
                Send My Box
              </button>
            </form>
            <p className="text-center text-xs text-[#8c5430] font-bold tracking-widest uppercase mt-4 opacity-70">Limit 1 per household</p>
          </div>
        </div>
      </section>
    </main>

      {/* Premium Footer */}
      <footer className="w-full bg-[#110804] pt-24 pb-8 relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[url('/wood-texture.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            
            {/* Brand Column */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8c5430] flex items-center justify-center shadow-[0_0_15px_rgba(140,84,48,0.5)]">
                   <Image src="/logo.png" alt="Portland Flooring Logo" width={24} height={24} className="brightness-0 invert" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white" style={{ fontFamily: "Impact, ui-sans-serif, system-ui, sans-serif" }}>PORTLAND</span>
              </div>
              <p className="text-[#fce8d5]/50 text-sm leading-relaxed font-medium">
                Elevating spaces with timeless craftsmanship and sustainable materials. Masterfully installed flooring that defines your home.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Collections</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">European Oak</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Luxury Vinyl</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Sustainable Bamboo</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Hybrid Hardwood</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Company</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Our Legacy</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Master Craftsmanship</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Sustainability</a></li>
                <li><a href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Get in Touch</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430] shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="text-[#fce8d5]/60 text-sm leading-relaxed">123 Artisan Way, Suite 400<br />Portland, OR 97204</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430] shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span className="text-[#fce8d5]/60 text-sm">(503) 555-0198</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430] shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-[#fce8d5]/60 text-sm">hello@portlandflooring.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#fce8d5]/40 text-xs font-medium">
              &copy; {new Date().getFullYear()} Portland Flooring. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#fce8d5]/40 hover:text-[#8c5430] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-[#fce8d5]/40 hover:text-[#8c5430] transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
