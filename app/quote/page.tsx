"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QuotePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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

      {/* Single Column Layout */}
      <section className="relative w-full min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
        
        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center bg-white p-8 md:p-12 lg:p-20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,18,8,0.05)] border border-[#8c5430]/10 relative overflow-hidden"
        >
          {/* Internal Soft Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#fce8d5]/50 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

          <div className="mb-16 text-center relative z-10">
            <span className="text-[#8c5430] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">// Project Specification</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#251208] mb-6 uppercase tracking-wider" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 900 }}>
              Request an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c5430] to-[#b56b3a]">Estimate</span>
            </h1>
            <p className="text-[#6b3e21] text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Define your vision. Provide the details below, and our master craftsmen will meticulously calculate a tailored proposal for your unique space.
            </p>
          </div>

          <form className="flex flex-col gap-10 w-full relative z-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Section 1: Contact Details */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4 border-b border-[#8c5430]/20 pb-4">
                <span className="w-8 h-8 rounded-full bg-[#fdfaf6] border border-[#8c5430]/20 flex items-center justify-center text-[#8c5430] font-bold text-sm shadow-sm">1</span>
                <h3 className="text-[#251208] font-bold tracking-widest uppercase text-sm">Contact Information</h3>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40" />
                </div>
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Phone Number</label>
                  <input type="tel" placeholder="+61 400 000 000" className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40" />
                </div>
              </div>
            </div>

            {/* Section 2: Project Details */}
            <div className="flex flex-col gap-8 mt-6">
              <div className="flex items-center gap-4 border-b border-[#8c5430]/20 pb-4">
                <span className="w-8 h-8 rounded-full bg-[#fdfaf6] border border-[#8c5430]/20 flex items-center justify-center text-[#8c5430] font-bold text-sm shadow-sm">2</span>
                <h3 className="text-[#251208] font-bold tracking-widest uppercase text-sm">Project Specification</h3>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-4">Project Type</label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <label className="flex-1 relative cursor-pointer group/radio">
                    <input type="radio" name="projectType" value="Residential" className="peer sr-only" defaultChecked />
                    <div className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl peer-checked:bg-[#8c5430]/10 peer-checked:border-[#8c5430] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430]/40 peer-checked:text-[#8c5430] transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      <span className="font-bold text-[#6b3e21] group-hover/radio:text-[#8c5430] peer-checked:text-[#8c5430] uppercase tracking-widest text-sm transition-colors">Residential</span>
                    </div>
                  </label>
                  <label className="flex-1 relative cursor-pointer group/radio">
                    <input type="radio" name="projectType" value="Commercial" className="peer sr-only" />
                    <div className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl peer-checked:bg-[#8c5430]/10 peer-checked:border-[#8c5430] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#8c5430]/40 peer-checked:text-[#8c5430] transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
                      <span className="font-bold text-[#6b3e21] group-hover/radio:text-[#8c5430] peer-checked:text-[#8c5430] uppercase tracking-widest text-sm transition-colors">Commercial</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Service Required</label>
                  <div className="relative">
                    <select className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] appearance-none cursor-pointer">
                      <option value="" disabled selected>Select service...</option>
                      <option value="New Installation">New Installation</option>
                      <option value="Restoration / Refinishing">Restoration / Refinishing</option>
                      <option value="Repairs">Repairs</option>
                      <option value="Waterproofing">Waterproofing & Coating</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#8c5430]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Material Preference</label>
                  <div className="relative">
                    <select className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] appearance-none cursor-pointer">
                      <option value="" disabled selected>Select material...</option>
                      <option value="Hardwood">Hardwood</option>
                      <option value="Engineered Wood">Engineered Wood</option>
                      <option value="Vinyl / LVT">Vinyl / LVT</option>
                      <option value="Laminate">Laminate</option>
                      <option value="Tile">Tile</option>
                      <option value="Epoxy">Epoxy</option>
                      <option value="Undecided">Undecided</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#8c5430]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Estimated Area</label>
                  <input type="text" placeholder="e.g. 150 sq meters" className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40" />
                </div>
                <div className="flex-1 group">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Project Timeline</label>
                  <div className="relative">
                    <select className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] appearance-none cursor-pointer">
                      <option value="" disabled selected>Select timeline...</option>
                      <option value="ASAP">As Soon As Possible</option>
                      <option value="1-3 Months">1 to 3 Months</option>
                      <option value="3-6 Months">3 to 6 Months</option>
                      <option value="Flexible">Flexible / Planning</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#8c5430]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3 transition-colors group-focus-within:text-[#b56b3a]">Additional Requirements</label>
                <textarea rows={5} placeholder="Describe existing flooring, access details, or specific design goals..." className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40 resize-none" />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#8c5430]/10">
              <button type="button" className="w-full relative overflow-hidden rounded-xl py-6 font-bold text-white uppercase tracking-[0.3em] shadow-[0_8px_30px_rgba(140,84,48,0.4)] hover:shadow-[0_12px_40px_rgba(140,84,48,0.6)] transition-all hover:-translate-y-1 active:translate-y-0 group">
                <div className="absolute inset-0 z-[-2] transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/wood-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#b56b3a]/90 to-[#6b3e21] mix-blend-multiply z-[-1]" />
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center gap-4 text-lg">
                  Submit Specification
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-2 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
              
              <p className="text-center text-[#6b3e21] text-xs font-medium uppercase tracking-widest mt-6 opacity-60">
                All submissions are strictly confidential. Free, no-obligation consultation.
              </p>
            </div>

          </form>

        </motion.div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
