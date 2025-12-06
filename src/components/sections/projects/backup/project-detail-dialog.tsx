// src/components/sections/projects/project-detail-dialog.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from "@/types/project"
import { ExternalLink, Github, X, Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

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

  const handleImageNavigation = useCallback((direction: 'prev' | 'next') => {
    if (!project) return
    const images = project.images || [project.image]
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)
    } else {
      setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)
    }
  }, [project])

  const handleExternalLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  if (!project) return null

  const images = project.images || [project.image]
  const canNavigateImages = images.length > 1

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="
        fixed
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[90vw]
        h-[90vh]
        max-w-7xl
        max-h-[95vh]
        overflow-hidden
        p-0
        bg-background
        border
        shadow-2xl
        rounded-xl
        z-50
      ">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full"
          >
            {/* Minimal Header */}
            <DialogHeader className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <div className="flex items-center gap-4 flex-1">
                {/* Navigation Arrows */}
                {(hasPrev || hasNext) && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onPrev}
                      disabled={!hasPrev}
                      className="h-9 w-9"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onNext}
                      disabled={!hasNext}
                      className="h-9 w-9"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {project.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary" className="font-medium">
                      {project.category}
                    </Badge>
                    {project.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9"
              >
                <X className="w-5 h-5" />
              </Button> */}
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Image Gallery */}
              <div className="relative aspect-video bg-muted/50">
                <Image
                  src={images[currentImageIndex]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {canNavigateImages && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm h-10 w-10"
                      onClick={() => handleImageNavigation('prev')}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm h-10 w-10"
                      onClick={() => handleImageNavigation('next')}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex 
                              ? 'bg-primary' 
                              : 'bg-background/60 hover:bg-background/80'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Action Buttons */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <Button
                      onClick={() => handleExternalLink(project.liveUrl!)}
                      className="flex items-center gap-3 px-6 py-3"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      onClick={() => handleExternalLink(project.githubUrl!)}
                      className="flex items-center gap-3 px-6 py-3"
                    >
                      <Github className="w-5 h-5" />
                      Source Code
                    </Button>
                  )}
                </div>

                {/* Main Content Grid */}
                <div className="grid xl:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="xl:col-span-2 space-y-8">
                    {/* Description */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Overview</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Features</h3>
                        <ul className="space-y-3">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-3 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    {/* Technologies */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge 
                            key={tech}
                            variant="secondary"
                            className="px-3 py-1.5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Details</h3>
                      <div className="space-y-3 text-sm">
                        {project.role && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Role</span>
                            <span className="font-medium">{project.role}</span>
                          </div>
                        )}
                        {project.status && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium">{project.duration}</span>
                          </div>
                        )}
                      </div>
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