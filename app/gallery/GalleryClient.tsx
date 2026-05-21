"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  FolderOpen, 
  ArrowRight,
  Maximize2,
  FolderClosed
} from "lucide-react";

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

interface GalleryClientProps {
  initialProjects: GalleryProject[];
  initialImages: GalleryImage[];
}

export default function GalleryClient({ initialProjects, initialImages }: GalleryClientProps) {
  const [projects] = useState<GalleryProject[]>(initialProjects);
  const [images] = useState<GalleryImage[]>(initialImages);
  
  // Navigation State
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Get active project details
  const activeProject = projects.find((p) => p.id === activeProjectId);
  
  // Filter images specifically for active project
  const activeProjectImages = images
    .filter((img) => img.project_id === activeProjectId)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < activeProjectImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : activeProjectImages.length - 1));
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    },
    [lightboxIndex, activeProjectImages]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : activeProjectImages.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < activeProjectImages.length - 1 ? prev + 1 : 0));
  };

  // Framer Motion staggered grid helpers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as any;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!activeProjectId ? (
          /* ========================================================
             1. FOLDERS GRID VIEW
             ======================================================== */
          <motion.div
            key="folders-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full py-16 px-4 md:px-8 max-w-[1600px] mx-auto"
          >
            <div className="text-center mb-16 space-y-4">
              <span className="text-[10px] font-bold text-[#8c5430] uppercase tracking-[0.3em]">
                Explore Collections
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a0d07] tracking-tight uppercase" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                Our Gallery Folders
              </h2>
              <div className="w-16 h-[2px] bg-[#8c5430]/30 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mt-8">
              {projects.map((project) => {
                const projectImages = images.filter((img) => img.project_id === project.id);
                const coverImage = projectImages[0];

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    className="group relative cursor-pointer pt-6"
                  >
                    {/* CSS Folder Tab */}
                    <div className="absolute top-0 left-6 h-6 w-28 bg-[#fdfaf6] border-t border-x border-[#8c5430]/15 rounded-t-xl flex items-center justify-center shadow-[0_-2px_6px_rgba(140,84,48,0.02)] z-0">
                      <span className="text-[8px] font-bold text-[#8c5430]/50 tracking-[0.15em] uppercase flex items-center gap-1">
                        <FolderClosed className="w-2.5 h-2.5 text-[#d4a574]" />
                        Project
                      </span>
                    </div>

                    {/* Folder Body Card */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl rounded-tl-none border border-[#8c5430]/15 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_45px_rgba(140,84,48,0.09)] group-hover:border-[#8c5430]/35 transition-all duration-500 flex flex-col justify-end z-10">
                      
                      {/* Skeuomorphic Rising Image Preview Container */}
                      <div className="absolute inset-x-4 top-4 bottom-20 rounded-xl overflow-hidden bg-stone-50 border border-stone-200/40">
                        {coverImage ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={coverImage.is_static ? `/Gallery/${coverImage.image_url.split("/").pop()}` : coverImage.image_url}
                              alt={project.name}
                              fill
                              className="object-cover transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-3"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
                            />
                            <div className="absolute inset-0 bg-[#1a0d07]/5 group-hover:bg-transparent transition-colors duration-500" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 text-stone-300">
                            <FolderOpen className="w-10 h-10 stroke-[1.25] text-stone-300/80" />
                            <span className="text-[9px] font-bold tracking-widest uppercase mt-2 text-stone-400">Empty Collection</span>
                          </div>
                        )}
                      </div>

                      {/* Front Pocket Card Sleeve */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-white/95 backdrop-blur-md border-t border-[#8c5430]/10 p-4 flex items-center justify-between z-20">
                        <div className="min-w-0 pr-2">
                          <h3 className="text-[#1a0d07] font-bold text-sm md:text-base leading-tight truncate group-hover:text-[#8c5430] transition-colors duration-300">
                            {project.name}
                          </h3>
                          <span className="text-[10px] text-[#8c5430]/65 font-bold tracking-wider uppercase block mt-1">
                            {projectImages.length} Installation{projectImages.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#8c5430]/5 border border-[#8c5430]/15 flex items-center justify-center shrink-0 group-hover:bg-[#8c5430] group-hover:border-[#8c5430] group-hover:scale-105 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-[#8c5430] group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             2. PROJECT DETAILED EXPANDED VIEW
             ======================================================== */
          <motion.div
            key="folder-details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full py-12 px-4 md:px-8 max-w-[1600px] mx-auto space-y-10"
          >
            {/* Breadcrumb Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#8c5430]/10 pb-8">
              <div className="space-y-3">
                <button
                  onClick={() => setActiveProjectId(null)}
                  className="inline-flex items-center gap-2 text-[#8c5430]/75 hover:text-[#8c5430] text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Collections
                </button>
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-7 h-7 text-[#d4a574] shrink-0" />
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1a0d07] tracking-tight uppercase" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                    {activeProject?.name}
                  </h1>
                </div>
              </div>

              {/* Folder Capacity Indicator Meter */}
              <div className="bg-white border border-[#8c5430]/15 rounded-2xl p-4 flex flex-col justify-center min-w-[200px] shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-stone-400">Folder Capacity</span>
                  <span className="text-[#8c5430]">{activeProjectImages.length} / 10 Images</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#d4a574] to-[#8c5430] rounded-full transition-all duration-500" 
                    style={{ width: `${(activeProjectImages.length / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Empty Folder State */}
            {activeProjectImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 border border-dashed border-[#8c5430]/20 bg-white rounded-3xl text-center space-y-4">
                <FolderOpen className="w-16 h-16 text-stone-200 animate-pulse" />
                <div>
                  <h3 className="text-stone-700 font-bold text-lg">No installations yet</h3>
                  <p className="text-stone-400 text-xs mt-1">This project portfolio exists but hasn't uploaded showcases.</p>
                </div>
                <button
                  onClick={() => setActiveProjectId(null)}
                  className="px-6 py-2.5 border border-[#8c5430]/20 hover:border-[#8c5430] text-[#8c5430] text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  Return to Folders
                </button>
              </div>
            ) : (
              /* Staggered Masonry/Grid */
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {activeProjectImages.map((image, idx) => {
                  const src = image.is_static
                    ? `/Gallery/${image.image_url.split("/").pop()}`
                    : image.image_url;

                  return (
                    <motion.div
                      key={image.id}
                      variants={itemVariants}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-[#8c5430]/10 bg-white aspect-[4/3]"
                    >
                      <Image
                        src={src}
                        alt={image.alt_text}
                        fill
                        className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      
                      {/* Premium Backdrop Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold tracking-widest uppercase text-xs border border-white/50 px-5 py-2.5 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                          View Fullscreen
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
         3. LIGHTBOX / CAROUSEL MODAL
         ======================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && activeProjectImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Lightbox Top Bar Controls */}
            <div className="flex items-center justify-between w-full text-white z-10">
              <span className="text-[10px] font-bold tracking-widest font-mono uppercase bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                {activeProject?.name}
              </span>
              <span className="text-xs font-bold font-mono text-white/50">
                {lightboxIndex + 1} / {activeProjectImages.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/10 transition-all text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Mid Viewport with Arrow Navs */}
            <div className="flex-1 flex items-center justify-between relative w-full max-h-[80vh] my-auto">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 p-3 rounded-full bg-black/45 hover:bg-black/75 border border-white/10 text-white z-10 transition-all hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Main Image Slider Viewport */}
              <div 
                className="relative w-full h-full max-w-[1200px] mx-auto flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={
                        activeProjectImages[lightboxIndex].is_static
                          ? `/Gallery/${activeProjectImages[lightboxIndex].image_url.split("/").pop()}`
                          : activeProjectImages[lightboxIndex].image_url
                      }
                      alt={activeProjectImages[lightboxIndex].alt_text}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 p-3 rounded-full bg-black/45 hover:bg-black/75 border border-white/10 text-white z-10 transition-all hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>

            </div>

            {/* Lightbox Bottom Info Bar */}
            <div className="w-full max-w-[900px] mx-auto text-center p-4 z-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
              <p className="text-white/90 text-sm font-semibold tracking-wide leading-relaxed">
                {activeProjectImages[lightboxIndex].alt_text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
