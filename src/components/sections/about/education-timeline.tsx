"use client"

import { motion } from "framer-motion"

const education = [
    { year: "2018 - 2022", degree: "Bachelor of Engineering in Computer Engineering", school: "Rajamangala University of Technology Lanna, Chiang Mai" },
    { year: "2012 - 2017", degree: "High School", school: "Mea Cheam School" },
]

export function EducationTimeline() {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">🎓 Education</h2>
            <ul className="space-y-4 border-l-2 border-muted pl-6">
                {education.map((edu, i) => (
                    <li key={i} className="relative">
                        <span className="absolute -left-[10px] w-4 h-4 bg-primary rounded-full" />
                        <p className="text-sm mx-4 text-muted-foreground">{edu.year}</p>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-sm">{edu.school}</p>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
