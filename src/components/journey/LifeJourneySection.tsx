"use client";

import { JourneyCard } from "./JourneyCard";
import {
  SproutIcon,
  BookIcon,
  GraduationIcon,
  HeartIcon,
  BriefcaseIcon,
  FamilyIcon,
  CompassIcon,
  LampIcon,
  StarIcon,
} from "./ChapterIcons";

interface Chapter {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  years: string;
  accent: string;
  content: string;
  shortContent: string;
  doodle: string;
  span: "normal" | "wide";
}

const chapters: Chapter[] = [
  {
    icon: SproutIcon,
    title: "Childhood",
    years: "0–12",
    accent: "#F5EDD6",
    content: "Playing in the rain, scraped knees, and bedtime stories that shaped who you became.",
    shortContent: "Scraped knees and bedtime stories.",
    doodle: "innocence · wonder · home",
    span: "wide",
  },
  {
    icon: BookIcon,
    title: "School",
    years: "13–18",
    accent: "#A8C4A0",
    content: "First friendships, late-night study sessions, and the teachers who believed in you.",
    shortContent: "Friendships and late-night study sessions.",
    doodle: "learning · curiosity · growth",
    span: "normal",
  },
  {
    icon: GraduationIcon,
    title: "College",
    years: "19–22",
    accent: "#C4B8D8",
    content: "Discovering who you really were. The all-nighters, the road trips, the freedom.",
    shortContent: "All-nighters, road trips, and freedom.",
    doodle: "discovery · freedom · late nights",
    span: "normal",
  },
  {
    icon: HeartIcon,
    title: "Love",
    years: "Any age",
    accent: "#E8A0A8",
    content: "The butterflies. The heartbreak. The one who made it all make sense.",
    shortContent: "Butterflies, heartbreak, and the one.",
    doodle: "connection · devotion · warmth",
    span: "normal",
  },
  {
    icon: BriefcaseIcon,
    title: "Career",
    years: "20s–40s",
    accent: "#F0A870",
    content: "The dreams you chased, the risks you took, and the late nights that paid off.",
    shortContent: "Dreams chased and risks taken.",
    doodle: "ambition · purpose · achievement",
    span: "wide",
  },
  {
    icon: FamilyIcon,
    title: "Family",
    years: "30s+",
    accent: "#F5C542",
    content: "Tiny hands, lullabies, and traditions that will live on for generations.",
    shortContent: "Tiny hands and lullabies.",
    doodle: "roots · nurture · belonging",
    span: "normal",
  },
  {
    icon: CompassIcon,
    title: "Adventures",
    years: "Any age",
    accent: "#7EC8E3",
    content: "The places that changed you. The strangers who became friends. The stories you brought home.",
    shortContent: "Places that changed you.",
    doodle: "wander · explore · discover",
    span: "normal",
  },
  {
    icon: LampIcon,
    title: "Wisdom",
    years: "50s+",
    accent: "#C4B8D8",
    content: "The lessons learned. The advice you'd give your younger self. The peace you found.",
    shortContent: "Lessons learned and peace found.",
    doodle: "insight · clarity · grace",
    span: "normal",
  },
  {
    icon: StarIcon,
    title: "Legacy",
    years: "Forever",
    accent: "#F5EDD6",
    content: "What you leave behind isn't just things. It's the stories. The laughter. The love.",
    shortContent: "The stories, the laughter, the love.",
    doodle: "forever · story · light",
    span: "wide",
  },
];

export function LifeJourneySection() {
  return (
    <section id="journey" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#A8C4A0]/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C4B8D8]/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#F5C542]/10 text-[#1F4D3A] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            <BookIcon />
            Your Story, Chapter by Chapter
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4"
            style={{
              color: "#1F4D3A",
              fontFamily: "var(--font-plus-jakarta)",
            }}
          >
            The Life Journey
          </h2>
          <p
            className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-4"
            style={{ color: "#2D2D2D/70" }}
          >
            Every life is a story worth preserving. Tap any chapter to explore.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {chapters.map((ch, i) => (
            <div
              key={ch.title}
              className={
                ch.span === "wide"
                  ? "col-span-2"
                  : "col-span-1"
              }
            >
              <JourneyCard
                icon={ch.icon}
                title={ch.title}
                years={ch.years}
                accent={ch.accent}
                index={i}
                span={ch.span}
                doodle={ch.doodle}
              >
                <p
                  className="text-sm leading-relaxed mb-2 hidden sm:block"
                  style={{ color: "#2D2D2D" }}
                >
                  {ch.content}
                </p>
                <p
                  className="text-sm leading-relaxed mb-2 sm:hidden"
                  style={{ color: "#2D2D2D" }}
                >
                  {ch.shortContent}
                </p>
                <p className="text-xl">{ch.doodle}</p>
              </JourneyCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
