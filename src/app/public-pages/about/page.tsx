"use client"

import dynamic from "next/dynamic"
import { AboutMe } from "@/components/sections/about/about-me"

// Dynamic imports สำหรับ components ที่ไม่จำเป็นต้องโหลดทันที
const Skills = dynamic(
  () => import("@/components/sections/about/skills").then((mod) => ({ default: mod.Skills })),
  { ssr: true }
)

const ExperienceTimeline = dynamic(
  () => import("@/components/sections/about/experience-timeline").then((mod) => ({ default: mod.ExperienceTimeline })),
  { ssr: true }
)

const EducationTimeline = dynamic(
  () => import("@/components/sections/about/education-timeline").then((mod) => ({ default: mod.EducationTimeline })),
  { ssr: true }
)

export default function AboutPage() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-18 space-y-20">
            <AboutMe />
            <Skills />
            <ExperienceTimeline />
            <EducationTimeline />
        </section>
    )
}
