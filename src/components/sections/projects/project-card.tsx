// src/components/sections/projects/project-card.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/data/projects"

type Props = {
  project: Project
  onClick: () => void
  index?: number
}

export function ProjectCard({ project, onClick, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        className="cursor-pointer hover:shadow-xl transition"
        onClick={onClick}
      >
        <CardHeader>
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={250}
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
