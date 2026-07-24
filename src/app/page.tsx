"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { LifeJourneySection } from "@/components/journey/LifeJourneySection";
import { EarlyAccessSection } from "@/components/early-access/EarlyAccessSection";
import { FaqSection } from "@/components/FaqSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { ScrollProgress } from "@/components/ScrollProgress";
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
        <LifeJourneySection />
        <TimelineSection />
        <RoadmapSection />
        <EarlyAccessSection />
        <FaqSection />
      </main>

      <Footer />
      <ScrollProgress />
    </SmoothScroll>
  );
}
