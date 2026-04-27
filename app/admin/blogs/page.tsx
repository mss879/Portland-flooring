"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string;
  seo_keyword: string;
  author: string;
  cover_image: string | null;
  content: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export default function AdminBlogs() {
  const supabase = createClient();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formKeyword, setFormKeyword] = useState("");
  const [formAuthor, setFormAuthor] = useState("Portland Flooring");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"draft" | "published">("published");

  useEffect(() => {
    loadBlogs();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const loadBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setBlogs(data);
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingBlog) {
      setFormSlug(generateSlug(val));
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormSlug("");
    setFormKeyword("");
    setFormAuthor("Portland Flooring");
    setFormContent("");
    setFormCoverImage(null);
    setFormStatus("published");
    setEditingBlog(null);
  };

  const openNewPost = () => {
    resetForm();
    setView("editor");
  };

  const openEditPost = (blog: Blog) => {
    setEditingBlog(blog);
    setFormTitle(blog.title);
    setFormSlug(blog.slug);
    setFormKeyword(blog.seo_keyword || "");
    setFormAuthor(blog.author);
    setFormContent(blog.content);
    setFormCoverImage(blog.cover_image);
    setFormStatus(blog.status);
    setView("editor");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      setToast({ message: "Image upload failed: " + error.message, type: "error" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    setFormCoverImage(urlData.publicUrl);
    setUploading(false);
    setToast({ message: "Image uploaded successfully", type: "success" });
  };

  const handleSave = async () => {
    if (!formTitle.trim() || !formContent.trim()) {
      setToast({ message: "Title and content are required", type: "error" });
      return;
    }

    setSaving(true);
    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || generateSlug(formTitle),
      seo_keyword: formKeyword.trim(),
      author: formAuthor.trim(),
      content: formContent,
      cover_image: formCoverImage,
      status: formStatus,
      updated_at: new Date().toISOString(),
    };

    if (editingBlog) {
      const { error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", editingBlog.id);

      if (error) {
        setToast({ message: "Failed to update: " + error.message, type: "error" });
      } else {
        setToast({ message: "Blog post updated successfully", type: "success" });
      }
    } else {
      const { error } = await supabase.from("blogs").insert(payload);

      if (error) {
        setToast({ message: "Failed to create: " + error.message, type: "error" });
      } else {
        setToast({ message: "Blog post created successfully", type: "success" });
      }
    }

    setSaving(false);
    await loadBlogs();
    setView("list");
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) {
      setToast({ message: "Blog post deleted", type: "success" });
      await loadBlogs();
    }
  };

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    await supabase.from("blogs").update({ status: newStatus }).eq("id", blog.id);
    await loadBlogs();
  };

  // ─── LIST VIEW ───
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
      </div>
    );
  }

  if (view === "editor") {
    return (
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => { setView("list"); resetForm(); }} className="p-2 rounded-xl hover:bg-white/[0.06] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white/50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white">
              {editingBlog ? "Edit Post" : "New Post"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value as "draft" | "published")}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white/70 text-sm outline-none focus:border-[#8c5430]/40 transition-colors appearance-none cursor-pointer"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              ) : (
                <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> {editingBlog ? "Update" : "Publish"}</>
              )}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your blog post title..."
                className="w-full px-5 py-4 bg-[#111111] border border-white/[0.08] rounded-xl text-white text-lg font-semibold outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Content (Markdown)</label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Write your blog post in Markdown..."
                rows={24}
                className="w-full px-5 py-4 bg-[#111111] border border-white/[0.08] rounded-xl text-white/80 text-sm leading-relaxed font-mono outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15 resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Slug</label>
              <input
                type="text"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className="w-full px-4 py-3 bg-[#111111] border border-white/[0.08] rounded-xl text-white/70 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">SEO Keyword</label>
              <input
                type="text"
                value={formKeyword}
                onChange={(e) => setFormKeyword(e.target.value)}
                placeholder="primary target keyword"
                className="w-full px-4 py-3 bg-[#111111] border border-white/[0.08] rounded-xl text-white/70 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Author</label>
              <input
                type="text"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-[#111111] border border-white/[0.08] rounded-xl text-white/70 text-sm outline-none focus:border-[#8c5430]/40 transition-colors placeholder-white/15"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Cover Image</label>
              {formCoverImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.08] mb-3">
                  <Image src={formCoverImage} alt="Cover" fill className="object-cover" sizes="300px" />
                  <button
                    onClick={() => setFormCoverImage(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-lg flex items-center justify-center hover:bg-red-500/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : null}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.04] border border-dashed border-white/[0.12] rounded-xl text-white/40 text-sm font-medium hover:bg-white/[0.06] hover:text-white/60 transition-all disabled:opacity-40"
              >
                {uploading ? (
                  <><div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" /> Uploading...</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg> Upload Image</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl border ${toast.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  // ─── LIST VIEW ───
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/40 text-sm mt-1">{blogs.length} post{blogs.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={openNewPost}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#8c5430]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Post
        </button>
      </div>

      {/* Table */}
      {blogs.length === 0 ? (
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white/20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
          </div>
          <p className="text-white/40 text-sm font-medium mb-1">No blog posts yet</p>
          <p className="text-white/20 text-xs">Click &quot;New Post&quot; to create your first article.</p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase">Title</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase hidden lg:table-cell">Keyword</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase hidden md:table-cell">Date</th>
                <th className="text-right px-5 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white/25 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {blog.cover_image && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 border border-white/[0.06]">
                          <Image src={blog.cover_image} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{blog.title}</p>
                        <p className="text-white/25 text-xs truncate">/blogs/{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-white/40 text-xs font-medium">{blog.seo_keyword || "—"}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <button
                      onClick={() => toggleStatus(blog)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                        blog.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${blog.status === "published" ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {blog.status}
                    </button>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-white/30 text-xs">
                      {new Date(blog.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditPost(blog)}
                        className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors group"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/30 group-hover:text-white/70">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/30 group-hover:text-red-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
