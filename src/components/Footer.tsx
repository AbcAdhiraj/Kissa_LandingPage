"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/ekkissaaa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/qissaai",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/kissa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
      </svg>
    ),
  },
];

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative py-12 sm:py-16 border-t border-[#1F4D3A]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p
              className="text-sm text-center md:text-left max-w-xs"
              style={{ color: "#2D2D2D/50" }}
            >
              Everybody has a Kissa worth keeping.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#1F4D3A/60" }}
            >
              Links
            </span>
            <div className="flex flex-col items-center md:items-start gap-2">
              {[
                { label: "Home", href: "/#hero" },
                { label: "How It Works", href: "/#timeline" },
                { label: "Journey", href: "/#journey" },
                { label: "Roadmap", href: "/#roadmap" },
                { label: "Early Access", href: "/#early-access" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-[#1F4D3A]"
                  style={{ color: "#2D2D2D/60" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#1F4D3A/60" }}
            >
              Connect
            </span>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                  style={{ color: "#2D2D2D/50", backgroundColor: "#1F4D3A/5" }}
                  whileHover={{
                    scale: 1.1,
                    color: "#1F4D3A",
                    backgroundColor: "#1F4D3A/10",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1F4D3A]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <motion.span
              className="text-xs"
              style={{ color: "#2D2D2D/40" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Made with
            </motion.span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#E87060"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
            <motion.span
              className="text-xs"
              style={{ color: "#2D2D2D/40" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              KISSA
            </motion.span>
          </div>

          <p className="text-xs" style={{ color: "#2D2D2D/30" }}>
            &copy; {year} KISSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
