"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { LifeJourneySection } from "@/components/journey/LifeJourneySection";
import { WaitlistSection } from "@/components/waitlist/WaitlistSection";
import { Footer } from "@/components/Footer";
import { CursorSparkles } from "@/components/effects/CursorSparkles";
import { FloatingBirds } from "@/components/effects/FloatingBirds";
import { DriftingLeaves } from "@/components/effects/DriftingLeaves";
import { FloatingButterflies } from "@/components/effects/FloatingButterflies";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <CursorSparkles />
      <div className="hidden sm:block">
        <FloatingBirds />
        <DriftingLeaves />
        <FloatingButterflies />
      </div>

      <main>
        <HeroSection />
        <TimelineSection />
        <LifeJourneySection />
        <WaitlistSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
