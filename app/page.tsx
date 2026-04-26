"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        .animate-infinite-scroll-text {
          animation: infinite-scroll 100s linear infinite;
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
              <h2 className="text-2xl font-bold tracking-[0.3em] text-white uppercase drop-shadow-md">
                Welcome
              </h2>
            </div>
          )}

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-black shadow-2xl">

            {/* Navigation - Hanging Sign Style */}
            <Navbar isLoading={isLoading} />

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
            <div className="absolute inset-0 bg-black/20 z-10" />

            {/* Hero Text - Bottom Left */}
            <div className={`absolute bottom-52 left-12 z-20 flex flex-col items-start ${!isLoading ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white tracking-wider leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                The Art of Hybrid <br /> Flooring
              </h1>
              <p className="mt-8 text-xl md:text-2xl text-white font-medium tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] uppercase" style={{ wordSpacing: '0.2em' }}>
                Elegant. Durable. Sustainable.
              </p>
            </div>
          </div>
        </section>

        {/* Australian Owned Scrolling Banner (Light Wood Theme) */}
        <div className="relative w-full py-4 overflow-hidden flex items-center border-y border-[#8c5430]/20 shadow-sm">
          {/* Light Wood Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/light-wood-texture.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Subtle warm tint */}
          <div className="absolute inset-0 bg-[#8c5430]/5 mix-blend-multiply z-0" />

          <div className="relative z-10 flex w-max animate-infinite-scroll-text whitespace-nowrap">
            {/* First Set */}
            <div className="flex items-center">
              {[...Array(8)].map((_, i) => (
                <span key={`aus-1-${i}`} className="text-[#4a2810] font-bold tracking-[0.2em] uppercase text-sm flex items-center drop-shadow-sm shrink-0 mx-8">
                  Proudly Australian Owned & Operated
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c5430]/60 ml-16" />
                </span>
              ))}
            </div>
            {/* Second Set */}
            <div className="flex items-center">
              {[...Array(8)].map((_, i) => (
                <span key={`aus-2-${i}`} className="text-[#4a2810] font-bold tracking-[0.2em] uppercase text-sm flex items-center drop-shadow-sm shrink-0 mx-8">
                  Proudly Australian Owned & Operated
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c5430]/60 ml-16" />
                </span>
              ))}
            </div>
          </div>
        </div>

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
              <h3 className="text-4xl md:text-6xl font-bold text-[#251208]" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
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
                  <h4 className="text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold text-[#251208] mb-6 leading-[1.15] group-hover:text-[#1a0d07] transition-colors duration-500 tracking-tight" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                    Elevating Spaces With Timeless Craftsmanship
                  </h4>
                  <p className="text-[#6b3e21]/90 text-lg md:text-xl max-w-3xl leading-relaxed font-medium group-hover:text-[#4a2810] transition-colors duration-500">
                    Portland Flooring delivers elegant, durable, and sustainable flooring solutions. We bring your vision to life with materials that stand the test of time, blending aesthetic beauty with uncompromising quality.
                  </p>
                </div>
              </div>

              {/* 2. Stat Card (Spans 1 col) */}
              <div className="bg-[#fbf5f0] rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/5">

                {/* Floor Polishing / Shine Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 group-hover:translate-x-[150%] -translate-x-[150%] transition-all duration-[1.5s] ease-in-out transform scale-150 rotate-45 pointer-events-none z-20" />

                {/* Abstract Floor Planks (Permanently Visible) */}
                <div className="absolute inset-0 opacity-100 pointer-events-none flex flex-col z-0 overflow-hidden">
                  <div className="h-1/4 w-[200%] bg-gradient-to-r from-transparent via-[#8c5430]/5 to-transparent" />
                  <div className="h-1/4 w-[200%] bg-gradient-to-r from-[#8c5430]/5 via-transparent to-[#8c5430]/5" />
                  <div className="h-1/4 w-[200%] bg-gradient-to-r from-transparent via-[#8c5430]/5 to-transparent" />
                  <div className="h-1/4 w-[200%] bg-gradient-to-r from-[#8c5430]/5 via-transparent to-[#8c5430]/5" />
                </div>

                <div className="relative z-10 flex flex-col items-center scale-110">
                  {/* 15+ Using geometric blocky text similar to the image */}
                  <span className="text-7xl md:text-8xl font-bold text-[#6b3e21] mb-3 tracking-tighter drop-shadow-md" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>15+</span>
                  <span className="text-sm md:text-base text-[#251208] uppercase tracking-[0.25em] font-bold text-center">Years of<br />Excellence</span>
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
                    <h5 className="font-bold text-[#251208] text-xl mb-2 group-hover:text-[#4a6b3e] transition-colors duration-300 tracking-tight">Eco-Crafted</h5>
                    <p className="text-[#6b3e21] text-sm leading-relaxed">Sustainably sourced materials that breathe life into your home naturally.</p>
                  </div>
                </div>

                {/* Bottom Small Card - Installation (Click-Lock Planks) */}
                <div className="group bg-[#fdfaf6] rounded-3xl p-6 flex-1 border border-[#8c5430]/10 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-center relative overflow-hidden">
                  {/* Planks Animation Background - Light Theme */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                    <div className="absolute top-2 -right-4 w-32 h-8 bg-gradient-to-r from-[#d4ba9f] to-[#f4ebd9] border border-[#8c5430]/10 rounded-sm transform rotate-[-15deg] group-hover:-translate-x-6 group-hover:rotate-0 transition-all duration-700 ease-in-out shadow-sm" />
                    <div className="absolute top-12 -right-8 w-32 h-8 bg-gradient-to-r from-[#f4ebd9] to-[#d4ba9f] border border-[#8c5430]/10 rounded-sm transform rotate-[-15deg] group-hover:-translate-x-10 group-hover:rotate-0 transition-all duration-700 ease-in-out delay-75 shadow-sm" />
                    <div className="absolute top-[88px] -right-12 w-32 h-8 bg-gradient-to-r from-[#e8d5c4] to-[#f4ebd9] border border-[#8c5430]/10 rounded-sm transform rotate-[-15deg] group-hover:-translate-x-14 group-hover:rotate-0 transition-all duration-700 ease-in-out delay-150 shadow-sm" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#f4ebd9] text-[#8c5430] flex items-center justify-center mb-4 shadow-inner border border-[#8c5430]/10 group-hover:scale-110 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                      </svg>
                    </div>
                    <h5 className="font-bold text-[#251208] text-xl mb-2 group-hover:text-[#8c5430] transition-colors duration-300 tracking-tight">Precision Fit</h5>
                    <p className="text-[#6b3e21] text-sm leading-relaxed">Flawless execution. Every plank perfectly aligned with master craftsmanship.</p>
                  </div>
                </div>
              </div>

              {/* 5. CTA / Process Card (Spans 1 col) */}
              <div className="bg-[#fbf5f0] rounded-[2rem] p-8 flex flex-col justify-between border border-[#8c5430]/10 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#8c5430]/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <h5 className="font-bold text-[#251208] text-2xl mb-4 leading-snug">Ready to transform your home?</h5>
                  <p className="text-[#6b3e21] text-sm mb-8 leading-relaxed">From expert consultation to final walkthrough, we're with you every step.</p>
                </div>
                <button className="relative z-10 flex items-center justify-between bg-[#251208] text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#8c5430] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group-hover:shadow-lg">
                  Get Started
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-white">
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
                <h3 className="text-5xl md:text-7xl font-bold text-[#251208] leading-tight tracking-normal" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                  Curated <br /> Collections
                </h3>
              </div>
              <p className="text-[#6b3e21] max-w-md text-lg font-medium">
                Discover our signature materials, ethically sourced and crafted to perfection. Find the foundation that speaks to your space.
              </p>
            </div>

            {/* Interactive Gallery */}
            <div className="flex flex-col gap-4 w-full">
              {/* Top Row */}
              <div className="flex flex-col lg:flex-row h-[500px] lg:h-[350px] gap-2 lg:gap-4 w-full">
                {[
                  { name: "European Oak", img: "european_oak.png", desc: "Timeless elegance with rich, warm undertones. Perfect for creating expansive, inviting living spaces." },
                  { name: "Spotted Gum", img: "spotted_gum.png", desc: "A rich mix of pale and dark brown hues with distinct wavy grain, offering a striking Australian aesthetic." },
                  { name: "Pewter Grey", img: "pewter_grey.png", desc: "Cool weathered greyish-brown oak with subtle grain, bringing a modern, sophisticated touch to any room." },
                ].map((item, index) => (
                  <div key={item.name} className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer">
                    <Image src={`/${item.img}`} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 p-4 lg:p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-[2px] bg-[#8c5430] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-300" />
                        <span className="text-[#fdf2e9] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">0{index + 1}</span>
                      </div>
                      <h4 className="text-lg md:text-xl lg:text-3xl font-bold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>{item.name}</h4>
                      <p className="text-white/80 text-xs lg:text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 hidden md:block h-10 lg:h-12">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col lg:flex-row h-[500px] lg:h-[350px] gap-2 lg:gap-4 w-full">
                {[
                  { name: "Mistral Oak", img: "mistral_oak.png", desc: "Pale blond ash-like wood with soft muted grain, creating a light, airy, and contemporary feel." },
                  { name: "Blackbutt", img: "blackbutt_new.png", desc: "Pale yellowish brown with straight even grain, providing a clean, bright, and durable surface." },
                  { name: "Pale Oak", img: "pale_oak_new.png", desc: "Very light whitish-beige wood with delicate grain, perfect for minimalist and Scandinavian-inspired interiors." },
                ].map((item, index) => (
                  <div key={item.name} className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer">
                    <Image src={`/${item.img}`} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 p-4 lg:p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-[2px] bg-[#8c5430] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-300" />
                        <span className="text-[#fdf2e9] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">0{index + 4}</span>
                      </div>
                      <h4 className="text-lg md:text-xl lg:text-3xl font-bold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>{item.name}</h4>
                      <p className="text-white/80 text-xs lg:text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 hidden md:block h-10 lg:h-12">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="w-full py-24 bg-[#fdfaf6] relative overflow-hidden flex flex-col items-center">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[url('/light-wood-texture.png')] opacity-10 mix-blend-multiply pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent opacity-50 pointer-events-none" />

          <div className="max-w-[1400px] w-full mx-auto px-8 md:px-12 lg:px-24 relative z-10 flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase drop-shadow-sm">Client Reviews</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold text-[#251208] mb-6 leading-tight" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
              Loved by <br className="md:hidden" /> Portland
            </h3>
            <p className="text-[#6b3e21] max-w-2xl text-lg font-medium">
              Don't just take our word for it. See what our community has to say about their newly transformed spaces.
            </p>
          </div>

          {/* Embed Container */}
          <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12 relative z-10 flex items-center justify-center">
            {/* This div is the target for the Google Reviews embed widget */}
            <div id="google-reviews-embed-container" className="w-full bg-white rounded-3xl shadow-xl border border-[#8c5430]/10 p-8 min-h-[300px] flex items-center justify-center">
              {/* Placeholder content until the widget loads */}
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d9b340" className="w-8 h-8">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#6b3e21] font-medium text-lg mb-2">Loading Google Reviews...</p>
                <p className="text-[#8c5430]/60 text-sm">Widget embed script will inject here.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Before & After */}
        <section className="w-full py-24 bg-[#fbf5f0] relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 bg-[url('/light-wood-texture.png')] opacity-20 mix-blend-multiply pointer-events-none" />

          <div className="max-w-[1200px] w-full px-8 md:px-12 flex flex-col items-center text-center mb-16 relative z-10">
            <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase drop-shadow-sm mb-4">The Transformation</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-[#251208] mb-6" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
              Seeing is Believing
            </h3>
            <p className="text-[#6b3e21] max-w-2xl text-lg font-medium">
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
              <Image src="/after-new.png" alt="After Renovation" fill className="object-cover" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">After</div>
            </div>

            {/* Before Image (Foreground, Clipped) */}
            <div className="absolute inset-0 w-full h-full border-r-[3px] border-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <Image src="/before-new.jpeg" alt="Before Renovation" fill className="object-cover grayscale-[20%]" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">Before</div>
            </div>

            {/* Slider Handle */}
            <div className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize flex items-center justify-center z-20 group"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}>
              <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transform -translate-x-1/2">
                {/* Pulse animation to indicate draggability */}
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-60" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#251208" className="w-6 h-6 relative z-10">
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
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                Experience The <br className="hidden md:block" /> Quality At Home
              </h3>
              <p className="text-[#fce8d5]/80 text-lg md:text-xl font-medium leading-relaxed">
                Not sure which finish matches your walls? Request a curated box of our 4 most popular premium flooring samples, delivered free to your door.
              </p>
            </div>

            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl relative z-10">
              <h4 className="text-xl font-bold text-[#251208] mb-6 text-center">Request Free Samples</h4>
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
        
        {/* FAQ Section */}
        <div className="bg-[#1a0d07] pt-12 pb-12 w-full relative z-20">
          <FAQ theme="dark" />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
