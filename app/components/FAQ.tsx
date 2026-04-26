"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What makes Fusion Hybrid flooring different from standard vinyl or laminate?",
    answer: "Fusion Hybrid is the fastest-growing flooring option, combining the best of laminate and vinyl with a stunning timber look. It features the most stable and 100% waterproof core available worldwide, offering exceptional durability and clarity without splintering or warping."
  },
  {
    question: "Is your flooring safe for my family and the environment?",
    answer: "Absolutely. Our Fusion Hybrid SPC flooring is completely Eco-Friendly and Floorscore Certified. It contains no heavy metals, phthalates, or methanol. Furthermore, it is CE Certified, guaranteeing it meets the highest standards for health, safety, and environmental protection."
  },
  {
    question: "Does the flooring require an additional underlay for noise reduction?",
    answer: "No, it does not. Our Fusion Hybrid range comes with built-in Acoustic Backing that is industry-leading and 6-Star rated for noise reduction. This built-in cushioning also makes the floor significantly softer and warmer underfoot compared to natural stone or wood."
  },
  {
    question: "How do I maintain and care for my new hybrid floors?",
    answer: "Maintenance is minimal thanks to our surface coating technology—no extra surface treatments are needed. Simply vacuum or sweep regularly and mop occasionally. To protect your investment, we recommend using protective pads on furniture, trimming pet claws, and minimizing direct UV sunlight exposure by covering windows during peak hours."
  },
  {
    question: "Can the flooring be installed over my existing floors?",
    answer: "Yes. Our Fusion Hybrid boards utilize the Uniclic 2G click system, making them quick and easy to install directly over most existing hard floors, saving you significant time and preparation costs."
  },
  {
    question: "Can I install this flooring in wet areas like bathrooms?",
    answer: "Yes! Fusion Hybrid is 100% waterproof and stain-resistant. It stands up to all spills, making it the perfect seamless flooring solution for kitchens, bathrooms, and laundries."
  }
];

interface FAQProps {
  theme?: "light" | "dark";
}

export default function FAQ({ theme = "light" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isLight = theme === "light";

  return (
    <section className={`w-full py-24 px-8 relative z-20 overflow-hidden ${isLight ? 'bg-transparent' : 'bg-transparent'}`}>
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={`text-xs font-bold tracking-widest uppercase mb-4 ${isLight ? 'text-[#8c5430]' : 'text-[#b56b3a]'}`}>
            Support & Inquiries
          </h2>
          <h3 className={`text-4xl md:text-5xl lg:text-6xl leading-tight ${isLight ? 'text-[#251208]' : 'text-white'}`} style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 900 }}>
            Frequently Asked Questions
          </h3>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={`rounded-[1.5rem] border transition-colors duration-500 overflow-hidden backdrop-blur-xl ${
                  isLight 
                    ? `border-[#8c5430]/10 ${isOpen ? 'shadow-xl bg-white' : 'bg-white/60 hover:bg-white/80'}`
                    : `border-white/5 ${isOpen ? 'bg-white border-transparent shadow-2xl' : 'bg-[#1a0d07]/40 hover:bg-[#1a0d07]/70'}`
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                >
                  <span className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors duration-300 pr-8 ${
                    isOpen 
                      ? 'text-[#8c5430]' // Always warm dark when open (since bg is white)
                      : isLight 
                        ? 'text-[#251208] group-hover:text-[#8c5430]' 
                        : 'text-white group-hover:text-[#fce8d5]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen 
                        ? 'bg-[#8c5430] text-white shadow-md' 
                        : isLight 
                          ? 'bg-[#fdfaf6] text-[#8c5430] group-hover:bg-[#8c5430] group-hover:text-white' 
                          : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                      <div className="p-6 md:p-8 pt-0 text-base md:text-lg leading-relaxed font-medium text-[#6b3e21]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
