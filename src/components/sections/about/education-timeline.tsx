"use client"

import { motion } from "framer-motion"

const education = [
    { year: "2017 - 2021", degree: "B.Sc. Computer Science", school: "XYZ University" },
    { year: "2014 - 2017", degree: "High School", school: "ABC High School" },
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
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-sm">{edu.school}</p>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
