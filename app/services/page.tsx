"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Residential & Commercial",
      img: "/specialisms/residential_commercial.png",
      desc: "We offer comprehensive flooring services tailored perfectly for both cozy homes and demanding high-traffic commercial environments. From luxurious living rooms to high-performance office floors, we deliver excellence across the board.",
      features: ["Custom tailored for any space", "High traffic durability", "Seamless aesthetics"]
    },
    {
      title: "Design Consultation",
      img: "/specialisms/design_consultation.png",
      desc: "Our professional guidance helps you select the ideal materials, colors, and patterns that match your interior vision. We work closely with you to understand your lifestyle and aesthetic preferences before any physical work begins.",
      features: ["Expert material selection", "Color palette matching", "Lifestyle-focused design"]
    },
    {
      title: "Measurement & Estimation",
      img: "/specialisms/measurement_estimation.png",
      desc: "Precise on-site assessments utilizing cutting-edge laser technology. We provide accurate material quotes and ensure maximum efficiency to minimize waste and optimize your budget.",
      features: ["Laser-precise accuracy", "Transparent quoting", "Waste minimization"]
    },
    {
      title: "On-site Installation",
      img: "/specialisms/onsite_installation.png",
      desc: "Expert installation carried out by our highly skilled craftsmen directly at your location. We guarantee a seamless finish, adhering to the highest industry standards of quality and safety.",
      features: ["Master craftsmen", "Strict quality control", "Timely execution"]
    },
    {
      title: "Aftercare & Maintenance",
      img: "/specialisms/aftercare_maintenance.png",
      desc: "Our relationship doesn't end after installation. We provide dedicated support and specialized maintenance services to ensure your new floors remain pristine and durable for decades to come.",
      features: ["Specialized cleaning", "Longevity treatments", "Ongoing support"]
    },
    {
      title: "Waterproofing & Coating",
      img: "/specialisms/waterproofing_coating.png",
      desc: "Applying advanced, industrial-grade protective layers to safeguard your surfaces against moisture, harsh chemical spills, and heavy daily wear. Perfect for high-risk zones.",
      features: ["Industrial-grade sealants", "Moisture barrier tech", "Spill resistance"]
    },
    {
      title: "Re-flooring & Removal",
      img: "/specialisms/reflooring_removal.png",
      desc: "Careful, systematic extraction and responsible disposal of your old flooring. We meticulously prepare a perfectly clean and level subfloor, setting the stage for a flawless new installation.",
      features: ["Safe extraction", "Eco-friendly disposal", "Subfloor leveling"]
    }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fbf5f0]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
          <p className="text-[#8c5430] font-bold tracking-widest uppercase text-sm">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0]">
      {/* Navigation */}
      <Navbar isLoading={isLoading} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center bg-[#110804] overflow-hidden px-8 pt-24 pb-16">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/specialisms/design_consultation.png" alt="Hero Background" fill className="object-cover object-center grayscale mix-blend-overlay" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110804]/80 via-[#110804]/50 to-[#110804]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-wider drop-shadow-2xl mb-8" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c5430] to-[#b56b3a]">Services</span>
          </h1>
        </motion.div>
      </section>

      {/* Alternating Layout Section */}
      <section className="relative z-20 w-full bg-[#fbf5f0] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(37,18,8,0.1)]">
                    <div className="absolute inset-0 bg-[#8c5430]/10 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0" />
                    <Image 
                      src={service.img} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                  </div>
                  {/* Decorative Number */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-right-10' : '-left-10'} text-9xl font-black text-[#8c5430]/5 hidden lg:block select-none pointer-events-none font-mono tracking-tighter z-0 transition-transform duration-700 group-hover:scale-110 group-hover:text-[#8c5430]/10`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </motion.div>

                {/* Text Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full lg:w-1/2 flex flex-col justify-center z-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-px bg-[#8c5430]" />
                    <span className="text-[#8c5430] font-bold tracking-[0.2em] uppercase text-sm">Service {(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#251208] leading-tight mb-8" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
                    {service.title}
                  </h2>
                  <p className="text-lg text-[#6b3e21] leading-relaxed font-medium mb-10">
                    {service.desc}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#8c5430]/20 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#8c5430]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-[#251208] font-bold text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </section>

      {/* Outro CTA */}
      <section className="relative z-20 w-full">
        <div className="bg-gradient-to-br from-[#251208] to-[#110804] text-center px-8 py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/wood-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto relative z-10 flex flex-col items-center"
          >
            <h3 className="text-3xl md:text-5xl text-white font-black leading-tight mb-8" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
              Ready to transform your space? Let’s bring your vision to life.
            </h3>
            
            <Link href="/quote" className="relative mt-8 overflow-hidden rounded-xl px-12 py-5 font-bold text-white uppercase tracking-widest shadow-[0_8px_20px_rgba(140,84,48,0.4)] transition-all hover:-translate-y-1 active:translate-y-0 group">
              <div className="absolute inset-0 z-[-2] transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/wood-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#b56b3a]/90 to-[#6b3e21] mix-blend-multiply z-[-1]" />
              <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center gap-3">
                Get a Quote
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full pt-16 pb-8 bg-[#110804] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 text-center flex flex-col items-center">
           <p className="text-[#fce8d5]/40 text-sm font-medium">
             &copy; {new Date().getFullYear()} Portland Flooring. All rights reserved.
           </p>
        </div>
      </footer>
    </main>
  );
}
