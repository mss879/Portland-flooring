"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase";

interface Stage {
  id: string;
  name: string;
  color: string;
  position: number;
  is_default: boolean;
}

interface Lead {
  id: string;
  source_type: string;
  source_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  project_type: string;
  service_required: string;
  material_preference: string;
  estimated_area: string;
  project_timeline: string;
  additional_requirements: string;
  stage_id: string;
  position_in_stage: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export default function AdminCRM() {
  const supabase = createClient();
  const [stages, setStages] = useState<Stage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showStageModal, setShowStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [stageName, setStageName] = useState("");
  const [stageColor, setStageColor] = useState("#8c5430");
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);
  const [leadNotes, setLeadNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [stagesRes, leadsRes] = await Promise.all([
      supabase.from("pipeline_stages").select("*").order("position"),
      supabase.from("crm_leads").select("*").order("position_in_stage"),
    ]);

    if (stagesRes.data) setStages(stagesRes.data);
    if (leadsRes.data) setLeads(leadsRes.data);
    setLoading(false);
  };

  // Stage management
  const addStage = async () => {
    if (!stageName.trim()) return;
    const maxPos = Math.max(...stages.map((s) => s.position), -1);
    const { data } = await supabase
      .from("pipeline_stages")
      .insert({ name: stageName.trim(), color: stageColor, position: maxPos + 1 })
      .select()
      .single();

    if (data) setStages([...stages, data]);
    setStageName("");
    setStageColor("#8c5430");
    setShowStageModal(false);
  };

  const updateStage = async () => {
    if (!editingStage || !stageName.trim()) return;
    await supabase
      .from("pipeline_stages")
      .update({ name: stageName.trim(), color: stageColor })
      .eq("id", editingStage.id);

    setStages((prev) =>
      prev.map((s) => (s.id === editingStage.id ? { ...s, name: stageName.trim(), color: stageColor } : s))
    );
    setEditingStage(null);
    setStageName("");
    setStageColor("#8c5430");
    setShowStageModal(false);
  };

  const deleteStage = async (stage: Stage) => {
    if (stage.is_default) return;
    const stageLeads = leads.filter((l) => l.stage_id === stage.id);
    if (stageLeads.length > 0) {
      if (!confirm(`This stage has ${stageLeads.length} lead(s). They will be moved to "New Leads". Continue?`)) return;
      const defaultStage = stages.find((s) => s.is_default);
      if (defaultStage) {
        await supabase.from("crm_leads").update({ stage_id: defaultStage.id }).eq("stage_id", stage.id);
        setLeads((prev) => prev.map((l) => (l.stage_id === stage.id ? { ...l, stage_id: defaultStage.id } : l)));
      }
    } else {
      if (!confirm(`Delete stage "${stage.name}"?`)) return;
    }
    await supabase.from("pipeline_stages").delete().eq("id", stage.id);
    setStages((prev) => prev.filter((s) => s.id !== stage.id));
  };

  // Drag and drop
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStageId(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStageId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStageId(null);

    if (!draggedLeadId) return;
    const lead = leads.find((l) => l.id === draggedLeadId);
    if (!lead || lead.stage_id === targetStageId) {
      setDraggedLeadId(null);
      return;
    }

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) =>
        l.id === draggedLeadId ? { ...l, stage_id: targetStageId, updated_at: new Date().toISOString() } : l
      )
    );

    await supabase
      .from("crm_leads")
      .update({ stage_id: targetStageId, updated_at: new Date().toISOString() })
      .eq("id", draggedLeadId);

    setDraggedLeadId(null);
  };

  // Lead notes
  const saveLeadNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    await supabase.from("crm_leads").update({ notes: leadNotes, updated_at: new Date().toISOString() }).eq("id", selectedLead.id);
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l)));
    setSavingNotes(false);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Remove this lead from CRM?")) return;
    await supabase.from("crm_leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedLead(null);
  };

  const stageColors = ["#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#22c55e", "#ef4444", "#8c5430", "#06b6d4", "#84cc16"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8c5430]/20 border-t-[#8c5430] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Pipeline</h1>
          <p className="text-white/40 text-sm mt-1">{leads.length} leads across {stages.length} stages</p>
        </div>
        <button
          onClick={() => { setEditingStage(null); setStageName(""); setStageColor("#8c5430"); setShowStageModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Stage
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {stages.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage_id === stage.id);
            const isDropTarget = dragOverStageId === stage.id;
            return (
              <div
                key={stage.id}
                className={`w-[300px] flex flex-col bg-[#111111] border rounded-2xl shrink-0 transition-all duration-200 ${
                  isDropTarget ? "border-[#8c5430]/50 shadow-lg shadow-[#8c5430]/10" : "border-white/[0.06]"
                }`}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {/* Stage Header */}
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <h3 className="text-white/90 text-sm font-semibold">{stage.name}</h3>
                    <span className="text-white/25 text-xs font-medium">({stageLeads.length})</span>
                  </div>
                  {!stage.is_default && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditingStage(stage); setStageName(stage.name); setStageColor(stage.color); setShowStageModal(true); }}
                        className="p-1 rounded hover:bg-white/[0.06] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white/30 hover:text-white/60">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button onClick={() => deleteStage(stage)} className="p-1 rounded hover:bg-red-500/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white/30 hover:text-red-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {stage.is_default && (
                    <span className="text-[9px] font-bold tracking-wider text-white/20 uppercase">Default</span>
                  )}
                </div>

                {/* Lead Cards */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onDragEnd={() => setDraggedLeadId(null)}
                      onClick={() => { setSelectedLead(lead); setLeadNotes(lead.notes || ""); }}
                      className={`bg-[#0a0a0a] border border-white/[0.06] rounded-xl p-3.5 cursor-grab active:cursor-grabbing hover:border-white/[0.12] transition-all group ${
                        draggedLeadId === lead.id ? "opacity-40" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white/90 text-sm font-medium">{lead.first_name} {lead.last_name || ""}</p>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          lead.source_type === "inquiry" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                        }`}>
                          {lead.source_type === "inquiry" ? "INQ" : "QTE"}
                        </span>
                      </div>
                      {lead.phone && (
                        <p className="text-white/30 text-xs mb-1">{lead.phone}</p>
                      )}
                      <p className="text-white/20 text-[10px]">
                        {new Date(lead.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className={`flex items-center justify-center py-8 text-white/15 text-xs font-medium border-2 border-dashed rounded-xl transition-colors ${
                      isDropTarget ? "border-[#8c5430]/30 text-[#8c5430]/40" : "border-white/[0.04]"
                    }`}>
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h3 className="text-white font-semibold text-lg">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">First Name</p>
                  <p className="text-white/90 text-sm">{selectedLead.first_name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Last Name</p>
                  <p className="text-white/90 text-sm">{selectedLead.last_name || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Email</p>
                  <p className="text-white/70 text-sm">{selectedLead.email || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Phone</p>
                  <p className="text-white/70 text-sm">{selectedLead.phone || "—"}</p>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Message</p>
                  <p className="text-white/60 text-sm leading-relaxed">{selectedLead.message}</p>
                </div>
              )}

              {selectedLead.source_type === "quote" && (
                <div className="border-t border-white/[0.06] pt-4 space-y-3">
                  <p className="text-xs font-bold tracking-widest text-[#8c5430] uppercase">Quote Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedLead.project_type && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Project Type</p>
                        <p className="text-white/70 text-sm">{selectedLead.project_type}</p>
                      </div>
                    )}
                    {selectedLead.service_required && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Service</p>
                        <p className="text-white/70 text-sm">{selectedLead.service_required}</p>
                      </div>
                    )}
                    {selectedLead.material_preference && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Material</p>
                        <p className="text-white/70 text-sm">{selectedLead.material_preference}</p>
                      </div>
                    )}
                    {selectedLead.estimated_area && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Area</p>
                        <p className="text-white/70 text-sm">{selectedLead.estimated_area}</p>
                      </div>
                    )}
                    {selectedLead.project_timeline && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Timeline</p>
                        <p className="text-white/70 text-sm">{selectedLead.project_timeline}</p>
                      </div>
                    )}
                  </div>
                  {selectedLead.additional_requirements && (
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-0.5">Requirements</p>
                      <p className="text-white/60 text-sm leading-relaxed">{selectedLead.additional_requirements}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Notes</p>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  className="w-full h-24 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-white/80 text-sm outline-none focus:border-[#8c5430]/30 transition-all resize-none placeholder-white/15"
                />
                <button
                  onClick={saveLeadNotes}
                  disabled={savingNotes}
                  className="mt-2 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/60 text-xs font-bold uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>

              {/* Move to stage */}
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Move to Stage</p>
                <div className="flex flex-wrap gap-2">
                  {stages.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={async () => {
                        await supabase.from("crm_leads").update({ stage_id: stage.id, updated_at: new Date().toISOString() }).eq("id", selectedLead.id);
                        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, stage_id: stage.id } : l)));
                        setSelectedLead({ ...selectedLead, stage_id: stage.id });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        selectedLead.stage_id === stage.id
                          ? "border-white/20 text-white"
                          : "border-white/[0.06] text-white/40 hover:text-white/70"
                      }`}
                      style={selectedLead.stage_id === stage.id ? { backgroundColor: stage.color + "20", borderColor: stage.color + "40" } : {}}
                    >
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="w-full py-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-transparent hover:border-red-500/20"
              >
                Remove from CRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage Modal */}
      {showStageModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowStageModal(false)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-semibold text-lg mb-6">{editingStage ? "Edit Stage" : "Add New Stage"}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Stage Name</label>
                <input
                  type="text"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  placeholder="e.g. Proposal Sent"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/40 transition-all text-white text-sm font-medium placeholder-white/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {stageColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setStageColor(color)}
                      className={`w-8 h-8 rounded-lg transition-all ${stageColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#111111] scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowStageModal(false)} className="flex-1 py-3 border border-white/[0.08] text-white/50 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/[0.04] transition-all">
                  Cancel
                </button>
                <button
                  onClick={editingStage ? updateStage : addStage}
                  className="flex-1 py-3 bg-[#8c5430] hover:bg-[#a0653d] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  {editingStage ? "Update" : "Add Stage"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
