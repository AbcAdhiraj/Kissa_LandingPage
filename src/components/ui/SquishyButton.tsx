"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SquishyButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export function SquishyButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: SquishyButtonProps) {
  const baseClasses =
    "rounded-full font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center gap-2 cursor-pointer select-none";
  const variantClasses = {
    primary:
      "bg-[#1F4D3A] text-[#FAF8F3] hover:bg-[#2A5F48] shadow-lg shadow-[#1F4D3A]/20",
    secondary:
      "border-2 border-[#1F4D3A]/20 text-[#1F4D3A] hover:bg-[#1F4D3A]/5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
    >
      {children}
    </motion.button>
  );
}
