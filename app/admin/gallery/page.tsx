"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Image from "next/image";

interface GalleryImage {
  id: string;
  image_url: string;
  file_path: string | null;
  alt_text: string;
  sort_order: number;
  is_static: boolean;
  project_id: string | null;
  created_at: string;
}

interface GalleryProject {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

interface UploadProgress {
  fileName: string;
  status: "compressing" | "uploading" | "done" | "error";
  savedPercent?: number;
  error?: string;
}

export default function AdminGallery() {
  const supabase = createClient();
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  
  // Modals / Creating State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);
  
  // Renaming State
  const [renamingProject, setRenamingProject] = useState<GalleryProject | null>(null);
  const [renameProjectName, setRenameProjectName] = useState("");
  
  // Image uploading
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  // Image editing
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editAltText, setEditAltText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadProjects(), loadImages()]);
    setLoading(false);
  };

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("gallery_projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) setProjects(data);
  };

  const loadImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) setImages(data);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setCreatingProject(true);
    const slug = newProjectName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Get current max sort_order
    const nextSortOrder = projects.length > 0 
      ? Math.max(...projects.map(p => p.sort_order)) + 1 
      : 1;

    const { data, error } = await supabase
      .from("gallery_projects")
      .insert({
        name: newProjectName.trim(),
        slug,
        sort_order: nextSortOrder
      })
      .select()
      .single();

    if (!error && data) {
      setToast({ message: `Project "${data.name}" created successfully`, type: "success" });
      setNewProjectName("");
      setShowCreateModal(false);
      await loadProjects();
    } else {
      setToast({ message: "Failed to create project: " + (error?.message || "Unknown error"), type: "error" });
    }
    setCreatingProject(false);
  };

  const handleRenameProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingProject || !renameProjectName.trim()) return;

    const slug = renameProjectName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const { error } = await supabase
      .from("gallery_projects")
      .update({
        name: renameProjectName.trim(),
        slug
      })
      .eq("id", renamingProject.id);

    if (!error) {
      setToast({ message: "Project renamed successfully", type: "success" });
      setRenamingProject(null);
      setRenameProjectName("");
      await loadProjects();
      
      // Update selected project instance if currently open
      if (selectedProject?.id === renamingProject.id) {
        setSelectedProject({
          ...selectedProject,
          name: renameProjectName.trim(),
          slug
        });
      }
    } else {
      setToast({ message: "Rename failed: " + error.message, type: "error" });
    }
  };

  const handleDeleteProject = async (project: GalleryProject) => {
    const projectImages = images.filter((img) => img.project_id === project.id);
    const imageCount = projectImages.length;

    const confirmMsg = imageCount > 0 
      ? `Are you sure you want to delete the project "${project.name}"? This will permanently delete the project and all ${imageCount} associated images from the database and storage.`
      : `Are you sure you want to delete the project "${project.name}"?`;

    if (!confirm(confirmMsg)) return;

    setLoading(true);

    // 1. Delete all images from Supabase Storage
    const filePaths = projectImages.map((img) => img.file_path).filter(Boolean) as string[];
    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage.from("gallery-images").remove(filePaths);
      if (storageError) {
        console.error("Storage clean up error during project deletion:", storageError);
      }
    }

    // 2. Delete project from DB (will cascade delete gallery_images rows due to ON DELETE CASCADE)
    const { error: dbError } = await supabase
      .from("gallery_projects")
      .delete()
      .eq("id", project.id);

    if (!dbError) {
      setToast({ message: `Project "${project.name}" deleted successfully`, type: "success" });
      if (selectedProject?.id === project.id) {
        setSelectedProject(null);
      }
      await Promise.all([loadProjects(), loadImages()]);
    } else {
      setToast({ message: "Failed to delete project: " + dbError.message, type: "error" });
    }

    setLoading(false);
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    if (!selectedProject) return;

    const currentImages = images.filter((img) => img.project_id === selectedProject.id);
    const availableSlots = 10 - currentImages.length;

    if (availableSlots <= 0) {
      setToast({ message: "This project has reached the 10 image limit.", type: "error" });
      return;
    }

    let fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    
    if (fileArray.length === 0) {
      setToast({ message: "No valid image files selected", type: "error" });
      return;
    }

    // Enforce 10 image limit
    if (fileArray.length > availableSlots) {
      setToast({ 
        message: `Only uploading first ${availableSlots} image${availableSlots !== 1 ? "s" : ""} to avoid exceeding the 10-image limit.`, 
        type: "error" 
      });
      fileArray = fileArray.slice(0, availableSlots);
    }

    setUploading(true);
    const queue: UploadProgress[] = fileArray.map((f) => ({
      fileName: f.name,
      status: "compressing" as const,
    }));
    setUploadQueue(queue);

    let successCount = 0;

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      setUploadQueue((prev) =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: "compressing" } : item
        )
      );

      try {
        setUploadQueue((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "uploading" } : item
          )
        );

        const formData = new FormData();
        formData.append("file", file);
        formData.append("project_id", selectedProject.id);
        formData.append("alt_text", `Gallery Image - ${file.name.replace(/\.[^.]+$/, "")}`);

        const response = await fetch("/api/gallery/compress", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Upload failed");
        }

        setUploadQueue((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: "done",
                  savedPercent: result.compression?.savedPercent || 0,
                }
              : item
          )
        );
        successCount++;
      } catch (err) {
        setUploadQueue((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: "error",
                  error: err instanceof Error ? err.message : "Upload failed",
                }
              : item
          )
        );
      }
    }

    if (successCount > 0) {
      setToast({
        message: `${successCount} image${successCount !== 1 ? "s" : ""} uploaded & compressed successfully`,
        type: "success",
      });
      await loadImages();
    }

    setUploading(false);
    setTimeout(() => setUploadQueue([]), 4000);
  }, [selectedProject, images]);

  const handleDeleteImage = async (image: GalleryImage) => {
    if (image.is_static) {
      setToast({ message: "Static images cannot be deleted", type: "error" });
      return;
    }

    if (!confirm("Are you sure you want to delete this image?")) return;

    // Delete from storage
    if (image.file_path) {
      await supabase.storage.from("gallery-images").remove([image.file_path]);
    }

    // Delete from DB
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", image.id);

    if (!error) {
      setToast({ message: "Image deleted successfully", type: "success" });
      await loadImages();
    } else {
      setToast({ message: "Failed to delete: " + error.message, type: "error" });
    }
  };

  const handleEditSave = async () => {
    if (!editingImage) return;

    const { error } = await supabase
      .from("gallery_images")
      .update({ alt_text: editAltText })
      .eq("id", editingImage.id);

    if (!error) {
      setToast({ message: "Alt text updated", type: "success" });
      setEditingImage(null);
      await loadImages();
    } else {
      setToast({ message: "Failed to update: " + error.message, type: "error" });
    }
  };

  const openEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setEditAltText(image.alt_text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
      </div>
    );
  }

  // --- RENDERING DETAIL VIEW (INSIDE A FOLDER) ---
  if (selectedProject) {
    const projectImages = images.filter((img) => img.project_id === selectedProject.id);
    const limitReached = projectImages.length >= 10;

    return (
      <div className="space-y-6">
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Collections
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8c5430]/10 flex items-center justify-center border border-[#8c5430]/30 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#d4a574]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h1.5A2.25 2.25 0 0 0 8.25 7.5h.5A2.25 2.25 0 0 1 11 9.75h1.5A2.25 2.25 0 0 0 14.75 7.5h.5A2.25 2.25 0 0 1 17.5 9.75h1.5A2.25 2.25 0 0 1 21.25 12v.75m-19 0v5.25A2.25 2.25 0 0 0 4.5 20.25h15a2.25 2.25 0 0 0 2.25-2.25v-5.25m-19 0h19" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white leading-tight">{selectedProject.name}</h1>
                <p className="text-white/40 text-xs mt-0.5">
                  Collection Slug: <span className="font-mono text-white/50">{selectedProject.slug}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-[#111111] border border-white/[0.06] rounded-xl px-4 py-2 flex items-center gap-3">
              <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Capacity</span>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-bold ${limitReached ? "text-red-400" : "text-[#d4a574]"}`}>
                  {projectImages.length}
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-white/30 text-xs font-semibold">10 images</span>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || limitReached}
              className={`flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg ${
                limitReached 
                  ? "bg-white/[0.04] text-white/20 border border-white/[0.06] cursor-not-allowed" 
                  : "bg-[#8c5430] hover:bg-[#a0653d] shadow-[#8c5430]/20"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Upload Images
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Limit Warning */}
        {limitReached && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            This project has reached its capacity limit of 10 images. Delete existing images to free up space.
          </div>
        )}

        {/* Upload Progress Queue */}
        {uploadQueue.length > 0 && (
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Upload Progress Queue</p>
            {uploadQueue.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-xs font-medium truncate">{item.fileName}</p>
                </div>
                {item.status === "compressing" && (
                  <span className="flex items-center gap-1.5 text-amber-400 text-[11px] font-medium">
                    <div className="w-3 h-3 border-[1.5px] border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                    Compressing...
                  </span>
                )}
                {item.status === "uploading" && (
                  <span className="flex items-center gap-1.5 text-blue-400 text-[11px] font-medium">
                    <div className="w-3 h-3 border-[1.5px] border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    Uploading...
                  </span>
                )}
                {item.status === "done" && (
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Done {item.savedPercent ? `(${item.savedPercent}% smaller)` : ""}
                  </span>
                )}
                {item.status === "error" && (
                  <span className="text-red-400 text-[11px] font-medium truncate max-w-[200px]">
                    ✕ {item.error}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Images Grid */}
        {projectImages.length > 0 ? (
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              Project Images ({projectImages.length})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {projectImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all"
                >
                  <Image
                    src={image.is_static ? `/Gallery/${image.image_url.split("/").pop()}` : image.image_url}
                    alt={image.alt_text}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  {/* Badges */}
                  {image.is_static && (
                    <div className="absolute top-2 left-2 bg-white/10 backdrop-blur-sm text-white/50 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-lg border border-white/[0.06]">
                      Static
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(image)}
                      className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                      title="Edit alt text"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                    {!image.is_static && (
                      <button
                        onClick={() => handleDeleteImage(image)}
                        className="p-2.5 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-500/40 transition-colors"
                        title="Delete image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white/60 text-[10px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {new Date(image.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 border border-dashed border-white/[0.06] rounded-2xl bg-[#111111]/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-white/10 mb-4 animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21ZM10.5 9.75a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
            </svg>
            <p className="text-white/50 text-sm font-medium">This project folder is empty</p>
            <p className="text-white/20 text-xs mt-1">Upload premium installations to build this project showcase (up to 10 images).</p>
          </div>
        )}

        {/* Modal for editing alt text */}
        {editingImage && renderEditAltModal()}

        {/* Toast */}
        {toast && renderToast()}
      </div>
    );
  }

  // --- RENDERING MAIN DIRECTORY (LIST OF FOLDER PROJECTS) ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Collections</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage image galleries categorized under beautiful project folders.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#8c5430]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          New Folder Project
        </button>
      </div>

      {/* Directory Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => {
            const projectImages = images.filter((img) => img.project_id === project.id);
            const coverImage = projectImages[0];

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer flex flex-col bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#8c5430]/40 transition-all duration-300 shadow-md"
              >
                {/* Visual Folder Cover/Thumbnail */}
                <div className="relative w-full aspect-[16/10] bg-white/[0.02] border-b border-white/[0.04] overflow-hidden shrink-0 flex items-center justify-center">
                  {coverImage ? (
                    <Image
                      src={coverImage.is_static ? `/Gallery/${coverImage.image_url.split("/").pop()}` : coverImage.image_url}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" />
                      </svg>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/20 mt-2">Empty Folder</span>
                    </div>
                  )}

                  {/* Image Count Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white px-2.5 py-1 rounded-lg border border-white/[0.08] flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#d4a574]">
                      <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-3.22 3.22a.75.75 0 0 1-1.06 0L5.78 9.78a.75.75 0 0 0-1.06 0l-2.22 2.22a.75.75 0 0 1-.22-.54v-.4Z" clipRule="evenodd" />
                    </svg>
                    {projectImages.length} <span className="text-white/40">/ 10</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#d4a574] transition-colors line-clamp-1">{project.name}</h3>
                    <p className="text-white/30 text-[10px] font-medium font-mono uppercase tracking-widest mt-1">/{project.slug}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                    <span className="text-[10px] text-[#d4a574]/80 font-bold uppercase tracking-widest flex items-center gap-1">
                      Explore Folder
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>

                    {/* Folder Quick CRUD Controls */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setRenamingProject(project);
                          setRenameProjectName(project.name);
                        }}
                        className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.1] transition-colors"
                        title="Rename Project"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white/50">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        title="Delete Project"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-red-400/80">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 border border-dashed border-white/[0.06] rounded-3xl bg-[#111111]/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-white/10 mb-4 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <p className="text-white/60 font-semibold text-base">No project folders found</p>
          <p className="text-white/30 text-xs mt-1 max-w-sm text-center">Create your first folder-based showcase project. Add a project name and start uploading installations.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-6 px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg"
          >
            Create Project Folder
          </button>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <h3 className="text-white font-bold text-lg">New Project Folder</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Spotted Gum Pakenham"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 text-white/40 text-xs font-semibold uppercase tracking-widest hover:text-white/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingProject || !newProjectName.trim()}
                  className="px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  {creatingProject ? "Creating..." : "Create Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENAME PROJECT MODAL */}
      {renamingProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setRenamingProject(null)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <h3 className="text-white font-bold text-lg">Rename Project</h3>
              <button onClick={() => setRenamingProject(null)} className="text-white/40 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <form onSubmit={handleRenameProject} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">New Name</label>
                <input
                  type="text"
                  required
                  value={renameProjectName}
                  onChange={(e) => setRenameProjectName(e.target.value)}
                  placeholder="e.g. Spotted Gum Pakenham"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 text-sm outline-none focus:border-[#8c5430]/40 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRenamingProject(null)}
                  className="px-5 py-2.5 text-white/40 text-xs font-semibold uppercase tracking-widest hover:text-white/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!renameProjectName.trim()}
                  className="px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && renderToast()}
    </div>
  );

  // --- SUB-RENDERERS ---
  function renderEditAltModal() {
    if (!editingImage) return null;
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setEditingImage(null)}>
        <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <h3 className="text-white font-bold text-base">Edit Alt Context</h3>
            <button onClick={() => setEditingImage(null)} className="text-white/40 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {/* Preview */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.06] bg-black/40">
            <Image
              src={editingImage.is_static ? `/Gallery/${editingImage.image_url.split("/").pop()}` : editingImage.image_url}
              alt={editingImage.alt_text}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>

          {/* Alt Text Input */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Alt Text Description</label>
            <input
              type="text"
              value={editAltText}
              onChange={(e) => setEditAltText(e.target.value)}
              placeholder="Describe the flooring style, wood texture..."
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setEditingImage(null)}
              className="px-5 py-2.5 text-white/40 text-xs font-semibold uppercase tracking-widest hover:text-white/70 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              className="px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderToast() {
    if (!toast) return null;
    return (
      <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-xs font-semibold shadow-2xl border flex items-center gap-2 ${
        toast.type === "success" 
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
          : "bg-red-500/10 border-red-500/20 text-red-400"
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${toast.type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
        {toast.message}
      </div>
    );
  }
}
