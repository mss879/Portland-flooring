"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Products() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-[#faf6f3]">
        <style>{`
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
        <section className="relative w-full h-[40vh] min-h-[300px] flex flex-col justify-center items-center bg-[#110804] overflow-hidden px-8">
          <div className="absolute inset-0 z-0 opacity-40">
             <Image src="/mistral_oak.png" alt="Products Hero" fill className="object-cover object-center" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#110804] via-[#110804]/80 to-[#110804]/30" />
          </div>
          
          <div className={`relative z-10 text-center flex flex-col items-center gap-4 ${isLoaded ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider leading-tight drop-shadow-lg" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
              Our Products
            </h1>
          </div>
        </section>

        {/* Gallery / Our Materials Section */}
        <section className="py-24 px-8 md:px-12 lg:px-24 bg-[#fdfaf6]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:items-center text-center gap-4 mb-16">
              <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">Our Materials</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#251208] leading-tight" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
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
                      <h4 className="text-lg md:text-xl lg:text-3xl font-bold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>{item.name}</h4>
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
                      <h4 className="text-lg md:text-xl lg:text-3xl font-bold text-white mb-2 leading-tight whitespace-nowrap" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
