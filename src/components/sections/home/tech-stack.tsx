"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const techs = [
    "Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "Express",
    "PostgreSQL", "Supabase", "Firebase", "Docker", "GitHub Actions"
]

export default function TechStack() {
    return (
        <section className="w-full max-w-3xl px-6 py-16 text-center">
            <motion.h2
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Tech Stack ⚡
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-3">
                {techs.map((tech, i) => (
                    <motion.div
                        key={tech}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            {tech}
                        </Badge>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
