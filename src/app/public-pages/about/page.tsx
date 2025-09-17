"use client"

import { AboutMe } from "@/components/sections/about/about-me"
import { Skills } from "@/components/sections/about/skills"
import { ExperienceTimeline } from "@/components/sections/about/experience-timeline"
import { EducationTimeline } from "@/components/sections/about/education-timeline"

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
