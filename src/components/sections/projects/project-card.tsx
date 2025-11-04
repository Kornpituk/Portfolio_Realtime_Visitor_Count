// src/components/sections/projects/project-card.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Github, Eye } from "lucide-react"
import { Project } from "@/types/project"

type Props = {
  project: Project
  onClick: () => void
  index?: number
}

export function ProjectCard({ project, onClick, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="h-full"
    >
      <Card 
        className="cursor-pointer group h-full bg-gradient-to-br from-background to-muted/20 border-muted/40 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
        onClick={onClick}
      >
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={250}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="text-xs font-medium"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <span className="capitalize font-medium">{project.category}</span>
            <div className="flex items-center gap-1">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (project.githubUrl) window.open(project.githubUrl, '_blank')
                  }}
                >
                  <Github className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (project.liveUrl) window.open(project.liveUrl, '_blank')
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}