import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSortedPostsData } from '@/lib/blogs';

export const metadata = {
  title: 'Blog & Design Insights | Portland Flooring',
  description: 'Explore our latest articles, design trends, and expert tips on premium hybrid flooring for Australian homes.',
};

export default async function BlogsPage() {
  const allPostsData = await getSortedPostsData();

  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0] overflow-hidden">

      {/* Inline keyframes for the staggered card entrance */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Global Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/light-wood-texture.png" alt="Texture" fill sizes="100vw" className="object-cover opacity-[0.15] mix-blend-multiply" />
      </div>

      {/* Hero / Header Section */}
      <section className="relative w-full pt-8 px-[9px] z-20">
        <div className="relative w-full rounded-[24px] h-[300px] md:h-[400px] overflow-hidden shadow-xl flex items-center justify-center bg-[#251208]">
          {/* Use the wood texture as a reliable hero background */}
          <Image src="/wood-texture.png" alt="Blog Hero Background" fill sizes="100vw" className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

          {/* Hanging Navbar */}
          <Navbar isLoading={false} />

          {/* Hero Title */}
          <div className="relative z-20 text-center mt-12 animate-drop-swing" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl text-white tracking-widest leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] uppercase" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
              Design Insights
            </h1>
            <p className="text-[#fce8d5] mt-4 font-bold tracking-[0.2em] uppercase text-sm drop-shadow-md">
              Expert advice & flooring trends
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="relative z-20 w-full max-w-[1400px] mx-auto px-8 py-20 flex flex-col items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData.map((post, index) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-[#8c5430]/10 transform hover:-translate-y-2" style={{ animation: `slideUpFade 0.8s ease-out ${index * 0.1}s forwards`, opacity: 0 }}>
              
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden">
                {post.image ? (
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#8c5430]/10 flex items-center justify-center">
                    <span className="text-[#8c5430]/40 font-bold uppercase tracking-widest">Portland Flooring</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">
                    {new Date(post.date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="w-8 h-[2px] bg-[#8c5430]/20 group-hover:bg-[#8c5430] transition-colors duration-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-[#251208] mb-4 leading-snug group-hover:text-[#8c5430] transition-colors duration-300" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                  {post.title}
                </h2>
                
                <div className="mt-auto pt-6 flex items-center justify-between text-sm font-bold tracking-widest text-[#6b3e21] uppercase border-t border-[#8c5430]/10">
                  <span>Read Article</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-[#8c5430]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
