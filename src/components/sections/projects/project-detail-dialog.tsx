// src/components/sections/projects/project-detail-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import {
  ExternalLink,
  Github,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Code,
  FileText,
  Sparkles,
  Target,
  Zap,
  Users,
  Clock,
  ArrowRight,
  Rocket,
  Layers,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type Props = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onViewFullDetail?: (project: Project) => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export function ProjectDetailDialog({
  project,
  open,
  onClose,
  onViewFullDetail,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Reset states when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
    }
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, project, onClose, onNext, onPrev, hasNext, hasPrev]);

  const handleImageNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (!project) return;
      const images = project.images || [project.image];
      setImageLoaded(false);

      if (direction === "prev") {
        setCurrentImageIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        );
      } else {
        setCurrentImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        );
      }
    },
    [project]
  );

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canNavigateImages) {
      handleImageNavigation("next");
    }
    if (isRightSwipe && canNavigateImages) {
      handleImageNavigation("prev");
    }
  };

  const handleExternalLink = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleViewFullDetail = useCallback(() => {
    if (project && onViewFullDetail) {
      onViewFullDetail(project);
    }
  }, [project, onViewFullDetail]);

  if (!project) return null;

  const images = project.images || [project.image];
  const canNavigateImages = images.length > 1;
  const hasActionButtons = project.liveUrl || project.githubUrl;

  // Optimized data for summary view
  const summaryData = {
    description: project.description.length > 120 
      ? project.description.substring(0, 120) + '...' 
      : project.description,
    features: project.features?.slice(0, 2) || [],
    tech: project.tech.slice(0, 6),
    metadata: [
      ...(project.role ? [{ label: "Role", value: project.role, icon: Target }] : []),
      ...(project.teamSize ? [{ label: "Team", value: `${project.teamSize} people`, icon: Users }] : []),
      ...(project.duration ? [{ label: "Duration", value: project.duration, icon: Clock }] : []),
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl h-auto max-h-[85vh] p-0 bg-background border shadow-2xl rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Header */}
            <DialogHeader className="flex flex-row items-center justify-between gap-4 p-4 sm:p-6 border-b bg-background/95 backdrop-blur">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Project Navigation */}
                {(hasPrev || hasNext) && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onPrev}
                      disabled={!hasPrev}
                      className="h-8 w-8 hover:bg-accent"
                      title="Previous project (←)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onNext}
                      disabled={!hasNext}
                      className="h-8 w-8 hover:bg-accent"
                      title="Next project (→)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-lg sm:text-xl font-bold truncate">
                    {project.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {project.category}
                    </Badge>
                    {project.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-accent flex-shrink-0"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </Button> */}
            </DialogHeader>

            {/* Content */}
            <ScrollArea className="flex-1 max-h-[60vh]">
              <div className="flex flex-col">
                {/* Image Gallery */}
                <div
                  className="relative aspect-video bg-muted/20 flex-shrink-0 overflow-hidden"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={images[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-300",
                          imageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => setImageLoaded(true)}
                        priority
                        sizes="(max-width: 768px) 95vw, 85vw"
                      />
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Navigation */}
                  {canNavigateImages && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm h-8 w-8 shadow-lg"
                        onClick={() => handleImageNavigation("prev")}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm h-8 w-8 shadow-lg"
                        onClick={() => handleImageNavigation("next")}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "rounded-full transition-all duration-200",
                              index === currentImageIndex
                                ? "w-6 h-1.5 bg-primary"
                                : "w-1.5 h-1.5 bg-background/60 hover:bg-background/80"
                            )}
                            onClick={() => {
                              setImageLoaded(false);
                              setCurrentImageIndex(index);
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Quick Actions */}
                  {/* {hasActionButtons && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {project.liveUrl && (
                        <Button
                          size="lg"
                          className="flex-1 gap-3 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleExternalLink(project.liveUrl!)}
                        >
                          <Play className="w-5 h-5" />
                          Live Demo
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 gap-3"
                          onClick={() => handleExternalLink(project.githubUrl!)}
                        >
                          <Github className="w-5 h-5" />
                          Source Code
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )} */}

                  {/* Project Metadata */}
                  {/* {summaryData.metadata.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {summaryData.metadata.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
                        >
                          <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                            <div className="font-medium text-sm truncate">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}

                  {/* Project Overview */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Project Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {summaryData.description}
                    </p>
                  </section>

                  {/* Technology Stack */}
                  <section className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {summaryData.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2.5 py-1 text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </section>

                  {/* Key Features Preview */}
                  {summaryData.features.length > 0 && (
                    <section className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {summaryData.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground text-sm"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  
                </div>
              </div>
            </ScrollArea>

            {/* Footer with CTA */}
            <div className="border-t bg-muted/30 p-2 sm:p-2">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Rocket className="w-4 h-4" />
                  <span>ต้องการดูรายละเอียดเพิ่มเติม?</span>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  {onViewFullDetail && (
                    <Button
                      onClick={handleViewFullDetail}
                      className="flex-1 sm:flex-none gap-2"
                      size="lg"
                    >
                      <FileText className="w-4 h-4" />
                      ดูรายละเอียดเต็ม
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {/* Additional demo links */}
                  <div className="flex gap-2">
                    {project.videoUrl && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleExternalLink(project.videoUrl!)}
                        title="Video Walkthrough"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleExternalLink(project.demoUrl!)}
                        title="Interactive Demo"
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                    )}
                    {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => handleExternalLink(project.githubUrl!)}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}