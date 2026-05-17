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
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editAltText, setEditAltText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const loadImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) setImages(data);
    setLoading(false);
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (fileArray.length === 0) {
      setToast({ message: "No valid image files selected", type: "error" });
      return;
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

      // Update status to compressing
      setUploadQueue((prev) =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: "compressing" } : item
        )
      );

      try {
        // Update status to uploading
        setUploadQueue((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "uploading" } : item
          )
        );

        const formData = new FormData();
        formData.append("file", file);
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
    // Clear queue after a delay
    setTimeout(() => setUploadQueue([]), 3000);
  }, []);



  const handleDelete = async (image: GalleryImage) => {
    if (image.is_static) {
      setToast({ message: "Static images cannot be deleted", type: "error" });
      return;
    }

    if (!confirm("Are you sure you want to delete this image?")) return;

    // Delete from storage first
    if (image.file_path) {
      await supabase.storage.from("gallery-images").remove([image.file_path]);
    }

    // Delete from database
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

  const staticImages = images.filter((img) => img.is_static);
  const uploadedImages = images.filter((img) => !img.is_static);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="text-white/40 text-sm mt-1">
            {images.length} image{images.length !== 1 ? "s" : ""} total ·{" "}
            {staticImages.length} static · {uploadedImages.length} uploaded
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#8c5430]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
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



      {/* Upload Progress */}
      {uploadQueue.length > 0 && (
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Upload Progress</p>
          {uploadQueue.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-sm font-medium truncate">{item.fileName}</p>
              </div>
              {item.status === "compressing" && (
                <span className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                  <div className="w-3 h-3 border-[1.5px] border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  Compressing...
                </span>
              )}
              {item.status === "uploading" && (
                <span className="flex items-center gap-1.5 text-blue-400 text-xs font-medium">
                  <div className="w-3 h-3 border-[1.5px] border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                  Uploading...
                </span>
              )}
              {item.status === "done" && (
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Done {item.savedPercent ? `(${item.savedPercent}% smaller)` : ""}
                </span>
              )}
              {item.status === "error" && (
                <span className="text-red-400 text-xs font-medium truncate max-w-[200px]">
                  ✕ {item.error}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Images Section */}
      {uploadedImages.length > 0 && (
        <div>
          <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-4">
            Uploaded Images ({uploadedImages.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all"
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

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
                  <button
                    onClick={() => handleDelete(image)}
                    className="p-2.5 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-500/40 transition-colors"
                    title="Delete image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white/60 text-[10px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {new Date(image.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Static Images Section */}
      <div>
        <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-4">
          Original Images ({staticImages.length})
          <span className="text-white/15 ml-2 normal-case tracking-normal">These come bundled with the site</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {staticImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden"
            >
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Static Badge */}
              <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm text-white/50 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg">
                Static
              </div>

              {/* Edit overlay for alt text */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => openEdit(image)}
                  className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                  title="Edit alt text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Alt Text Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setEditingImage(null)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg">Edit Image</h3>

            {/* Preview */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.06]">
              <Image
                src={editingImage.image_url}
                alt={editingImage.alt_text}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>

            {/* Alt Text Input */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Alt Text</label>
              <input
                type="text"
                value={editAltText}
                onChange={(e) => setEditAltText(e.target.value)}
                placeholder="Describe this image..."
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingImage(null)}
                className="px-5 py-2.5 text-white/40 text-sm font-medium hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl border ${toast.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
