"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "../components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0] overflow-hidden">
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
        
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-1 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .stagger-2 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .stagger-3 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .stagger-4 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards; opacity: 0; }
      `}</style>

      {/* Global Background Texture (Light) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/light-wood-texture.png" alt="Texture" fill className="object-cover opacity-[0.15] mix-blend-multiply" />
      </div>

      {/* Hero / Header Section */}
      <section className="relative w-full pt-8 px-[9px] z-20">
        <div className="relative w-full rounded-[24px] h-[300px] md:h-[400px] overflow-hidden shadow-xl flex items-center justify-center">
          
          {/* Keep hero video/image dark enough for white text to pop, similar to homepage */}
          <Image src="/hero-var-2.jpg" alt="Contact Hero Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Hanging Navbar */}
          <Navbar isLoading={isLoading} />

          {/* Hero Title */}
          <div className="relative z-20 text-center mt-12">
            <h1 className="text-6xl md:text-8xl text-white tracking-widest leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] stagger-1 uppercase" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
              Let's Connect
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area (Bento Grid) */}
      <section className="relative z-20 w-full max-w-[1400px] mx-auto px-8 py-16 flex flex-col lg:flex-row gap-8" id="contact-form">
        
        {/* Left Side: Contact Cards (Bento) */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Main Info Card */}
          <div className="bg-white rounded-[2rem] p-10 relative overflow-hidden group stagger-2 shadow-xl border border-[#8c5430]/10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#fce8d5] rounded-full blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
            <h2 className="text-xs font-bold tracking-widest text-[#8c5430] uppercase mb-4">Direct Access</h2>
            <h3 className="text-4xl text-[#251208] mb-6 leading-tight" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
              Reach Out To Our Experts
            </h3>
            <p className="text-[#6b3e21] text-lg leading-relaxed font-medium">
              Whether you need to request a premium sample box, require a custom architectural quote, or simply want to explore our collections, our specialists are ready to guide you.
            </p>
          </div>

          {/* Grid of smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Showroom Card */}
            <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col justify-between stagger-3 hover:-translate-y-2 transition-all duration-500 group cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_12px_40px_rgba(140,84,48,0.1)] border border-white/60">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8c5430] to-[#6b3e21] flex items-center justify-center mb-6 transition-transform duration-500 border border-white/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_8px_16px_rgba(140,84,48,0.3)] relative overflow-hidden group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white transition-colors relative z-10 drop-shadow-sm">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#251208] mb-2 drop-shadow-sm">Showroom</h4>
                <p className="text-[#6b3e21] text-base leading-relaxed font-medium">2B Venture Way, Pakenham<br />VIC, Australia, Victoria</p>
              </div>
            </div>

            {/* Contact Details Column */}
            <div className="flex flex-col gap-6">
              {/* Phone Card */}
              <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-6 stagger-4 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(140,84,48,0.15)] transition-all duration-300 group cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_24px_rgba(140,84,48,0.08)] border border-white/60">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8c5430] to-[#6b3e21] flex items-center justify-center border border-white/80 group-hover:scale-110 transition-all duration-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(140,84,48,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white transition-colors relative z-10 drop-shadow-sm">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#251208] mb-1 drop-shadow-sm">Call Us</h4>
                  <p className="text-[#8c5430] font-medium text-base drop-shadow-sm">+61 420 608 608</p>
                </div>
              </div>
              
              {/* Email Card */}
              <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-6 stagger-4 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(140,84,48,0.15)] transition-all duration-300 group cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_24px_rgba(140,84,48,0.08)] border border-white/60" style={{ animationDelay: '0.8s' }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8c5430] to-[#6b3e21] flex items-center justify-center border border-white/80 group-hover:scale-110 transition-all duration-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_6px_12px_rgba(140,84,48,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white transition-colors relative z-10 drop-shadow-sm">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#251208] mb-1 drop-shadow-sm">Email Us</h4>
                  <p className="text-[#8c5430] font-medium text-base drop-shadow-sm">sales@portlands.com.au</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Side: Light Theme Form */}
        <div className="flex-1 stagger-3">
          <div className="bg-white rounded-[2rem] p-10 lg:p-14 h-full shadow-2xl relative overflow-hidden border border-[#8c5430]/10">
            
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#fce8d5]/40 to-transparent rounded-full blur-[60px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
            
            <div className="relative z-10">
              <h3 className="text-3xl text-[#251208] mb-2" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>Send an Inquiry</h3>
              <p className="text-[#6b3e21] font-medium text-sm mb-10">Fill out the form below and our design consultants will get back to you within 24 hours.</p>
              
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 group">
                    <label className="block text-xs font-bold tracking-widest text-[#8c5430] uppercase mb-2 group-focus-within:text-[#6b3e21] transition-colors">First Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                  </div>
                  <div className="flex-1 group">
                    <label className="block text-xs font-bold tracking-widest text-[#8c5430] uppercase mb-2 group-focus-within:text-[#6b3e21] transition-colors">Last Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold tracking-widest text-[#8c5430] uppercase mb-2 group-focus-within:text-[#6b3e21] transition-colors">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold tracking-widest text-[#8c5430] uppercase mb-2 group-focus-within:text-[#6b3e21] transition-colors">Project Details / Message</label>
                  <textarea rows={4} className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] resize-none" />
                </div>

                <button type="button" className="w-full relative overflow-hidden rounded-xl py-5 font-bold text-white uppercase tracking-widest shadow-md hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 mt-6 group">
                  <div className="absolute inset-0 z-[-2] transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/wood-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#b56b3a]/90 to-[#6b3e21] mix-blend-multiply z-[-1]" />
                  <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">
                    Submit Inquiry
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

      </section>

      {/* FAQ Section */}
      <FAQ theme="light" />

      {/* Google Map Section */}
      <section className="relative z-20 w-full px-8 pb-24">
        <div className="max-w-[1400px] mx-auto stagger-4" style={{ animationDelay: '1s' }}>
          <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#8c5430]/20 bg-white p-2">
            
            {/* Interactive Map Embed (Clean, un-filtered for light theme) */}
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.127433246288!2d145.4674721!3d-38.0441611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad61a5b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s2B%20Venture%20Way%2C%20Pakenham%20VIC%203810%2C%20Australia!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              
              {/* Overlay Location Card */}
              <div className="absolute bottom-8 left-8 bg-white/95 border border-[#8c5430]/20 p-6 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm">
                <h4 className="text-xl font-bold text-[#251208] mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8c5430]">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Portland Flooring
                </h4>
                <p className="text-[#6b3e21] font-medium text-sm mb-4 leading-relaxed">2B Venture Way<br/>Pakenham, VIC, Australia, Victoria</p>
                <a href="https://maps.google.com/?q=2B+Venture+Way,+Pakenham,+VIC,+Australia" target="_blank" rel="noreferrer" className="inline-block px-5 py-2.5 bg-[#8c5430] hover:bg-[#6b3e21] transition-colors text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md">
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
