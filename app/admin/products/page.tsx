"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  price: string;
  is_active: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

const emptyProduct = {
  name: "",
  description: "",
  image_url: "",
  category: "Hybrid Flooring",
  price: "",
  is_active: true,
};

export default function AdminProducts() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("position");
    if (data) setProducts(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyProduct);
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description || "",
      image_url: product.image_url || "",
      category: product.category,
      price: product.price || "",
      is_active: product.is_active,
    });
    setImageFile(null);
    setImagePreview(product.image_url || null);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);

    try {
      let imageUrl = form.image_url;

      // Upload new image if selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      if (editing) {
        // Update
        const { error } = await supabase
          .from("products")
          .update({
            name: form.name.trim(),
            description: form.description.trim(),
            image_url: imageUrl,
            category: form.category,
            price: form.price.trim(),
            is_active: form.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editing.id);

        if (!error) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editing.id
                ? { ...p, name: form.name.trim(), description: form.description.trim(), image_url: imageUrl, category: form.category, price: form.price.trim(), is_active: form.is_active }
                : p
            )
          );
        }
      } else {
        // Insert
        const maxPos = Math.max(...products.map((p) => p.position), -1);
        const { data, error } = await supabase
          .from("products")
          .insert({
            name: form.name.trim(),
            description: form.description.trim(),
            image_url: imageUrl,
            category: form.category,
            price: form.price.trim(),
            is_active: form.is_active,
            position: maxPos + 1,
          })
          .select()
          .single();

        if (!error && data) {
          setProducts([...products, data]);
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving product. Make sure the 'product-images' storage bucket exists in Supabase.");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const toggleActive = async (product: Product) => {
    await supabase.from("products").update({ is_active: !product.is_active }).eq("id", product.id);
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_active: !p.is_active } : p)));
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

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
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} products in catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className={`bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden group transition-all hover:border-white/[0.12] ${!product.is_active ? "opacity-50" : ""}`}>
            {/* Image */}
            <div className="relative h-48 bg-[#0a0a0a] overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={product.image_url.startsWith("http")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
              )}
              {/* Active Badge */}
              {!product.is_active && (
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-500/20">
                  Inactive
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white/90 font-semibold text-sm">{product.name}</h3>
                  <p className="text-white/30 text-xs">{product.category}</p>
                </div>
                {product.price && (
                  <span className="text-[#d4a574] text-xs font-bold">{product.price}</span>
                )}
              </div>
              {product.description && (
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">{product.description}</p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                <button onClick={() => openEdit(product)} className="flex-1 py-2 text-xs font-bold text-white/40 hover:text-white/80 hover:bg-white/[0.04] rounded-lg transition-all uppercase tracking-wider">
                  Edit
                </button>
                <button onClick={() => toggleActive(product)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${product.is_active ? "text-amber-400/60 hover:text-amber-400 hover:bg-amber-500/10" : "text-emerald-400/60 hover:text-emerald-400 hover:bg-emerald-500/10"}`}>
                  {product.is_active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h3 className="text-white font-semibold text-lg">{editing ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Product Image</label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#0a0a0a] mb-2">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                      <button
                        onClick={() => { setImageFile(null); setImagePreview(null); setForm({ ...form, image_url: "" }); }}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg hover:bg-black/80 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/[0.08] rounded-xl cursor-pointer hover:border-[#8c5430]/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white/15 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                      <span className="text-white/25 text-xs font-medium">Click to upload image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. European Oak"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/40 transition-all text-white text-sm font-medium placeholder-white/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/40 transition-all text-white text-sm font-medium placeholder-white/20 resize-none"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/40 transition-all text-white text-sm font-medium placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Price</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. From $45/sqm"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/40 transition-all text-white text-sm font-medium placeholder-white/20"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm font-medium">Active on website</span>
                <button
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.is_active ? "bg-[#8c5430]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-white/[0.08] text-white/50 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/[0.04] transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name.trim()}
                  className="flex-1 py-3 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  {saving ? (uploading ? "Uploading..." : "Saving...") : editing ? "Update" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
