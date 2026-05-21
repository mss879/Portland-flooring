import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Portland Flooring",
  description: "Explore our portfolio of premium hybrid flooring transformations organized by installation projects.",
  alternates: {
    canonical: "https://www.portlands.com.au/gallery",
  },
};

// Static fallback images in case Supabase hasn't been seeded yet
const staticImages = [
  "img-1.webp",
  "img-2.webp",
  "img-3.webp",
  "img-4.webp",
  "img-5.webp",
  "img-6.webp",
  "img-7.webp",
  "img-8.webp",
];

const galleryAlts = [
  "Premium hybrid flooring installation in a modern living room by Portland Flooring",
  "European Oak flooring transformation in an open-plan kitchen",
  "Spotted Gum hybrid flooring installed in a Melbourne residential home",
  "Seamless hybrid flooring across a contemporary dining and living area",
  "Blackbutt hybrid flooring installation in a Pakenham residential project",
  "Pale Oak hybrid flooring in a minimalist bedroom design",
  "Pewter Grey flooring installation for a modern commercial office space",
  "Mistral Oak hybrid flooring in a contemporary Australian home"
];

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  is_static: boolean;
  sort_order: number;
  project_id: string | null;
  created_at?: string;
}

interface GalleryProject {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at?: string;
}

export default async function GalleryPage() {
  let galleryProjects: GalleryProject[] = [];
  let galleryImages: GalleryImage[] = [];

  try {
    const supabase = await createServerSupabaseClient();
    
    // Fetch projects and images in parallel for optimized performance (LCP/INP)
    const [projectsRes, imagesRes] = await Promise.all([
      supabase
        .from("gallery_projects")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })
    ]);

    if (projectsRes.data && projectsRes.data.length > 0) {
      galleryProjects = projectsRes.data;
    }
    if (imagesRes.data && imagesRes.data.length > 0) {
      galleryImages = imagesRes.data;
    }
  } catch (error) {
    console.error("Error loading gallery data from Supabase:", error);
  }

  // --- ROBUST FALLBACK HANDLING ---
  
  // 1. If no projects exist in the database, establish a default signature collection folder
  if (galleryProjects.length === 0) {
    galleryProjects = [
      {
        id: "signature-collection",
        name: "Signature Collection",
        slug: "signature-collection",
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ];
  }

  // 2. If no images exist in the database, populate the default collection with premium static images
  if (galleryImages.length === 0) {
    galleryImages = staticImages.map((img, idx) => ({
      id: `static-${idx}`,
      image_url: `/Gallery/${img}`,
      alt_text: galleryAlts[idx] || `Portland Flooring premium hybrid installation project ${idx + 1}`,
      is_static: true,
      sort_order: idx,
      project_id: "signature-collection",
      created_at: new Date().toISOString(),
    }));
  } else {
    // 3. Map any pre-existing database images with NULL project_id to the first active folder project
    const defaultProjId = galleryProjects[0].id;
    galleryImages = galleryImages.map((img) => ({
      ...img,
      project_id: img.project_id || defaultProjId,
    }));
  }

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-[#fdfaf6]">
        <Navbar isLoading={false} />
        
        {/* Aesthetic Premium Hero Section */}
        <section className="relative w-full p-0 md:p-[9px] z-20">
          <div className="relative w-full rounded-none md:rounded-[24px] h-[350px] md:h-[450px] overflow-hidden shadow-2xl flex flex-col items-center justify-center">
            
            {/* Background Texture & Overlay */}
            <div className="absolute inset-0 bg-[#1a0d07]">
              <div className="absolute inset-0 bg-[url('/wood-texture.webp')] opacity-20 mix-blend-overlay animate-pulse duration-10000" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/55 z-10" />

            {/* Hero Text Content */}
            <div className="relative z-20 text-center mt-8 px-4 space-y-4">
              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-widest leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] uppercase" 
                style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}
              >
                Our Gallery
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#d4a574] font-bold tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto">
                Explore our projects of premium hybrid flooring transformations
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Gallery Client Component */}
        <section className="w-full relative z-30 -mt-8 md:-mt-12">
          <div className="max-w-[1600px] mx-auto bg-[#fdfaf6] rounded-[32px] shadow-sm relative p-4 md:p-8">
            <GalleryClient initialProjects={galleryProjects} initialImages={galleryImages} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

