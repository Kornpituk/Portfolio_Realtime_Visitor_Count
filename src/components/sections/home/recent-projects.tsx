"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectsMockData as projects } from "@/data/projects"
import Link from "next/link"

export default function RecentProjects() {
    return (
        <section className="w-full max-w-5xl px-6 py-16">
            <motion.h2
                className="text-3xl font-bold text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Recent Projects 🛠️
            </motion.h2>

            <div className="grid gap-6 md:grid-cols-3">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                                <Button asChild size="sm">
                                    <Link href={project.link}>View Project</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
