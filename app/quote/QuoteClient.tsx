"use client";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "../components/Toast";
import { createClient } from "@/lib/supabase";

export default function QuotePage() {
  const supabase = createClient();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Residential");
  const [serviceRequired, setServiceRequired] = useState("");
  const [materialPreference, setMaterialPreference] = useState("");
  const [estimatedArea, setEstimatedArea] = useState("");
  const [projectTimeline, setProjectTimeline] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Multi-step State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setToast({ message: "Please fill in your name and phone number.", type: "error" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("request_quotes").insert({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        project_type: projectType,
        service_required: serviceRequired || null,
        material_preference: materialPreference || null,
        estimated_area: estimatedArea.trim() || null,
        project_timeline: projectTimeline || null,
        additional_requirements: additionalRequirements.trim() || null,
      });

      if (error) throw error;

      // Send email notification via Resend endpoint (non-blocking, logged if error)
      try {
        await fetch("/api/send-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: "quote_request",
            name: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            projectType,
            serviceRequired,
            materialPreference,
            estimatedArea: estimatedArea.trim(),
            projectTimeline,
            additionalRequirements: additionalRequirements.trim(),
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send email notification for quote request:", emailErr);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting quote:", err);
      setToast({ message: "Something went wrong. Please try again or contact us directly.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <main className="flex flex-col min-h-screen w-full bg-[#fbf5f0]">
      {/* Navigation */}
      <Navbar isLoading={false} />

      {/* Split Layout */}
      <section className="relative w-full min-h-screen pt-36 md:pt-48 pb-24 px-0 md:px-[9px]">
        
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 md:gap-[9px]">
          
          {/* Left Panel - Brand & Context */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative rounded-none md:rounded-[24px] overflow-hidden shadow-2xl flex flex-col p-10 md:p-16"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
              <Image src="/mistral_oak.webp" alt="Portland Background" fill sizes="50vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-[#110804]/95 via-[#110804]/90 to-[#110804]" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <span className="text-[#b56b3a] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">{/* // */} Estimate</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-wider" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
                Request A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c5430] to-[#b56b3a]">Quote</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-md leading-relaxed mb-12">
                Define your vision. Provide the details below, and our master craftsmen will meticulously calculate a tailored proposal for your unique space.
              </p>

              {/* Contact Information Box */}
              <div className="mt-auto flex flex-col gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Direct Contact</h3>
                  <div className="flex flex-col gap-4">
                    <a href="tel:+61420608608" className="text-[#fce8d5] hover:text-white transition-colors flex items-center gap-3 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.974l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                      +61 420 608 608
                    </a>
                    <a href="mailto:info@portlands.com.au" className="text-[#fce8d5] hover:text-white transition-colors flex items-center gap-3 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      info@portlands.com.au
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Form Container */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full bg-white rounded-none md:rounded-[24px] shadow-2xl border border-[#8c5430]/10 relative flex flex-col overflow-hidden min-h-[600px]"
          >
            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full min-h-[500px]">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-24 h-24 bg-[#8c5430]/10 rounded-full flex items-center justify-center mb-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12 text-[#8c5430]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-[#251208] mb-4" 
                  style={{ fontFamily: "'Tomorrow', sans-serif" }}
                >
                  Form Submitted
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-[#6b3e21] text-lg max-w-md mb-8"
                >
                  Thank you, {fullName}! Our master craftsmen have received your details and will prepare a tailored proposal for your space shortly.
                </motion.p>
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  onClick={() => {
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setProjectType("Residential");
                    setServiceRequired("");
                    setMaterialPreference("");
                    setEstimatedArea("");
                    setProjectTimeline("");
                    setAdditionalRequirements("");
                    setCurrentStep(1);
                    setIsSubmitted(false);
                  }} 
                  className="px-8 py-4 font-bold text-[#8c5430] uppercase tracking-[0.2em] border-2 border-[#8c5430] hover:bg-[#8c5430] hover:text-white transition-colors rounded-xl"
                >
                  Submit Another
                </motion.button>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[#fbf5f0]">
                  <div 
                    className="h-full bg-[#8c5430] transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
                  />
                </div>

                {/* Form Inner Padding & Content */}
                <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col">
              
              {/* Back Button & Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {currentStep > 1 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-[#8c5430] font-bold text-sm tracking-widest uppercase hover:text-[#b56b3a] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    Back
                  </button>
                ) : (
                  <div /> // Spacer
                )}
                <span className="text-[#6b3e21]/40 font-bold text-sm tracking-widest uppercase">Step {currentStep} of {totalSteps}</span>
              </div>

              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Contact Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col flex-1"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#251208] mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>Let&apos;s get started</h2>
                      <p className="text-[#6b3e21] mb-8">Who are we preparing this estimate for?</p>
                      
                      <div className="flex flex-col gap-5 mt-auto mb-auto">
                        <div className="group">
                          <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-2">Full Name *</label>
                          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-5">
                          <div className="flex-1 group">
                            <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-2">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                          </div>
                          <div className="flex-1 group">
                            <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-2">Phone Number *</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 400 000 000" required className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208]" />
                          </div>
                        </div>
                      </div>

                      <button onClick={nextStep} disabled={!fullName.trim() || !phone.trim()} className="mt-8 w-full relative overflow-hidden rounded-xl py-5 font-bold text-white uppercase tracking-[0.2em] bg-[#8c5430] hover:bg-[#6b3e21] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        Continue
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: Project Type */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col flex-1"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#251208] mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>What type of project is this?</h2>
                      <p className="text-[#6b3e21] mb-8">Select the option that best describes your space.</p>
                      
                      <div className="flex flex-col gap-4 mt-auto mb-auto">
                        {['Residential', 'Commercial'].map((type) => (
                          <button
                            key={type}
                            onClick={() => { setProjectType(type); nextStep(); }}
                            className={`w-full flex items-center justify-between p-6 rounded-xl border-2 transition-all ${projectType === type ? 'border-[#8c5430] bg-[#8c5430]/5' : 'border-[#8c5430]/10 hover:border-[#8c5430]/30 bg-white hover:bg-[#fbf5f0]'}`}
                          >
                            <span className="font-bold text-xl text-[#251208]">{type}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${projectType === type ? 'border-[#8c5430] bg-[#8c5430]' : 'border-[#8c5430]/30'}`}>
                              {projectType === type && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Service Required */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col flex-1"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#251208] mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>What service do you require?</h2>
                      <p className="text-[#6b3e21] mb-8">Choose the primary service you&apos;re looking for.</p>
                      
                      <div className="flex flex-col gap-3 mt-auto mb-auto">
                        {['New Installation', 'Restoration / Refinishing', 'Repairs', 'Waterproofing & Coating', 'Other'].map((service) => (
                          <button
                            key={service}
                            onClick={() => { setServiceRequired(service); nextStep(); }}
                            className={`w-full flex items-center p-5 rounded-xl border-2 transition-all ${serviceRequired === service ? 'border-[#8c5430] bg-[#8c5430]/5 text-[#8c5430]' : 'border-[#8c5430]/10 hover:border-[#8c5430]/30 bg-white hover:bg-[#fbf5f0] text-[#4a2810]'}`}
                          >
                            <span className="font-bold text-lg">{service}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Material Preference */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col flex-1"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#251208] mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>Any material preferences?</h2>
                      <p className="text-[#6b3e21] mb-8">Let us know what materials you have in mind.</p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-auto mb-auto">
                        {['Hardwood', 'Engineered Wood', 'Premium Hybrid', 'Vinyl / LVT', 'Laminate', 'Tile', 'Epoxy', 'Undecided'].map((material) => (
                          <button
                            key={material}
                            onClick={() => { setMaterialPreference(material); nextStep(); }}
                            className={`w-full flex items-center justify-center p-5 rounded-xl border-2 transition-all ${materialPreference === material ? 'border-[#8c5430] bg-[#8c5430]/5 text-[#8c5430]' : 'border-[#8c5430]/10 hover:border-[#8c5430]/30 bg-white hover:bg-[#fbf5f0] text-[#4a2810]'}`}
                          >
                            <span className="font-bold text-[15px] text-center">{material}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Final Details */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col flex-1"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#251208] mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>Final Details</h2>
                      <p className="text-[#6b3e21] mb-8">Give us an idea of the scope and any other notes.</p>
                      
                      <div className="flex flex-col gap-6 mt-auto mb-auto">
                        <div className="group">
                          <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3">Estimated Area (optional)</label>
                          <input type="text" value={estimatedArea} onChange={(e) => setEstimatedArea(e.target.value)} placeholder="e.g. 150 sq meters" className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] placeholder-[#8c5430]/40" />
                        </div>

                        <div className="group">
                          <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-3">Project Timeline</label>
                          <div className="relative">
                            <select value={projectTimeline} onChange={(e) => setProjectTimeline(e.target.value)} className="w-full px-6 py-5 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] appearance-none cursor-pointer">
                              <option value="" disabled>Select timeline...</option>
                              <option value="ASAP">As Soon As Possible</option>
                              <option value="1-3 Months">1 to 3 Months</option>
                              <option value="3-6 Months">3 to 6 Months</option>
                              <option value="Flexible">Flexible / Planning</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#8c5430]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-xs font-bold tracking-[0.2em] text-[#8c5430] uppercase mb-2">Additional Notes</label>
                          <textarea rows={3} value={additionalRequirements} onChange={(e) => setAdditionalRequirements(e.target.value)} placeholder="Any other details..." className="w-full px-5 py-4 bg-[#fdfaf6] border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:ring-2 focus:ring-[#8c5430]/20 transition-all font-medium text-[#251208] resize-none" />
                        </div>
                      </div>

                      <button onClick={handleSubmit} disabled={submitting} className="mt-8 w-full relative overflow-hidden rounded-xl py-5 font-bold text-white uppercase tracking-[0.2em] bg-[#8c5430] hover:bg-[#6b3e21] transition-all shadow-[0_8px_30px_rgba(140,84,48,0.4)] hover:shadow-[0_12px_40px_rgba(140,84,48,0.6)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#8c5430] flex items-center justify-center gap-3">
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
            </>
          )}
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  );
}
