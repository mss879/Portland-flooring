"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const specialisms = [
    { title: "Flooring Installation", img: "/specialisms/installation.png", desc: "Masterful fitting of all flooring types with precision and care, ensuring a flawless foundation for your space." },
    { title: "Floor Restoration", img: "/specialisms/restoration.png", desc: "Reviving the natural beauty of aged or damaged floors, bringing back their original luster and extending their lifespan." },
    { title: "Vinyl Flooring", img: "/specialisms/vinyl.png", desc: "Providing high-quality, durable, and versatile vinyl options that beautifully mimic natural materials." },
    { title: "Wooden Flooring", img: "/specialisms/wooden.png", desc: "Installing timeless, elegant hardwood floors that add warmth, character, and significant value to any property." },
    { title: "Laminate Flooring", img: "/specialisms/laminate.png", desc: "Offering cost-effective, scratch-resistant laminate solutions without compromising on aesthetic appeal." },
    { title: "Epoxy Flooring", img: "/specialisms/epoxy.png", desc: "Creating seamless, high-performance, and extremely durable epoxy surfaces ideal for garages and commercial spaces." },
    { title: "Tile & Carpet", img: "/specialisms/tile_carpet.png", desc: "Expert laying of premium tiles and plush carpets to suit specific functional needs and design preferences." },
    { title: "Floor Polishing", img: "/specialisms/polishing.png", desc: "Utilizing advanced techniques to polish hard floors to a brilliant, mirror-like finish that enhances the entire room." },
    { title: "Floor Repairs", img: "/specialisms/repairs.png", desc: "Targeted, seamless repairs to fix scratches, dents, or water damage, restoring your floor's structural integrity." },
    { title: "Customized Solutions", img: "/specialisms/custom.png", desc: "Tailoring bespoke flooring designs and materials to meet unique architectural requirements and personal tastes." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0]">
      <style>{`
        @keyframes dropAndSwing {
          0% { transform: perspective(1000px) rotateX(-90deg); opacity: 0; animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          30% { transform: perspective(1000px) rotateX(35deg); opacity: 1; animation-timing-function: ease-in-out; }
          50% { transform: perspective(1000px) rotateX(-15deg); animation-timing-function: ease-in-out; }
          70% { transform: perspective(1000px) rotateX(8deg); animation-timing-function: ease-in-out; }
          85% { transform: perspective(1000px) rotateX(-3deg); animation-timing-function: ease-in-out; }
          100% { transform: perspective(1000px) rotateX(0deg); }
        }
        .animate-drop-swing {
          animation: dropAndSwing 1.8s forwards;
          transform-origin: 50% -32px;
        }
      `}</style>

      {/* Global Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/light-wood-texture.png" alt="Texture" fill className="object-cover opacity-[0.15] mix-blend-multiply" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-8 px-[9px] z-20">
        <div className="relative w-full rounded-[24px] h-[400px] md:h-[500px] overflow-hidden shadow-xl flex flex-col items-center justify-center">

          {/* Aesthetic Hero Background */}
          <Image src="/mistral_oak.png" alt="About Portland Flooring" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/50 z-10" />

          {/* Hanging Navbar */}
          <Navbar isLoading={isLoading} />

          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-20 text-center mt-12 px-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-widest leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] uppercase" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 900 }}>
              Crafting Elegance
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white/90 font-bold tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              One Floor at a Time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Intro Section */}
      <section className="relative z-20 w-full px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-1 bg-[#8c5430] mx-auto mb-10 rounded-full" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#251208] leading-tight mb-8 flex flex-wrap justify-center" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
            {"At Portland Flooring, we specialize in delivering premium flooring solutions tailored to every space, from modern homes to commercial interiors.".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-lg md:text-xl text-[#6b3e21] leading-relaxed font-medium">
            With a commitment to quality, design, and craftsmanship, our team ensures every floor we create reflects lasting elegance and durability. We believe your foundation sets the tone for your entire space, and we dedicate ourselves to perfecting that foundation.
          </p>
        </motion.div>
      </section>

      {/* Specialisms (Sticky 2-Column Layout) */}
      <section className="relative z-20 w-full bg-white border-y border-[#8c5430]/10">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row relative">

          {/* Left Column (Sticky) */}
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-8 py-20 md:px-12 lg:px-20 border-r border-[#8c5430]/10 bg-[#fbf5f0] z-10">
            <div className="flex flex-col gap-12 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-[#8c5430] text-2xl font-bold">//</span>
                <span className="text-[#251208] font-bold tracking-[0.2em] uppercase text-sm">Our Expertise</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#251208]" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 900 }}>
                Specialized Flooring<br />Solutions.
              </h2>
              <p className="text-lg md:text-xl text-[#6b3e21] leading-relaxed font-medium">
                We deliver a comprehensive range of premium flooring services. From masterful installations to bespoke designs, our expertise guarantees an exceptional finish for every space.
              </p>
            </div>
          </div>

          {/* Right Column (Scrolling Items) */}
          <div className="w-full lg:w-1/2 bg-white">
            <div className="flex flex-col">
              {specialisms.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group border-b border-[#8c5430]/10 p-8 md:p-10 lg:p-16 hover:bg-[#fdfaf6] transition-colors duration-500 min-h-[260px] flex flex-col justify-center gap-8"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-md border border-[#8c5430]/20 relative">
                      <Image src={spec.img} alt={spec.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <span className="text-[#8c5430]/30 text-3xl md:text-4xl font-bold font-mono tracking-tighter">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#251208] group-hover:text-[#8c5430] transition-colors duration-300" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                      {spec.title}
                    </h3>
                    <p className="text-[#6b3e21]/80 text-lg leading-relaxed max-w-lg font-medium">
                      {spec.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* Outro CTA / Trust Marker */}
      <section className="relative z-20 w-full">
        <div className="bg-gradient-to-br from-[#251208] to-[#110804] text-center px-8 py-24 md:py-32 relative overflow-hidden">
          {/* Subtle overlay texture */}
          <div className="absolute inset-0 bg-[url('/wood-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto relative z-10 flex flex-col items-center"
          >
            <h3 className="text-3xl md:text-5xl text-white font-black leading-tight mb-8" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 900 }}>
              Whether you’re upgrading your home or transforming your workspace, Portland Flooring delivers precision, beauty, and reliability.
            </h3>
            <p className="text-xl text-[#fce8d5]/80 font-bold tracking-widest uppercase mb-12 drop-shadow-sm">
              One floor at a time.
            </p>

            <Link href="/contact" className="relative overflow-hidden rounded-xl px-10 py-5 font-bold text-white uppercase tracking-widest shadow-[0_8px_20px_rgba(140,84,48,0.4)] transition-all hover:-translate-y-1 active:translate-y-0 group">
              <div className="absolute inset-0 z-[-2] transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/wood-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#b56b3a]/90 to-[#6b3e21] mix-blend-multiply z-[-1]" />
              <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center gap-3">
                Start Your Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
