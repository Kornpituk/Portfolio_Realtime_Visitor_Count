// src/components/sections/projects/project-detail-dialog.tsx
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/data/projects"
import { motion } from "framer-motion"

type Props = {
    project: Project | null
    open: boolean
    onClose: () => void
}

export function ProjectDetailDialog({ project, open, onClose }: Props) {
    if (!project) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                >
                    <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                    </DialogHeader>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="rounded-md mb-4 object-cover"
                    />
                    <p className="mb-4">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                        {project.tech.map((t) => (
                            <Badge key={t}>{t}</Badge>
                        ))}
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
