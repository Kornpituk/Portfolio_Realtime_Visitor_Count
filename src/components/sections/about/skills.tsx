"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const skills = ["Next.js", "TypeScript", "React", "TailwindCSS", "Supabase", "Node.js"]

export function Skills() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">🚀 Skills</h2>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-base px-4 py-2">
                        {skill}
                    </Badge>
                ))}
            </div>
        </motion.div>
    )
}
