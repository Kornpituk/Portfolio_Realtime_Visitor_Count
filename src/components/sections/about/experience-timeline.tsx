"use client"

import { motion } from "framer-motion"

const experiences = [
    { year: "2023 - Now", role: "Fullstack Developer", company: "Tech Corp" },
    { year: "2021 - 2023", role: "Frontend Developer", company: "Creative Studio" },
]

export function ExperienceTimeline() {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">💼 Experience</h2>
            <ul className="space-y-4 border-l-2 border-muted pl-6">
                {experiences.map((exp, i) => (
                    <li key={i} className="relative">
                        <span className="absolute -left-[10px] w-4 h-4 bg-primary rounded-full" />
                        <p className="text-sm text-muted-foreground">{exp.year}</p>
                        <p className="font-semibold">{exp.role}</p>
                        <p className="text-sm">{exp.company}</p>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
