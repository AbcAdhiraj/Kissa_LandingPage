"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", target: "hero" },
  { label: "How It Works", target: "timeline" },
  { label: "Your Story", target: "journey" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // fallback for hero — scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-3xl lg:max-w-4xl rounded-full px-4 sm:px-6 h-14 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF8F3]/85 backdrop-blur-lg shadow-lg shadow-[#1F4D3A]/5 border border-[#1F4D3A]/8"
            : "bg-[#FAF8F3]/70 backdrop-blur-sm shadow-md shadow-[#1F4D3A]/5 border border-[#1F4D3A]/6"
        }`}
      >
        <button onClick={() => scrollTo("hero")} className="flex-shrink-0 cursor-pointer">
          <span className="font-bold text-2xl tracking-tight" style={{ color: "#1F4D3A" }}>KISSA</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#1F4D3A]/5 cursor-pointer"
              style={{ color: "#2D2D2D/75" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <motion.button
          className="rounded-full px-5 py-2 text-sm font-semibold cursor-pointer"
          style={{ backgroundColor: "#1F4D3A", color: "#FAF8F3" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollTo("waitlist")}
        >
          Join
        </motion.button>
      </nav>
    </motion.header>
  );
}
