"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is KISSA?",
    a: "KISSA is a platform that helps you preserve your life stories — through conversations, voice notes, photos, and memories — so future generations can experience them naturally.",
  },
  {
    q: "How does the digital avatar work?",
    a: "Using your voice recordings, photos, and the way you tell stories, KISSA creates a digital reflection that captures your tone, mannerisms, and personality — so your stories feel like you.",
  },
  {
    q: "Is my data private and secure?",
    a: "Absolutely. Your stories belong to you. We use end-to-end encryption and never share your personal memories without your explicit consent.",
  },
  {
    q: "Can I choose who sees my stories?",
    a: "Yes. You control exactly who gets access — whether it's family, close friends, or a legacy you leave for future generations.",
  },
  {
    q: "When will KISSA launch?",
    a: "We're working hard to bring KISSA to life. Join the waitlist above and you'll be the first to know when we launch.",
  },
];

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[#1F4D3A]/8 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer"
      >
        <span
          className="text-base sm:text-lg font-semibold leading-snug pr-4"
          style={{ color: "#1F4D3A" }}
        >
          {faq.q}
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1F4D3A"
          strokeWidth="2"
          strokeLinecap="round"
          className="flex-shrink-0"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
              style={{ color: "#2D2D2D/70" }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#F5C542]/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#A8C4A0]/5 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#1F4D3A]/5 text-[#1F4D3A] text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
          >
            Got Questions?
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight"
            style={{
              color: "#1F4D3A",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div
          className="rounded-2xl px-6 sm:px-10"
          style={{ backgroundColor: "#FAF8F3" }}
        >
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
