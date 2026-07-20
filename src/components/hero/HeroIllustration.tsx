"use client";

import React from "react";
import { FloatingObject } from "./FloatingObject";

export function HeroIllustration() {
  const objects: {
    Comp: React.ComponentType<any>;
    props: any;
    style: React.CSSProperties;
    float: { duration: number; delay: number; rotate: number; yRange: number; parallax: number; scale: number };
  }[] = [
    // Polaroid 1 - top left area
    {
      Comp: PolaroidPhoto,
      props: { caption: "Grandma's kitchen, 1985", imgSrc: "https://images.unsplash.com/photo-1758874960056-07aa3d0afa3b?w=240&h=240&fit=crop&auto=format" },
      style: { top: "3%", left: "5%" },
      float: { duration: 5, delay: 0, rotate: 8, yRange: 12, parallax: 0.03, scale: 0.9 },
    },
    // Polaroid 2 - upper middle
    {
      Comp: PolaroidPhoto,
      props: { caption: "First day of school", imgSrc: "https://images.unsplash.com/photo-1757141975039-bcf1b448792b?w=240&h=240&fit=crop&auto=format" },
      style: { top: "25%", left: "50%" },
      float: { duration: 4.5, delay: 1.5, rotate: -6, yRange: 10, parallax: 0.025, scale: 0.85 },
    },
    // Polaroid 3 - middle left
    {
      Comp: PolaroidPhoto,
      props: { caption: "Summer vacation", imgSrc: "https://images.unsplash.com/photo-1767519633458-27efd4509f11?w=240&h=240&fit=crop&auto=format" },
      style: { top: "52%", left: "10%" },
      float: { duration: 6, delay: 0.8, rotate: 10, yRange: 8, parallax: 0.02, scale: 0.8 },
    },
    // Polaroid 4 - bottom right
    {
      Comp: PolaroidPhoto,
      props: { caption: "Family reunion", imgSrc: "https://images.unsplash.com/photo-1512936277470-f73e86854d79?w=240&h=240&fit=crop&auto=format" },
      style: { top: "78%", left: "55%" },
      float: { duration: 5.2, delay: 2.2, rotate: -5, yRange: 11, parallax: 0.025, scale: 0.85 },
    },
    // Speech bubble 1 - top right
    {
      Comp: SpeechBubble,
      props: { text: "Tell me about your childhood...", color: "#7EC8E3" },
      style: { top: "6%", left: "65%" },
      float: { duration: 5.5, delay: 0.3, rotate: 3, yRange: 14, parallax: 0.04, scale: 0.9 },
    },
    // Speech bubble 2 - middle right
    {
      Comp: SpeechBubble,
      props: { text: "What was your first love?", color: "#E8A0A8" },
      style: { top: "45%", left: "72%" },
      float: { duration: 4.8, delay: 2, rotate: -4, yRange: 11, parallax: 0.035, scale: 0.85 },
    },
    // Sticky note 1 - upper left
    {
      Comp: StickyNote,
      props: { text: "Mom's biryani recipe", color: "#F5C542" },
      style: { top: "15%", left: "30%" },
      float: { duration: 6.5, delay: 0.5, rotate: 15, yRange: 9, parallax: 0.015, scale: 0.85 },
    },
    // Sticky note 2 - lower left
    {
      Comp: StickyNote,
      props: { text: "Dad's old guitar", color: "#F0A870" },
      style: { top: "65%", left: "30%" },
      float: { duration: 5.2, delay: 1.2, rotate: -12, yRange: 13, parallax: 0.02, scale: 0.8 },
    },
    // Star - far top right
    {
      Comp: TwinklingStar,
      props: { size: 24, color: "#F5C542" },
      style: { top: "2%", left: "88%" },
      float: { duration: 3, delay: 0, rotate: 0, yRange: 6, parallax: 0.05, scale: 1 },
    },
    // Star 2 - bottom left
    {
      Comp: TwinklingStar,
      props: { size: 16, color: "#C4B8D8" },
      style: { top: "90%", left: "18%" },
      float: { duration: 4, delay: 1, rotate: 0, yRange: 5, parallax: 0.06, scale: 1 },
    },
    // Heart - middle left
    {
      Comp: FloatingHeart,
      props: { color: "#E87060" },
      style: { top: "35%", left: "5%" },
      float: { duration: 4.2, delay: 0.7, rotate: 0, yRange: 8, parallax: 0.04, scale: 0.9 },
    },
    // Heart 2 - bottom center
    {
      Comp: FloatingHeart,
      props: { color: "#E8A0A8" },
      style: { top: "70%", left: "82%" },
      float: { duration: 5.8, delay: 2.5, rotate: 0, yRange: 7, parallax: 0.03, scale: 0.7 },
    },
    // Balloon - upper right
    {
      Comp: Balloon,
      props: { color: "#E87060" },
      style: { top: "18%", left: "80%" },
      float: { duration: 7, delay: 4, rotate: 5, yRange: 15, parallax: 0.03, scale: 0.8 },
    },
    // Music note - bottom far right
    {
      Comp: MusicNote,
      props: { color: "#1F4D3A" },
      style: { top: "85%", left: "78%" },
      float: { duration: 3.5, delay: 1.8, rotate: 0, yRange: 10, parallax: 0.05, scale: 0.8 },
    },
    // Tiny book - center right
    {
      Comp: TinyBook,
      props: { color: "#A8C4A0" },
      style: { top: "30%", left: "85%" },
      float: { duration: 6, delay: 3, rotate: -8, yRange: 9, parallax: 0.02, scale: 0.8 },
    },
    // Smiley doodle - center
    {
      Comp: SmileyDoodle,
      props: {},
      style: { top: "55%", left: "48%" },
      float: { duration: 5, delay: 2.2, rotate: 5, yRange: 11, parallax: 0.025, scale: 0.9 },
    },
    // Ribbon/kite - top center
    {
      Comp: ColorfulRibbon,
      props: {},
      style: { top: "9%", left: "45%" },
      float: { duration: 8, delay: 0, rotate: -15, yRange: 20, parallax: 0.01, scale: 0.7 },
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[500px]">
      {objects.map((item, i) => (
        <FloatingObject
          key={i}
          className="pointer-events-none"
          floatDuration={item.float.duration}
          floatDelay={item.float.delay}
          rotateAmount={item.float.rotate}
          yRange={item.float.yRange}
          parallaxFactor={item.float.parallax}
          scale={item.float.scale}
          style={item.style}
        >
          <item.Comp {...item.props} />
        </FloatingObject>
      ))}
    </div>
  );
}

function PolaroidPhoto({ caption, imgSrc }: { caption: string; imgSrc?: string }) {
  return (
    <div
      className="bg-white p-1.5 sm:p-2 pb-4 sm:pb-6 rounded-sm shadow-lg rotate-[-2deg] w-[90px] sm:w-[130px]"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <div
        className="w-full aspect-square rounded-sm mb-1 overflow-hidden"
        style={{
          background: imgSrc ? "none" : "linear-gradient(135deg, #A8C4A0, #C4B8D8)",
        }}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <p className="text-[7px] sm:text-[9px] text-center font-body text-[#2D2D2D]/70 leading-tight">
        {caption}
      </p>
    </div>
  );
}

function SpeechBubble({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div
      className="rounded-2xl px-3 py-2 text-xs font-body shadow-md"
      style={{
        backgroundColor: color,
        color: "#2D2D2D",
        maxWidth: 130,
        borderBottomLeftRadius: 4,
      }}
    >
      {text}
    </div>
  );
}

function StickyNote({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div
      className="rounded-sm px-2 py-1.5 text-[9px] font-body shadow-md leading-tight"
      style={{
        backgroundColor: color,
        color: "#2D2D2D",
        width: 90,
        transform: "rotate(2deg)",
      }}
    >
      {text}
    </div>
  );
}

function TwinklingStar({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ animation: "twinkle 2s ease-in-out infinite" }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FloatingHeart({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      style={{ animation: "wobble 3s ease-in-out infinite" }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Balloon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 28 34"
      fill="none"
    >
      <ellipse cx="14" cy="14" rx="12" ry="14" fill={color} opacity={0.85} />
      <path d="M14 28 L14 33" stroke="#2D2D2D" strokeWidth="0.5" opacity={0.4} />
      <circle cx="10" cy="10" r="1.5" fill="white" opacity={0.4} />
    </svg>
  );
}

function MusicNote({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill={color}
    >
      <circle cx="4" cy="20" r="3.5" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="14" cy="18" r="3.5" stroke={color} strokeWidth="1" fill="none" />
      <path d="M7.5 20 L7.5 4 L17 2 L17 18" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function TinyBook({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
    >
      <rect x="1" y="1" width="20" height="16" rx="1" stroke={color} strokeWidth="1.5" fill="white" />
      <line x1="11" y1="1" x2="11" y2="17" stroke={color} strokeWidth="1" />
      <rect x="3" y="4" width="6" height="2" rx="0.5" fill={color} opacity={0.3} />
      <rect x="3" y="8" width="6" height="2" rx="0.5" fill={color} opacity={0.3} />
      <rect x="13" y="4" width="6" height="2" rx="0.5" fill={color} opacity={0.3} />
      <rect x="13" y="8" width="6" height="2" rx="0.5" fill={color} opacity={0.3} />
    </svg>
  );
}

function SmileyDoodle() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <circle cx="14" cy="14" r="12" stroke="#1F4D3A" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="11" r="1.5" fill="#1F4D3A" />
      <circle cx="19" cy="11" r="1.5" fill="#1F4D3A" />
      <path
        d="M8 18 C10 21 18 21 20 18"
        stroke="#1F4D3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ColorfulRibbon() {
  return (
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
      <path
        d="M0 10 Q10 0 20 10 Q30 20 40 10"
        stroke="#F5C542"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 14 Q10 4 20 14 Q30 24 40 14"
        stroke="#E87060"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
}
