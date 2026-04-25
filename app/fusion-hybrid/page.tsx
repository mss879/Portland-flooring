"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FusionHybrid() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-[#faf6f3]">
        <style>{`
        @font-face {
          font-family: 'Signwood';
          src: url('/Signwood-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @keyframes slideInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        `}</style>

        {/* Global Navigation */}
        <Navbar isLoading={!isLoaded} />

        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] flex flex-col justify-center items-center bg-[#110804] overflow-hidden px-8">
          <div className="absolute inset-0 z-0 opacity-40">
             <Image src="/fusion-hero.png" alt="Fusion Hybrid Flooring" fill className="object-cover object-bottom" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#110804] via-[#110804]/80 to-[#110804]/30" />
          </div>
          

          <div className={`relative z-10 text-center flex flex-col items-center gap-4 ${isLoaded ? 'animate-slide-in-up' : 'opacity-0'}`}>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wider leading-tight drop-shadow-lg" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 700 }}>
              Fusion Hybrid
            </h1>
          </div>
        </section>

        {/* Features (Eco-Friendly, etc.) */}
        <section className="relative w-full -mt-16 z-20 px-8 md:px-12 lg:px-24 mb-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-[2rem] p-10 flex flex-col justify-start shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/10 hover:-translate-y-2">
              {/* Soft warm glow that shifts on hover */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[#fdf2e9] to-transparent rounded-full blur-3xl opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-1000 ease-out pointer-events-none" />
              {/* Shine Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-70 group-hover:translate-x-[150%] -translate-x-[150%] transition-all duration-[1.5s] ease-in-out transform scale-150 rotate-45 pointer-events-none z-20" />

              <div className="relative z-10 w-16 h-16 bg-[#fbf5f0] border border-[#8c5430]/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                <svg className="w-8 h-8 text-[#8c5430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              
              <h3 className="relative z-10 text-3xl font-black text-[#251208] mb-4 tracking-wider group-hover:text-[#4a2810] transition-colors duration-500" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>Eco-Friendly</h3>
              <p className="relative z-10 text-[#6b3e21]/90 leading-relaxed font-medium">The Fusion Hybrid SPC Flooring product range does not contain heavy metals, phthalate, methanol or other harmful substances. It does no harm to the human body or the environment.</p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 flex flex-col justify-start shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/10 hover:-translate-y-2 delay-100">
              {/* Soft warm glow that shifts on hover */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[#fdf2e9] to-transparent rounded-full blur-3xl opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-1000 ease-out pointer-events-none" />
              {/* Shine Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-70 group-hover:translate-x-[150%] -translate-x-[150%] transition-all duration-[1.5s] ease-in-out transform scale-150 rotate-45 pointer-events-none z-20" />

              <div className="relative z-10 w-16 h-16 bg-[#fbf5f0] border border-[#8c5430]/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                <svg className="w-8 h-8 text-[#8c5430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
              </div>
              
              <h3 className="relative z-10 text-3xl font-black text-[#251208] mb-4 tracking-wider group-hover:text-[#4a2810] transition-colors duration-500" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>CE Certified</h3>
              <p className="relative z-10 text-[#6b3e21]/90 leading-relaxed font-medium">Fusion Hybrid SPC Flooring product range is CE certified, meeting requirements for safety, environmental protection, health and consumer protection. Quality assured.</p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 flex flex-col justify-start shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden group border border-[#8c5430]/10 hover:-translate-y-2 delay-200">
              {/* Soft warm glow that shifts on hover */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[#fdf2e9] to-transparent rounded-full blur-3xl opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-1000 ease-out pointer-events-none" />
              {/* Shine Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-70 group-hover:translate-x-[150%] -translate-x-[150%] transition-all duration-[1.5s] ease-in-out transform scale-150 rotate-45 pointer-events-none z-20" />

              <div className="relative z-10 w-16 h-16 bg-[#fbf5f0] border border-[#8c5430]/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                <svg className="w-8 h-8 text-[#8c5430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              </div>
              
              <h3 className="relative z-10 text-3xl font-black text-[#251208] mb-4 tracking-wider group-hover:text-[#4a2810] transition-colors duration-500" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>Floorscore Certified</h3>
              <p className="relative z-10 text-[#6b3e21]/90 leading-relaxed font-medium">Fusion Hybrid SPC floors are waterproof and stain resistant. It only requires regular vacuuming or sweeping and occasional mopping for a more intense clean.</p>
            </div>

          </div>
        </section>

        {/* Content Section 1 */}
        <section className="py-20 px-8 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">Fusion Hybrid</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#251208] leading-tight" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
                What is Hybrid Flooring and its Benefits?
              </h3>
              <p className="text-[#6b3e21] text-lg leading-relaxed font-medium">
                Hybrid flooring is the fastest growing flooring options in Australia whether it is to be used for homes or at commercial premises. The choice and options of Hybrid Timber flooring are immense and is also dictated by the market trends and practicality of use. As the name suggests hybrid, it demonstrates quite well about how it consists of several mixes of diverse elements that helps to make it exceptional from other types of flooring.
              </p>
            </div>
            <div className="flex-1 w-full relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/hybrid-benefits.png" alt="Hybrid Flooring Benefits" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Content Section 2 */}
        <section className="py-20 px-8 md:px-12 lg:px-24 bg-white">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl md:text-5xl font-black text-[#251208] leading-tight" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
                What are they made of?
              </h3>
              <p className="text-[#6b3e21] text-lg leading-relaxed font-medium">
                Hybrid flooring consists of waterproof resistance coating, which is innovatively designed to keep the floors in utmost superior quality for life. Hybrid flooring decor gives laminate finishing to create an improved floor that is not only durable from outside but provides clarity, exceptional protection from everyday wear with Acoustic Backing.
              </p>
              <p className="text-[#6b3e21] text-lg leading-relaxed font-medium">
                Our Hybrid Flooring range include Fusion Hybrid, Fusion Hybrid has the most stable and waterproof core of any flooring worldwide. A big claim which is justified by test results and the skillset of our engineers when directed to develop a waterproof, stable flooring to meet everyday needs of everyday consumers.
              </p>
            </div>
            <div className="flex-1 w-full relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/hybrid-materials.png" alt="Hybrid Flooring Materials" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* 3D Structure of Fusion Hybrid */}
        <section className="py-24 px-8 md:px-12 lg:px-24 bg-[#1a0d07] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-xs font-bold tracking-widest text-[#fce8d5] uppercase drop-shadow-sm">The Architecture</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold text-white" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 700 }}>
                The Structure of Fusion Hybrid
              </h3>
            </div>
            
            <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center">
              <Image src="/layer-img.jpg" alt="Hybrid Flooring Layers Architecture" width={1200} height={800} className="w-full h-auto object-cover" priority />
            </div>
          </div>
        </section>

        {/* Gallery / Our Materials Section */}
        <section className="py-24 px-8 md:px-12 lg:px-24 bg-[#fdfaf6]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:items-center text-center gap-4 mb-16">
              <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">Our Materials</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#251208] leading-tight" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
                Choose The Best Material For Your Floor
              </h3>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {/* Top Row */}
              <div className="flex flex-col lg:flex-row h-[500px] lg:h-[350px] gap-2 lg:gap-4 w-full">
                {[
                  { name: "European Oak", img: "european_oak.png" },
                  { name: "Spotted Gum", img: "spotted_gum.png" },
                  { name: "Pewter Grey", img: "pewter_grey.png" },
                ].map((item, index) => (
                  <div key={item.name} className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer shadow-lg border border-[#8c5430]/10">
                    <Image src={`/${item.img}`} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 p-4 lg:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-lg md:text-xl lg:text-3xl font-extrabold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 700 }}>{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col lg:flex-row h-[500px] lg:h-[350px] gap-2 lg:gap-4 w-full">
                {[
                  { name: "Mistral Oak", img: "mistral_oak.png" },
                  { name: "Blackbutt", img: "blackbutt_new.png" },
                  { name: "Pale Oak", img: "pale_oak_new.png" },
                ].map((item, index) => (
                  <div key={item.name} className="group relative flex-1 hover:flex-[2] lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer shadow-lg border border-[#8c5430]/10">
                    <Image src={`/${item.img}`} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 p-4 lg:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-lg md:text-xl lg:text-3xl font-extrabold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 700 }}>{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-8 md:px-12 lg:px-24 bg-white border-y border-[#8c5430]/10">
          <div className="max-w-[1400px] mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#251208] mb-6" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
              Hybrid flooring mimics the look and feel of real timber
            </h3>
            <p className="text-[#6b3e21] text-lg max-w-2xl mx-auto mb-16">
              Hybrid flooring, which is a combination of laminate and vinyl flooring with a timber look printed on it, has many benefits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#fbf5f0] flex items-center justify-center text-[#8c5430]">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                </div>
                <h4 className="text-2xl font-bold text-[#251208]">Kid Friendly</h4>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#fbf5f0] flex items-center justify-center text-[#8c5430]">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h4 className="text-2xl font-bold text-[#251208]">Pet Friendly</h4>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#fbf5f0] flex items-center justify-center text-[#8c5430]">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="text-2xl font-bold text-[#251208]">Waterproof (Oops!)</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hybrid Flooring Details */}
        <section className="py-24 px-8 md:px-12 lg:px-24 bg-[#faf6f3]">
          <div className="max-w-[1400px] mx-auto">
            <h3 className="text-4xl md:text-5xl font-black text-[#251208] text-center mb-16" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
              Why Hybrid flooring?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Water-Proof</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Fusion Hybrid flooring is 100% water proof and stands up to all spills and can be installed in wet areas such as bathrooms.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Low Maintenance</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Our surface coating technology ensures no need for additional surface treatments following installation.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Environmentally Conscious</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Being 100% physically, energetically and chemically recyclable or re-usable.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Acoustic Qualities</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Excellent noise reduction properties and does not require additional underlay. Industry leading, 6 Star rated.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Durable</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Fusion Hybrid boards are extremely hard wearing and have HIGH IMPACT RESISTANCE, unlike wood or stone, Fusion Hybrid does not splinter, warp or crack. Quick and Easy to Install over most existing hard floors with the Uniclic 2G click system.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Comfort</h4>
                  <p className="text-[#6b3e21] leading-relaxed">Softer and warmer under foot than natural wood or stone flooring. Additional cushioning in the backing helps make Fusion Hybrid extremely comfortable even to sensitive feet.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#251208] mb-2 uppercase tracking-wide">Pet Friendly</h4>
                  <p className="text-[#6b3e21] leading-relaxed">From muddy paws to 'accidents' - Fusion Hybrid repels anything your pet can throw at it, making life much easier to clean.</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* What to be aware of */}
        <section className="py-24 px-8 md:px-12 lg:px-24 bg-[#fbf5f0]">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl font-black text-[#251208] leading-tight" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
                What you should be aware of when considering hybrid flooring?
              </h3>
              <p className="text-[#6b3e21] text-lg leading-relaxed font-medium">
                Although Hybrid flooring is cheaper than Timber flooring, it is still expensive than Vinyl or Laminate flooring. UV sunlight fading or damage can occur and hence it is recommended to cover the windows so sunlight does not fall directly on to flooring. It is recommended to have protective pads fitted to all furniture and avoid dragging heavy furniture or equipment across flooring. Pets claws should be kept trimmed to avoid excessive scratching.
              </p>
            </div>
            <div className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-[#8c5430]/10">
              <Image src="/hybrid-care.png" alt="Considerations for Hybrid Flooring" fill className="object-cover" />
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
                <span className="text-2xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>PORTLAND</span>
              </div>
              <p className="text-[#fce8d5]/50 text-sm leading-relaxed font-medium">
                Elevating spaces with timeless craftsmanship and sustainable materials. Masterfully installed flooring that defines your home.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Collections</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">European Oak</Link></li>
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Luxury Vinyl</Link></li>
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Sustainable Bamboo</Link></li>
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Hybrid Hardwood</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Company</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Our Legacy</Link></li>
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Master Craftsmanship</Link></li>
                <li><Link href="#" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Sustainability</Link></li>
                <li><Link href="/contact" className="text-[#fce8d5]/60 hover:text-[#fdf2e9] text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-300">Contact Us</Link></li>
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
                  <span className="text-[#fce8d5]/60 text-sm leading-relaxed">2B Venture Way, Pakenham<br />VIC, Australia, Victoria</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430] shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span className="text-[#fce8d5]/60 text-sm">+61 420 608 608</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430] shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-[#fce8d5]/60 text-sm">sales@portlands.com.au</span>
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
              <Link href="#" className="text-[#fce8d5]/40 hover:text-[#8c5430] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-[#fce8d5]/40 hover:text-[#8c5430] transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
