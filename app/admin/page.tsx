"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({ visitors: 0, products: 0, inquiries: 0, quotes: 0 });
  const [noteContent, setNoteContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Fetch stats in parallel
      const [visitorsRes, productsRes, inquiriesRes, quotesRes, notesRes] = await Promise.all([
        supabase.from("page_views").select("visitor_id"),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("request_quotes").select("id", { count: "exact", head: true }),
        supabase.from("notes").select("*").order("created_at", { ascending: false }).limit(1),
      ]);

      // Count unique visitors
      const uniqueVisitors = new Set(visitorsRes.data?.map((v: { visitor_id: string }) => v.visitor_id) || []).size;

      setStats({
        visitors: uniqueVisitors,
        products: productsRes.count || 0,
        inquiries: inquiriesRes.count || 0,
        quotes: quotesRes.count || 0,
      });

      if (notesRes.data && notesRes.data.length > 0) {
        setNoteContent(notesRes.data[0].content);
        setNoteId(notesRes.data[0].id);
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced save for notes
  const saveNote = useCallback(async (content: string) => {
    setSaving(true);
    try {
      if (noteId) {
        await supabase.from("notes").update({ content, updated_at: new Date().toISOString() }).eq("id", noteId);
      } else {
        const { data } = await supabase.from("notes").insert({ content }).select().single();
        if (data) setNoteId(data.id);
      }
      setLastSaved(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setSaving(false);
    }
  }, [noteId, supabase]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (noteContent && !loading) {
        saveNote(noteContent);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [noteContent]);

  const statCards = [
    {
      label: "Unique Visitors",
      value: stats.visitors,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/10",
    },
    {
      label: "Total Products",
      value: stats.products,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
      color: "from-[#8c5430]/20 to-[#8c5430]/5",
      iconColor: "text-[#d4a574]",
      borderColor: "border-[#8c5430]/10",
    },
    {
      label: "Inquiries",
      value: stats.inquiries,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/10",
    },
    {
      label: "Quote Requests",
      value: stats.quotes,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your Portland Flooring business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className={`relative overflow-hidden bg-[#111111] border ${card.borderColor} rounded-2xl p-5`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} pointer-events-none`} />
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 ${card.iconColor}`}>
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{card.value.toLocaleString()}</p>
              <p className="text-white/40 text-xs font-medium tracking-wide uppercase">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8c5430]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#8c5430]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </div>
            <h2 className="text-white font-semibold">Notes</h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {saving ? (
              <span className="text-[#8c5430] flex items-center gap-1.5">
                <div className="w-3 h-3 border-[1.5px] border-[#8c5430]/30 border-t-[#8c5430] rounded-full animate-spin" />
                Saving...
              </span>
            ) : lastSaved ? (
              <span className="text-white/25">Saved at {lastSaved}</span>
            ) : null}
          </div>
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-48 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-white/80 text-sm leading-relaxed font-medium outline-none focus:border-[#8c5430]/30 focus:ring-1 focus:ring-[#8c5430]/20 transition-all resize-none placeholder-white/15"
        />
        <div className="flex items-center justify-between mt-3">
          <p className="text-white/20 text-xs">Also auto-saves as you type</p>
          <button
            onClick={() => saveNote(noteContent)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Save Notes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
