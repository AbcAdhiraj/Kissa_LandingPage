"use client";

import { motion } from "framer-motion";
import { HeroIllustration } from "./HeroIllustration";
import { SquishyButton } from "@/components/ui/SquishyButton";

export function HeroSection() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToJourney = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden paper-texture">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#F5C542]/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#E87060]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#A8C4A0]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            className="pt-32 lg:pt-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6"
              style={{ color: "#1F4D3A", fontFamily: "var(--font-plus-jakarta)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Everybody has a
              <br />
              <span className="relative">
                <span className="font-devanagari">कissa</span> worth
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 4 Q50 0 100 4 Q150 8 200 4"
                    stroke="#F5C542"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              keeping.
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg"
              style={{ color: "#2D2D2D/80" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              We at KISSA believe the most precious things we leave behind are our stories.
                That's why we're building a place where your voice, memories, and moments can live on.
                So your loved ones can hear your stories exactly as you would tell them.
                Today, tomorrow, and for generations to come.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <SquishyButton variant="primary" onClick={scrollToWaitlist}>
                Join the Waitlist
                <span className="text-lg">→</span>
              </SquishyButton>
              <SquishyButton variant="secondary" onClick={scrollToJourney}>
                See Our Vision
              </SquishyButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
