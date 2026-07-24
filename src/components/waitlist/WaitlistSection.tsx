"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SquishyButton } from "@/components/ui/SquishyButton";
import { SproutIcon, QuillIcon, PaperPlaneIcon, LeafIcon, StarIcon } from "@/components/journey/ChapterIcons";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist. Please try again.");
      }

      // Confetti burst
      const rect = formRef.current?.getBoundingClientRect();
      if (rect) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: ["#1F4D3A", "#F5C542", "#E87060", "#7EC8E3", "#C4B8D8"],
        });

        // Second burst after a delay
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 120,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ["#F5C542", "#E87060", "#A8C4A0"],
          });
        }, 300);
      }

      // Show success screen after short animation
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#F5C542]/8 blur-3xl" />
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-[#E87060]/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              ref={formRef}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Scrapbook page styling */}
              <div
                className="relative rounded-3xl p-6 sm:p-10 lg:p-16 shadow-xl border border-white/50"
                style={{
                  backgroundColor: "#F5EDD6",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,0.04) 29px, rgba(0,0,0,0.04) 30px)",
                }}
              >
                {/* Decorative tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-6 bg-[#F5C542]/60 rounded-sm opacity-60 rotate-[-2deg]" />

                {/* Decorative corner doodles */}
                <div className="absolute top-4 left-4 opacity-20 hidden sm:block"><LeafIcon /></div>
                <div className="absolute bottom-4 right-4 opacity-20 hidden sm:block"><StarIcon /></div>

                <div className="text-center relative z-10">
                  <motion.span
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#1F4D3A]/5 text-[#1F4D3A] text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <QuillIcon /> Start Writing
                  </motion.span>

                  <motion.h2
                    className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4"
                    style={{
                      color: "#1F4D3A",
                      fontFamily: "var(--font-plus-jakarta)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Plant the first page of
                    <br />
                    your story.
                  </motion.h2>

                  <motion.p
                    className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md mx-auto"
                    style={{ color: "#2D2D2D/70" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Join the waitlist and be the first to know when Kissa launches.
                    Your story starts here.
                  </motion.p>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-[#1F4D3A]/10 bg-white/80 focus:outline-none focus:border-[#1F4D3A]/40 focus:bg-white transition-all text-sm sm:text-base disabled:opacity-60"
                      style={{ color: "#2D2D2D" }}
                    />
                    <SquishyButton
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          Planting...
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-1" />
                        </>
                      ) : (
                        <>
                          Plant It <SproutIcon />
                        </>
                      )}
                    </SquishyButton>
                  </motion.form>

                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm font-medium mt-3"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <div className="mb-6 scale-[3] origin-center"><PaperPlaneIcon /></div>
              </motion.div>

              <motion.div
                className="inline-block rounded-3xl p-6 sm:px-8 sm:py-10 shadow-xl"
                style={{ backgroundColor: "#F5EDD6" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3
                  className="text-xl sm:text-3xl font-bold mb-3"
                  style={{
                    color: "#1F4D3A",
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  We can&apos;t wait to hear your story.
                </h3>
                <p className="text-sm sm:text-base" style={{ color: "#2D2D2D/70" }}>
                  You&apos;re on the list! We&apos;ll let you know when Kissa is ready.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
