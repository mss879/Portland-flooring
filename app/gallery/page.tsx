import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Gallery | Portland Flooring",
  description: "Explore our portfolio of premium hybrid flooring transformations.",
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

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  is_static: boolean;
  sort_order: number;
}

export default async function GalleryPage() {
  let galleryImages: GalleryImage[] = [];

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("id, image_url, alt_text, is_static, sort_order")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      galleryImages = data;
    }
  } catch {
    // If Supabase table doesn't exist yet, fall back gracefully
  }

  // If no DB images, use the hardcoded static images as fallback
  const hasDbImages = galleryImages.length > 0;

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-[#fdfaf6]">
        <Navbar isLoading={false} />
        
        {/* Hero Section */}
        <section className="relative w-full p-0 md:p-[9px] z-20">
          <div className="relative w-full rounded-none md:rounded-[24px] h-[400px] md:h-[500px] overflow-hidden shadow-2xl flex flex-col items-center justify-center">
            
            {/* Aesthetic Hero Background */}
            <div className="absolute inset-0 bg-[#1a0d07]">
              <div className="absolute inset-0 bg-[url('/wood-texture.webp')] opacity-20 mix-blend-overlay" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/50 z-10" />

            {/* Hero Title */}
            <div className="relative z-20 text-center mt-12 px-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-widest leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] uppercase" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                Our Gallery
              </h1>
              <p className="mt-4 text-sm md:text-lg text-white/90 font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Recent Premium Flooring Installations
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full py-24 px-4 md:px-8 lg:px-12 relative">
          <div className="max-w-[1600px] mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {hasDbImages ? (
              // Render from Supabase data
              galleryImages.map((image) => {
                // Static images use local paths, uploaded images use full Supabase URLs
                const src = image.is_static
                  ? `/Gallery/${image.image_url.split("/").pop()}`
                  : image.image_url;

                return (
                  <div key={image.id} className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-md cursor-pointer border border-[#8c5430]/10">
                    <div className="relative w-full aspect-auto h-auto bg-white">
                      <Image
                        src={src}
                        alt={image.alt_text}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold tracking-widest uppercase text-sm border border-white/50 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg">View Details</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback: render static images if DB is empty
              staticImages.map((img, i) => {
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
                return (
                <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-md cursor-pointer border border-[#8c5430]/10">
                  <div className="relative w-full aspect-auto h-auto bg-white">
                    <Image
                      src={`/Gallery/${img}`}
                      alt={galleryAlts[i] || `Portland Flooring premium hybrid installation project ${i + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold tracking-widest uppercase text-sm border border-white/50 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg">View Details</span>
                    </div>
                  </div>
                </div>
                );
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
