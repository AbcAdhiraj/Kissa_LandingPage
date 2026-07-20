"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-[#1F4D3A]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />

          <p
            className="text-sm text-center"
            style={{ color: "#2D2D2D/50" }}
          >
            Everybody has a Kissa worth keeping.
          </p>

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
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: "#2D2D2D/30" }}>
            &copy; {new Date().getFullYear()} KISSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
