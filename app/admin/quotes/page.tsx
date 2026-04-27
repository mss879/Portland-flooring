"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Quote {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  service_required: string;
  material_preference: string;
  estimated_area: string;
  project_timeline: string;
  additional_requirements: string;
  status: string;
  is_in_crm: boolean;
  created_at: string;
}

export default function AdminQuotes() {
  const supabase = createClient();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sendingToCrm, setSendingToCrm] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const { data } = await supabase
      .from("request_quotes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("request_quotes").update({ status }).eq("id", id);
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const sendToCRM = async (quote: Quote) => {
    setSendingToCrm(true);
    try {
      const { data: stages } = await supabase
        .from("pipeline_stages")
        .select("id")
        .eq("is_default", true)
        .single();

      if (!stages) {
        alert("Error: No default pipeline stage found.");
        return;
      }

      // Parse name into first/last
      const nameParts = quote.full_name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await supabase.from("crm_leads").insert({
        source_type: "quote",
        source_id: quote.id,
        first_name: firstName,
        last_name: lastName,
        email: quote.email,
        phone: quote.phone,
        project_type: quote.project_type,
        service_required: quote.service_required,
        material_preference: quote.material_preference,
        estimated_area: quote.estimated_area,
        project_timeline: quote.project_timeline,
        additional_requirements: quote.additional_requirements,
        stage_id: stages.id,
        position_in_stage: 0,
      });

      await supabase.from("request_quotes").update({ is_in_crm: true }).eq("id", quote.id);
      setQuotes((prev) => prev.map((q) => (q.id === quote.id ? { ...q, is_in_crm: true } : q)));
      if (selected?.id === quote.id) setSelected({ ...selected, is_in_crm: true });
    } catch (err) {
      console.error("Error sending to CRM:", err);
    } finally {
      setSendingToCrm(false);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;
    await supabase.from("request_quotes").delete().eq("id", id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/15 text-blue-400 border-blue-500/20";
      case "read": return "bg-amber-500/15 text-amber-400 border-amber-500/20";
      case "archived": return "bg-white/[0.06] text-white/40 border-white/[0.06]";
      default: return "bg-white/[0.06] text-white/40 border-white/[0.06]";
    }
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
      <div>
        <h1 className="text-2xl font-bold text-white">Request Quotes</h1>
        <p className="text-white/40 text-sm mt-1">Quote form submissions ({quotes.length} total)</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "new", "read", "archived"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              filter === f
                ? "bg-[#8c5430] text-white"
                : "bg-white/[0.04] text-white/40 hover:text-white/70 border border-white/[0.06]"
            }`}
          >
            {f} {f !== "all" && `(${quotes.filter((q) => q.status === f).length})`}
            {f === "all" && ` (${quotes.length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className="font-medium">No quote requests found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">Name</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase hidden md:table-cell">Service</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase hidden lg:table-cell">Type</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">CRM</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((quote) => (
                  <tr
                    key={quote.id}
                    onClick={() => { setSelected(quote); if (quote.status === "new") updateStatus(quote.id, "read"); }}
                    className={`border-b border-white/[0.03] cursor-pointer transition-colors hover:bg-white/[0.02] ${
                      selected?.id === quote.id ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {quote.status === "new" && <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                        <div>
                          <p className="text-white/90 text-sm font-medium">{quote.full_name}</p>
                          <p className="text-white/30 text-xs">{quote.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/50 text-sm hidden md:table-cell">{quote.service_required || "—"}</td>
                    <td className="px-5 py-4 text-white/40 text-xs hidden lg:table-cell">{quote.project_type || "—"}</td>
                    <td className="px-5 py-4 text-white/30 text-xs hidden lg:table-cell">
                      {new Date(quote.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {quote.is_in_crm && (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          In CRM
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-[420px] bg-[#111111] border border-white/[0.06] rounded-2xl p-6 shrink-0 hidden xl:block overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Quote Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-white/[0.06] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Full Name</p>
                <p className="text-white/90 font-medium">{selected.full_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Email</p>
                  <p className="text-white/70 text-sm">{selected.email || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Phone</p>
                  <p className="text-white/70 text-sm">{selected.phone}</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-4 space-y-3">
                <p className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">Project Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Type</p>
                    <p className="text-white/70 text-sm">{selected.project_type || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Service</p>
                    <p className="text-white/70 text-sm">{selected.service_required || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Material</p>
                    <p className="text-white/70 text-sm">{selected.material_preference || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Area</p>
                    <p className="text-white/70 text-sm">{selected.estimated_area || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Timeline</p>
                    <p className="text-white/70 text-sm">{selected.project_timeline || "—"}</p>
                  </div>
                </div>
                {selected.additional_requirements && (
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Requirements</p>
                    <p className="text-white/60 text-sm leading-relaxed">{selected.additional_requirements}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Submitted</p>
                <p className="text-white/50 text-sm">
                  {new Date(selected.created_at).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-5 space-y-3">
                {/* Status buttons */}
                <div className="flex gap-2">
                  {["new", "read", "archived"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        selected.status === s ? statusColor(s) : "border-white/[0.06] text-white/30 hover:text-white/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Send to CRM */}
                {!selected.is_in_crm ? (
                  <button
                    onClick={() => sendToCRM(selected)}
                    disabled={sendingToCrm}
                    className="w-full py-3 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    {sendingToCrm ? "Sending..." : "Send to CRM Pipeline"}
                  </button>
                ) : (
                  <div className="w-full py-3 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-xl text-center border border-emerald-500/20">
                    ✓ Already in CRM
                  </div>
                )}

                <button
                  onClick={() => deleteQuote(selected.id)}
                  className="w-full py-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-transparent hover:border-red-500/20"
                >
                  Delete Quote Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
