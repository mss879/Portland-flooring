"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  is_in_crm: boolean;
  created_at: string;
}

export default function AdminInquiries() {
  const supabase = createClient();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sendingToCrm, setSendingToCrm] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setInquiries(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const sendToCRM = async (inquiry: Inquiry) => {
    setSendingToCrm(true);
    try {
      // Get the default "New Leads" stage
      const { data: stages } = await supabase
        .from("pipeline_stages")
        .select("id")
        .eq("is_default", true)
        .single();

      if (!stages) {
        alert("Error: No default pipeline stage found. Please set up CRM stages first.");
        return;
      }

      // Create CRM lead
      await supabase.from("crm_leads").insert({
        source_type: "inquiry",
        source_id: inquiry.id,
        first_name: inquiry.first_name,
        last_name: inquiry.last_name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        stage_id: stages.id,
        position_in_stage: 0,
      });

      // Mark inquiry as in CRM
      await supabase.from("inquiries").update({ is_in_crm: true }).eq("id", inquiry.id);
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? { ...i, is_in_crm: true } : i)));
      if (selected?.id === inquiry.id) setSelected({ ...selected, is_in_crm: true });
    } catch (err) {
      console.error("Error sending to CRM:", err);
    } finally {
      setSendingToCrm(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-white/40 text-sm mt-1">Contact form submissions ({inquiries.length} total)</p>
        </div>
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
            {f} {f !== "all" && `(${inquiries.filter((i) => i.status === f).length})`}
            {f === "all" && ` (${inquiries.length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <p className="font-medium">No inquiries found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">Name</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase hidden md:table-cell">Phone</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold tracking-widest text-white/30 uppercase">CRM</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    onClick={() => { setSelected(inquiry); if (inquiry.status === "new") updateStatus(inquiry.id, "read"); }}
                    className={`border-b border-white/[0.03] cursor-pointer transition-colors hover:bg-white/[0.02] ${
                      selected?.id === inquiry.id ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {inquiry.status === "new" && <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                        <div>
                          <p className="text-white/90 text-sm font-medium">{inquiry.first_name} {inquiry.last_name}</p>
                          <p className="text-white/30 text-xs">{inquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/50 text-sm hidden md:table-cell">{inquiry.phone}</td>
                    <td className="px-5 py-4 text-white/30 text-xs hidden lg:table-cell">
                      {new Date(inquiry.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {inquiry.is_in_crm && (
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
          <div className="w-[400px] bg-[#111111] border border-white/[0.06] rounded-2xl p-6 shrink-0 hidden xl:block">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Lead Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-white/[0.06] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Name</p>
                <p className="text-white/90 font-medium">{selected.first_name} {selected.last_name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Email</p>
                <p className="text-white/70 text-sm">{selected.email || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Phone</p>
                <p className="text-white/70 text-sm">{selected.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Message</p>
                <p className="text-white/60 text-sm leading-relaxed">{selected.message || "No message"}</p>
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

                {/* Delete */}
                <button
                  onClick={() => deleteInquiry(selected.id)}
                  className="w-full py-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-transparent hover:border-red-500/20"
                >
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
