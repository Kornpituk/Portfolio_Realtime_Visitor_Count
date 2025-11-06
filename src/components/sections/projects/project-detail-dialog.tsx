// src/components/sections/projects/project-detail-dialog.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from "@/types/project"
import { ExternalLink, Github, X, Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

type Props = {
  project: Project | null
  open: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export function ProjectDetailDialog({ 
  project, 
  open, 
  onClose, 
  onNext, 
  onPrev, 
  hasNext = false, 
  hasPrev = false 
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0)
    }
  }, [project])

  if (!project) return null

  const images = project.images || [project.image]
  const canNavigateImages = images.length > 1

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {/* Header */}
            <DialogHeader className="flex-row items-center justify-between p-6 border-b">
              <div className="flex items-center gap-4 flex-1">
                {(hasPrev || hasNext) && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onPrev}
                      disabled={!hasPrev}
                      className="h-8 w-8"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onNext}
                      disabled={!hasNext}
                      className="h-8 w-8"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                  <DialogDescription className="flex items-center gap-4 mt-2">
                    <span className="capitalize font-medium text-primary">
                      {project.category}
                    </span>
                    {project.date && (
                      <span className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    )}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Image Gallery */}
              <div className="relative aspect-video bg-muted/30">
                <Image
                  src={images[currentImageIndex]}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="object-cover w-full h-full"
                />
                
                {canNavigateImages && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setCurrentImageIndex(prev => 
                        prev > 0 ? prev - 1 : images.length - 1
                      )}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setCurrentImageIndex(prev => 
                        prev < images.length - 1 ? prev + 1 : 0
                      )}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-primary' 
                              : 'bg-primary/30'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.features && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                        <ul className="space-y-1">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="font-medium">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button 
                          variant="outline" 
                          className="flex-1 gap-2"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button 
                          className="flex-1 gap-2"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}