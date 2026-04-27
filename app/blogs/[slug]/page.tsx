import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostData, getSortedPostsData } from '@/lib/blogs';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Portland Flooring`,
    description: `Read about ${post.seo_keyword} on the Portland Flooring design blog.`,
    keywords: post.seo_keyword,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0] overflow-hidden selection:bg-[#8c5430]/20 selection:text-[#251208]">
      {/* Global Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/light-wood-texture.png" alt="Texture" fill className="object-cover opacity-[0.15] mix-blend-multiply" />
      </div>

      {/* Hanging Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar isLoading={false} />
      </div>

      {/* Article Header (Hero) */}
      <article className="relative z-20 w-full max-w-[1000px] mx-auto mt-40 px-8 flex flex-col items-center animate-drop-swing">
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-bold tracking-[0.3em] text-[#8c5430] uppercase">
            {new Date(post.date).toLocaleDateString('en-AU', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#8c5430]/40" />
          <span className="text-xs font-bold tracking-[0.3em] text-[#8c5430] uppercase">
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-center text-[#251208] mb-12 leading-[1.1] tracking-tight" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
          {post.title}
        </h1>

        {/* Hero Image */}
        {post.image && (
          <div className="w-full relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl mb-16 border border-[#8c5430]/10">
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 1000px) 100vw, 1000px" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
      </article>

      {/* Article Content */}
      <section className="relative z-20 w-full max-w-[800px] mx-auto px-8 pb-32">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl border border-[#8c5430]/10">
          
          {/* Custom Markdown Styles to emulate premium typography without plugin */}
          <div className="
            text-[#4a2810] text-lg leading-relaxed font-medium
            
            [&>h1]:hidden
            
            [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-bold [&>h2]:text-[#251208] [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h2]:border-b [&>h2]:border-[#8c5430]/10 [&>h2]:pb-4
            
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#251208] [&>h3]:mt-10 [&>h3]:mb-4
            
            [&>p]:mb-6 [&>p]:text-[#6b3e21]
            
            [&>ul]:mb-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-3 [&>ul>li]:text-[#6b3e21]
            [&>ol]:mb-8 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-3 [&>ol>li]:text-[#6b3e21]
            
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#8c5430] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-[#8c5430] [&>blockquote]:bg-[#8c5430]/5 [&>blockquote]:py-4 [&>blockquote]:rounded-r-xl [&>blockquote]:mb-8
            
            [&>hr]:my-12 [&>hr]:border-t-2 [&>hr]:border-[#8c5430]/10
            
            [&>table]:w-full [&>table]:mb-8 [&>table]:border-collapse
            [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:bg-[#fbf5f0] [&>table>thead>tr>th]:p-4 [&>table>thead>tr>th]:text-[#251208] [&>table>thead>tr>th]:font-bold
            [&>table>tbody>tr>td]:p-4 [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-[#8c5430]/10 [&>table>tbody>tr>td]:text-[#6b3e21]
            
            [&_a]:text-[#8c5430] [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#6b3e21]
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-16 text-center">
          <Link href="/blogs" className="inline-flex items-center gap-3 text-sm font-bold tracking-widest text-[#8c5430] uppercase hover:text-[#251208] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
