"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
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
  Award,
  TrendingUp,
  BarChart,
  LineChart,
  Cpu,
  Database,
  Server,
  Smartphone,
  Globe,
  Code2,
  Palette,
  Shield,
  Zap as Lightning,
  CheckCircle,
  Download,
  Eye,
  Maximize2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { StatsGrid } from "./detail-dialog-hooks/StatsGrid";

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
  const [showFullDetail, setShowFullDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [language, setLanguage] = useState<"th" | "en">("en");

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Reset states when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
      setShowFullDetail(false);
      setActiveTab("overview");
    }
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showFullDetail) {
          setShowFullDetail(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowLeft" && hasPrev && !showFullDetail) onPrev?.();
      if (e.key === "ArrowRight" && hasNext && !showFullDetail) onNext?.();
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleViewFullDetail();
      }
      if (e.key === "1" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleStatClick("overview");
      }
      if (e.key === "2" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleStatClick("tech");
      }
      if (e.key === "3" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleStatClick("features");
      }
      if (e.key === "4" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleStatClick("impact");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [
    open,
    project,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev,
    showFullDetail,
  ]);

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
    setShowFullDetail(true);
    if (onViewFullDetail && project) {
      onViewFullDetail(project);
    }
  }, [project, onViewFullDetail]);

  // สร้าง handler สำหรับการคลิก stat card
  const handleStatClick = useCallback(
    (tab: "features" | "tech" | "impact" | "overview") => {
      // เปิด Drawer และตั้งค่า tab ที่ต้องการ
      setShowFullDetail(true);
      setActiveTab(tab);
    },
    []
  );

  if (!project) return null;

  const images = project.images || [project.image];
  const canNavigateImages = images.length > 1;

  // ประเภทของเทคโนโลยี (สำหรับจัดกลุ่ม)
  const categorizeTech = (tech: string[]) => {
    const categories: Record<string, string[]> = {
      frontend: [],
      backend: [],
      database: [],
      devops: [],
      tools: [],
      other: [],
    };

    const frontendKeywords = [
      "react",
      "vue",
      "pinia",
      "vuetify",
      "angular",
      "next",
      "svelte",
      "typescript",
      "javascript",
      "tailwind",
      "css",
      "remix-icon",
      "html",
    ];
    const backendKeywords = [
      "node",
      "express",
      "nestjs",
      "python",
      "django",
      "fastapi",
      "java",
      "spring",
      "php",
      "laravel",
    ];
    const databaseKeywords = [
      "mysql",
      "postgresql",
      "mongodb",
      "redis",
      "firebase",
      "supabase",
      "prisma",
    ];
    const devopsKeywords = [
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "vercel",
      "nginx",
    ];
    const toolsKeywords = [
      "git",
      "github",
      "gitlab",
      "figma",
      "jest",
      "cypress",
      "soucetree",
    ];

    tech.forEach((item) => {
      const lowerItem = item.toLowerCase();
      if (frontendKeywords.some((keyword) => lowerItem.includes(keyword))) {
        categories.frontend.push(item);
      } else if (
        backendKeywords.some((keyword) => lowerItem.includes(keyword))
      ) {
        categories.backend.push(item);
      } else if (
        databaseKeywords.some((keyword) => lowerItem.includes(keyword))
      ) {
        categories.database.push(item);
      } else if (
        devopsKeywords.some((keyword) => lowerItem.includes(keyword))
      ) {
        categories.devops.push(item);
      } else if (toolsKeywords.some((keyword) => lowerItem.includes(keyword))) {
        categories.tools.push(item);
      } else {
        categories.other.push(item);
      }
    });

    return categories;
  };

  // Helper functions สำหรับจัดการ challenges
  const getChallengesArray = (
    challenges: string | string[] | undefined
  ): string[] => {
    if (!challenges) return [];
    if (Array.isArray(challenges)) return challenges;
    // ถ้าเป็น string เดี่ยว ให้แบ่งด้วย newline หรือ bullet points
    return challenges.split("\n").filter((line) => line.trim());
  };

  const getChallengeCount = (
    challenges: string | string[] | undefined
  ): number => {
    if (!challenges) return 0;
    if (Array.isArray(challenges)) return challenges.length;
    // ถ้าเป็น string เดี่ยว ให้นับจำนวนบรรทัด
    return challenges.split("\n").filter((line) => line.trim()).length;
  };

  // สำหรับ Drawer - ข้อมูลเต็มรูปแบบ
  const techCategories = categorizeTech(project.tech);
  const challengesArray = getChallengesArray(project.challenges);
  const challengeCount = getChallengeCount(project.challenges);
  const featureCount = project.features?.length || 0;

  return (
    <>
      {/* Dialog หลัก (สำหรับแสดงข้อมูลย่อ) */}
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
              <DialogHeader className="flex flex-row items-center justify-between gap-4 p-4 sm:p-6 border-b bg-gradient-to-r from-background to-background/95 backdrop-blur">
                <div className="flex items-center gap-3 flex-1 min-w-0">
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
                    <DialogTitle className="text-lg text-wrap sm:text-xl font-bold truncate bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {project.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {project.category}
                      </Badge>
                      {project.date && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {project.date}
                        </span>
                      )}
                      {project.status && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {project.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Content */}
              <ScrollArea className="flex-1 max-h-[60vh]">
                <div className="flex flex-col">
                  {/* Image Gallery */}
                  <div
                    className="relative aspect-video bg-gradient-to-br from-muted/20 to-muted/40 flex-shrink-0 overflow-hidden"
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
                          alt={`${project.title} - Image ${
                            currentImageIndex + 1
                          }`}
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
                    {/* Quick Stats */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <StatsGrid
                          featureCount={featureCount}
                          project={project}
                          challengeCount={challengeCount}
                          onStatClick={handleStatClick}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Click any card to view detailed information</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Project Overview */}
                    <section className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Project Snapshot
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {project.description.length > 150
                          ? `${project.description.substring(0, 150)}...`
                          : project.description}
                      </p>
                    </section>

                    {/* Technology Stack Preview */}
                    <section className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Tech Stack Highlights
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 6).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="px-2.5 py-1 text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:scale-105 transition-transform"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 6 && (
                          <Badge
                            variant="outline"
                            className="px-2.5 py-1 text-xs"
                          >
                            +{project.tech.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </section>

                    {/* Key Features Preview */}
                    {/* {project.features && project.features.length > 0 && (
                      <section className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5 text-primary" />
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-muted-foreground text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )} */}
                  </div>
                </div>
              </ScrollArea>

              {/* Footer with CTA */}
              <div className="border-t bg-gradient-to-r from-muted/30 to-muted/10 p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        Frontend Expertise Showcase
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleViewFullDetail}
                          className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                          size="lg"
                        >
                          <Eye className="w-4 h-4" />
                          View Full Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click View Full Details</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              onClick={() =>
                                handleExternalLink(project.liveUrl!)
                              }
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Live Demo</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {project.githubUrl && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleExternalLink(project.githubUrl!)
                              }
                              title="Source Code"
                            >
                              <Github className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Source Code</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Drawer สำหรับแสดงข้อมูลเต็มรูปแบบ */}
      <Drawer open={showFullDetail} onOpenChange={setShowFullDetail}>
        <DrawerContent className="max-h-[100vh]">
          <div className="mx-auto w-full max-w-5xl">
            {/* Drawer Header */}
            <DrawerHeader className="text-left border-b">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <DrawerTitle className="text-2xl font-bold">
                        {project.title}
                      </DrawerTitle>
                      <DrawerDescription className="flex items-center gap-3 mt-1">
                        <Badge variant="secondary">{project.category}</Badge>
                        {project.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {project.date}
                          </span>
                        )}
                        {project.status && (
                          <Badge variant="outline">{project.status}</Badge>
                        )}
                      </DrawerDescription>
                    </div>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <ScrollArea className="h-[calc(90vh-180px)]">
              <div className="p-6">
                {/* Tabs สำหรับจัดกลุ่มข้อมูล */}
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-6"
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="overview" className="gap-2 relative">
                      <Sparkles className="w-4 h-4" />
                      Overview
                      {activeTab === "overview" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="tech" className="gap-2 relative">
                      <Cpu className="w-4 h-4" />
                      Tech Stack
                      {activeTab === "tech" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="features" className="gap-2 relative">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Features
                      {activeTab === "features" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="impact" className="gap-2 relative">
                      <TrendingUp className="w-4 h-4" />
                      Impact
                      {activeTab === "impact" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "overview" && (
                        <TabsContent value="overview" className="space-y-6">
                          {/* Language Toggle */}
                          <div className="flex justify-end">
                            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
                              <Button
                                variant={
                                  language === "en" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("en")}
                                className="h-8 text-xs"
                              >
                                🇬🇧 EN
                              </Button>
                              <Button
                                variant={
                                  language === "th" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("th")}
                                className="h-8 text-xs"
                              >
                                🇹🇭 TH
                              </Button>
                            </div>
                          </div>

                          {/* Hero Section */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8"
                          >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                  <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold">
                                    {language === "th"
                                      ? "📌 ภาพรวมโปรเจค"
                                      : "📌 Project Overview"}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {project.category}
                                  </p>
                                </div>
                              </div>

                              {/* Main Description - ใช้จาก project.overview หรือ project.description */}
                              <div className="prose prose-sm max-w-none">
                                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {project.overview
                                    ? project.overview[language]
                                    : project.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Core Processes - ดึงจาก project.features */}
                          {project.features && project.features.length > 0 && (
                            <section>
                              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-primary" />
                                {language === "th"
                                  ? "กระบวนการหลักของระบบ"
                                  : "Core System Processes"}
                              </h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-xl border bg-gradient-to-br from-background to-muted/10 hover:shadow-md transition-all group cursor-pointer"
                                    onClick={() => setActiveTab("features")}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="text-3xl group-hover:scale-110 transition-transform">
                                        {feature.emoji}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-semibold mb-1">
                                          {feature.featureTitle}
                                        </h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                          {
                                            feature.description[language].split(
                                              "\n\n"
                                            )[0]
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* Project Goals - ใช้จาก project.goals หรือ default goals */}
                          <section className="p-6 rounded-xl border bg-gradient-to-r from-green-500/5 to-green-500/10">
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <Target className="w-5 h-5 text-green-500" />
                              {language === "th"
                                ? "🎯 เป้าหมายหลักของโปรเจค"
                                : "🎯 Primary Project Goals"}
                            </h4>
                            <div className="space-y-3">
                              {(project.goals
                                ? project.goals[language]
                                : [
                                    language === "th"
                                      ? "เพิ่มประสิทธิภาพการทำงาน"
                                      : "Improve operational efficiency",
                                    language === "th"
                                      ? "ลดข้อผิดพลาดจากการใช้เอกสาร"
                                      : "Reduce human error from manual processes",
                                    language === "th"
                                      ? "เพิ่มความโปร่งใสของข้อมูลแบบ Real-time"
                                      : "Provide real-time visibility",
                                    language === "th"
                                      ? "ทำให้ทุกแผนกสามารถทำงานร่วมกันได้อย่างเป็นระบบ"
                                      : "Enable structured collaboration",
                                    language === "th"
                                      ? "ตรวจสอบย้อนหลังและติดตามงานได้"
                                      : "Provide traceable workflows",
                                  ]
                              ).map((goal, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground leading-relaxed flex-1">
                                    {goal}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </section>

                          {/* Project Metadata Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.role && (
                              <div className="p-4 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
                                <div className="flex items-center gap-3 mb-2">
                                  <Target className="w-5 h-5 text-primary" />
                                  <h4 className="font-semibold">
                                    {language === "th"
                                      ? "บทบาทของฉัน"
                                      : "My Role"}
                                  </h4>
                                </div>
                                <p className="text-muted-foreground">
                                  {project.role}
                                </p>
                              </div>
                            )}

                            {project.teamSize && (
                              <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                  <Users className="w-5 h-5 text-blue-500" />
                                  <h4 className="font-semibold">
                                    {language === "th"
                                      ? "ขนาดทีม"
                                      : "Team Size"}
                                  </h4>
                                </div>
                                <p className="text-muted-foreground">
                                  {project.teamSize}{" "}
                                  {language === "th" ? "คน" : "people"}
                                </p>
                              </div>
                            )}

                            {project.duration && (
                              <div className="p-4 rounded-lg border bg-gradient-to-br from-orange-500/5 to-orange-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                  <Clock className="w-5 h-5 text-orange-500" />
                                  <h4 className="font-semibold">
                                    {language === "th"
                                      ? "ระยะเวลา"
                                      : "Duration"}
                                  </h4>
                                </div>
                                <p className="text-muted-foreground">
                                  {project.duration}
                                </p>
                              </div>
                            )}

                            {project.scope && (
                              <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-500/5 to-purple-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                  <Globe className="w-5 h-5 text-purple-500" />
                                  <h4 className="font-semibold">
                                    {language === "th"
                                      ? "ขอบเขตโปรเจค"
                                      : "Project Scope"}
                                  </h4>
                                </div>
                                <p className="text-muted-foreground">
                                  {project.scope}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Technical Highlights - ดึงจาก project.tech */}
                          {project.tech && project.tech.length > 0 && (
                            <section className="p-6 rounded-xl border bg-gradient-to-r from-primary/5 to-primary/2">
                              <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-primary" />
                                {language === "th"
                                  ? "⚡ จุดเด่นทางเทคนิค"
                                  : "⚡ Technical Highlights"}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                  language === "th"
                                    ? "Complex Workflow Management"
                                    : "Complex workflow management",
                                  language === "th"
                                    ? "Role-based Access Control (RBAC)"
                                    : "Role-based access control (RBAC)",
                                  language === "th"
                                    ? "Multi-step Approval Process"
                                    : "Multi-step approval process",
                                  language === "th"
                                    ? "Real-time Notification System"
                                    : "Real-time notification system",
                                  language === "th"
                                    ? "Dynamic Form Validation"
                                    : "Dynamic form validation",
                                  language === "th"
                                    ? "Cross-department Data Sync"
                                    : "Cross-department data synchronization",
                                ].map((item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                                  >
                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground leading-relaxed">
                                      {item}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* Performance Metrics */}
                          {project.performance &&
                            Object.keys(project.performance).length > 0 && (
                              <section className="p-6 rounded-xl border bg-gradient-to-r from-purple-500/5 to-purple-500/10">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                  <BarChart className="w-5 h-5 text-purple-500" />
                                  {language === "th"
                                    ? "📊 Performance Metrics"
                                    : "📊 Performance Metrics"}
                                </h4>
                                <div className="space-y-3">
                                  {Object.entries(project.performance).map(
                                    ([metric, value], index) => (
                                      <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="capitalize font-medium">
                                            {metric
                                              .replace(/([A-Z])/g, " $1")
                                              .trim()}
                                          </span>
                                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                                            {value}
                                          </span>
                                        </div>
                                        <Progress
                                          value={
                                            typeof value === "number"
                                              ? value
                                              : 85
                                          }
                                          className="h-2"
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              </section>
                            )}

                          {/* Quick Navigation */}
                          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("features")}
                              className="gap-2"
                            >
                              <Zap className="w-4 h-4" />
                              {language === "th"
                                ? "ดู Features"
                                : "View Features"}
                              <Badge variant="secondary" className="ml-1">
                                {project.features?.length || 0}
                              </Badge>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("tech")}
                              className="gap-2"
                            >
                              <Cpu className="w-4 h-4" />
                              {language === "th"
                                ? "ดู Tech Stack"
                                : "View Tech Stack"}
                              <Badge variant="secondary" className="ml-1">
                                {project.tech.length}
                              </Badge>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("impact")}
                              className="gap-2"
                            >
                              <TrendingUp className="w-4 h-4" />
                              {language === "th" ? "ดู Impact" : "View Impact"}
                              {project.features?.some((f) => f.caseStudy) && (
                                <Badge variant="secondary" className="ml-1">
                                  {
                                    project.features.filter((f) => f.caseStudy)
                                      .length
                                  }{" "}
                                  Case Studies
                                </Badge>
                              )}
                            </Button>
                          </div>
                        </TabsContent>
                      )}
                      {activeTab === "tech" && (
                        <TabsContent value="tech" className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Frontend Technologies */}
                            {techCategories.frontend.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Palette className="w-4 h-4 text-blue-500" />
                                  Frontend
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.frontend.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-500 border-blue-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Backend Technologies */}
                            {techCategories.backend.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Server className="w-4 h-4 text-green-500" />
                                  Backend
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.backend.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-green-500/5 text-green-500 border-green-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Database */}
                            {techCategories.database.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Database className="w-4 h-4 text-orange-500" />
                                  Database
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.database.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-orange-500/5 text-orange-500 border-orange-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* DevOps & Tools */}
                            {techCategories.devops.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-purple-500" />
                                  DevOps & Infrastructure
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.devops.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-purple-500/5 text-purple-500 border-purple-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {techCategories.tools.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-emerald-500" />
                                  Tools
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.tools.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-500 border-emerald-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {techCategories.devops.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-purple-500" />
                                  DevOps & Infrastructure
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {techCategories.devops.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-purple-500/5 text-purple-500 border-purple-500/20"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Performance Metrics (ถ้ามี) */}
                          {project.performance && (
                            <div className="mt-6 p-4 rounded-lg border bg-gradient-to-r from-muted/20 to-muted/10">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <BarChart className="w-5 h-5 text-primary" />
                                Performance Metrics
                              </h4>
                              <div className="space-y-3">
                                {Object.entries(project.performance).map(
                                  ([metric, value]) => (
                                    <div key={metric} className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="capitalize">
                                          {metric}
                                        </span>
                                        <span className="font-semibold">
                                          {value}
                                        </span>
                                      </div>
                                      <Progress
                                        value={
                                          typeof value === "number" ? value : 85
                                        }
                                        className="h-2"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </TabsContent>
                      )}
                      {activeTab === "features" && (
                        <TabsContent value="features" className="space-y-6">
                          {/* Language Toggle */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="gap-1">
                                <Zap className="w-3 h-3" />
                                {project.features?.length || 0} Features
                              </Badge>
                              {project.features?.some((f) => f.caseStudy) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setActiveTab("impact")}
                                  className="gap-2 text-xs"
                                >
                                  📚{" "}
                                  {
                                    project.features.filter((f) => f.caseStudy)
                                      .length
                                  }{" "}
                                  Case Studies
                                  <ArrowRight className="w-3 h-3" />
                                </Button>
                              )}
                            </div>

                            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
                              <Button
                                variant={
                                  language === "en" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("en")}
                                className="h-8 text-xs"
                              >
                                🇬🇧 EN
                              </Button>
                              <Button
                                variant={
                                  language === "th" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("th")}
                                className="h-8 text-xs"
                              >
                                🇹🇭 TH
                              </Button>
                            </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.features?.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl border bg-gradient-to-br from-background to-muted/10 hover:from-primary/5 hover:to-primary/2 hover:shadow-lg transition-all group"
                              >
                                <div className="flex items-start gap-4">
                                  {/* Emoji Icon */}
                                  <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {feature.emoji}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 space-y-3">
                                    {/* Title with Badge */}
                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                      <h4 className="text-lg font-bold flex items-center gap-2">
                                        {feature.featureTitle}
                                      </h4>
                                      <div className="flex items-center gap-1">
                                        <Badge
                                          variant="outline"
                                          className="text-xs font-normal"
                                        >
                                          #{index + 1}
                                        </Badge>
                                        {feature.caseStudy && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge
                                                variant="secondary"
                                                className="text-xs cursor-pointer hover:bg-secondary/80"
                                                onClick={() =>
                                                  setActiveTab("impact")
                                                }
                                              >
                                                📚
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                View Case Study in Impact tab
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        )}
                                      </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {feature.description[language].length >
                                      150
                                        ? `${feature.description[
                                            language
                                          ].substring(0, 150)}...`
                                        : feature.description[language]}
                                    </p>

                                    {/* Read More Link */}
                                    {feature.description[language].length >
                                      150 && (
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="h-auto p-0 text-xs"
                                        onClick={() => setActiveTab("impact")}
                                      >
                                        {language === "th"
                                          ? "อ่านเพิ่มเติม"
                                          : "Read more"}
                                        <ChevronRight className="w-3 h-3 ml-1" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Technical Challenges */}
                          {challengesArray.length > 0 && (
                            <div className="mt-8">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold flex items-center gap-2">
                                  <Target className="w-5 h-5 text-orange-500" />
                                  {language === "th"
                                    ? "ความท้าทายทางเทคนิค"
                                    : "Technical Challenges"}
                                </h4>
                                <Badge variant="outline">
                                  {challengeCount}{" "}
                                  {challengeCount === 1
                                    ? "Challenge"
                                    : "Challenges"}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {challengesArray.map((challenge, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-lg border bg-gradient-to-r from-orange-500/5 to-orange-500/2 hover:from-orange-500/10 hover:to-orange-500/5 transition-all"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="p-2 rounded-md bg-orange-500/10 flex-shrink-0">
                                        <Lightning className="w-4 h-4 text-orange-500" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            #{index + 1}
                                          </Badge>
                                          <Badge
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            Solved
                                          </Badge>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                          {challenge}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Feature Summary Stats */}
                          <div className="mt-8 p-6 rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10">
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <BarChart className="w-5 h-5 text-primary" />
                              {language === "th"
                                ? "สรุปภาพรวม Features"
                                : "Features Overview"}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-3 rounded-lg bg-background/50">
                                <div className="text-3xl font-bold text-primary">
                                  {project.features?.length || 0}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {language === "th"
                                    ? "Features ทั้งหมด"
                                    : "Total Features"}
                                </div>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-background/50">
                                <div className="text-3xl font-bold text-blue-500">
                                  {project.features?.filter((f) => f.caseStudy)
                                    .length || 0}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {language === "th"
                                    ? "Case Studies"
                                    : "Case Studies"}
                                </div>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-background/50">
                                <div className="text-3xl font-bold text-green-500">
                                  {project.tech.length}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {language === "th"
                                    ? "เทคโนโลยี"
                                    : "Technologies"}
                                </div>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-background/50">
                                <div className="text-3xl font-bold text-orange-500">
                                  {challengeCount}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {language === "th" ? "ปัญหาที่แก้" : "Solved"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action - View Case Studies */}
                          {project.features?.some((f) => f.caseStudy) && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-6 rounded-xl border bg-gradient-to-r from-yellow-500/5 to-yellow-500/10 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-yellow-500/10">
                                  <FileText className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                  <h5 className="font-semibold">
                                    {language === "th"
                                      ? "ดูกรณีศึกษาโดยละเอียด"
                                      : "View Detailed Case Studies"}
                                  </h5>
                                  <p className="text-sm text-muted-foreground">
                                    {language === "th"
                                      ? "ดูวิธีแก้ปัญหาและผลลัพธ์ของแต่ละ Feature"
                                      : "See how we solved problems and achieved results"}
                                  </p>
                                </div>
                              </div>
                              <Button
                                onClick={() => setActiveTab("impact")}
                                className="gap-2"
                              >
                                {language === "th"
                                  ? "ดูกรณีศึกษา"
                                  : "View Case Studies"}
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          )}

                          {/* Quick Navigation */}
                          <div className="flex items-center justify-center gap-2 pt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("tech")}
                              className="gap-2"
                            >
                              <Cpu className="w-4 h-4" />
                              {language === "th"
                                ? "ดู Tech Stack"
                                : "View Tech Stack"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("impact")}
                              className="gap-2"
                            >
                              <TrendingUp className="w-4 h-4" />
                              {language === "th" ? "ดูผลกระทบ" : "View Impact"}
                            </Button>
                          </div>
                        </TabsContent>
                      )}
                      {activeTab === "impact" && (
                        <TabsContent value="impact" className="space-y-6">
                          {/* Language Toggle */}
                          <div className="flex justify-end">
                            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
                              <Button
                                variant={
                                  language === "en" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("en")}
                                className="h-8 text-xs"
                              >
                                🇬🇧 EN
                              </Button>
                              <Button
                                variant={
                                  language === "th" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setLanguage("th")}
                                className="h-8 text-xs"
                              >
                                🇹🇭 TH
                              </Button>
                            </div>
                          </div>

                          {/* Hero Impact Card */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8"
                          >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                  <Rocket className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold">
                                    {language === "th"
                                      ? "ผลกระทบของโปรเจค"
                                      : "Project Impact"}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {language === "th"
                                      ? "การเปลี่ยนแปลงที่เกิดขึ้นจริง"
                                      : "Real-world transformation achieved"}
                                  </p>
                                </div>
                              </div>
                              {project.impact && (
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                  {project.impact}
                                </p>
                              )}
                            </div>
                          </motion.div>

                          {/* Business Impact Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="p-6 rounded-xl border bg-gradient-to-br from-green-500/10 to-green-500/5"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                  <TrendingUp className="w-6 h-6 text-green-500" />
                                </div>
                                <h4 className="font-semibold">
                                  {language === "th"
                                    ? "ประสิทธิภาพ"
                                    : "Efficiency"}
                                </h4>
                              </div>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                100%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === "th"
                                  ? "กระบวนการดิจิทัล แทนที่กระดาษ"
                                  : "Digitized paper-based processes"}
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="p-6 rounded-xl border bg-gradient-to-br from-blue-500/10 to-blue-500/5"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                  <Users className="w-6 h-6 text-blue-500" />
                                </div>
                                <h4 className="font-semibold">
                                  {language === "th" ? "ทีมงาน" : "Team Size"}
                                </h4>
                              </div>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {project.teamSize || "4"} People
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === "th"
                                  ? "ทีมงานที่ทำงานร่วมกัน"
                                  : "Collaborative team effort"}
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="p-6 rounded-xl border bg-gradient-to-br from-purple-500/10 to-purple-500/5"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                  <Clock className="w-6 h-6 text-purple-500" />
                                </div>
                                <h4 className="font-semibold">
                                  {language === "th" ? "ระยะเวลา" : "Timeline"}
                                </h4>
                              </div>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                {project.duration}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === "th"
                                  ? "ระยะเวลาพัฒนา"
                                  : "Development duration"}
                              </p>
                            </motion.div>
                          </div>

                          {/* Case Studies Section */}
                          {project.features?.some((f) => f.caseStudy) && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xl font-bold flex items-center gap-2">
                                  <FileText className="w-6 h-6 text-primary" />
                                  {language === "th"
                                    ? "📚 กรณีศึกษา"
                                    : "📚 Case Studies"}
                                </h4>
                                <Badge variant="secondary" className="text-sm">
                                  {
                                    project.features.filter((f) => f.caseStudy)
                                      .length
                                  }{" "}
                                  {language === "th" ? "กรณีศึกษา" : "Studies"}
                                </Badge>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {language === "th"
                                  ? "ความท้าทาย วิธีแก้ไข และผลลัพธ์ของแต่ละ Feature"
                                  : "Challenges, solutions, and results for each feature"}
                              </p>

                              {/* Case Studies Grid */}
                              <div className="space-y-6">
                                {project.features
                                  ?.filter((f) => f.caseStudy)
                                  .map((feature, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="rounded-xl border bg-gradient-to-br from-background to-muted/10 overflow-hidden hover:shadow-lg transition-all"
                                    >
                                      {/* Feature Header */}
                                      <div className="p-6 border-b bg-muted/30">
                                        <div className="flex items-center gap-4">
                                          <div className="text-4xl">
                                            {feature.emoji}
                                          </div>
                                          <div className="flex-1">
                                            <h5 className="text-lg font-bold mb-1">
                                              {feature.featureTitle}
                                            </h5>
                                            <p className="text-sm text-muted-foreground">
                                              {feature.description[
                                                language
                                              ].substring(0, 100)}
                                              ...
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Case Study Content */}
                                      <div className="p-6 space-y-4">
                                        {/* Problem */}
                                        <div className="p-4 rounded-xl border bg-gradient-to-br from-red-500/5 to-red-500/10">
                                          <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-red-500/10 flex-shrink-0">
                                              <AlertCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                              <h6 className="font-semibold text-red-900 dark:text-red-100">
                                                {language === "th"
                                                  ? "🎯 ปัญหาที่พบ"
                                                  : "🎯 Problem"}
                                              </h6>
                                              <p className="text-xs text-muted-foreground mt-0.5">
                                                {language === "th"
                                                  ? "ความท้าทายที่ต้องเผชิญ"
                                                  : "Challenges encountered"}
                                              </p>
                                            </div>
                                          </div>
                                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {
                                              feature.caseStudy?.problem[
                                                language
                                              ]
                                            }
                                          </p>
                                        </div>

                                        {/* Solution */}
                                        <div className="p-4 rounded-xl border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                                          <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
                                              <Lightbulb className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                              <h6 className="font-semibold text-blue-900 dark:text-blue-100">
                                                {language === "th"
                                                  ? "💡 วิธีแก้ไข"
                                                  : "💡 Solution"}
                                              </h6>
                                              <p className="text-xs text-muted-foreground mt-0.5">
                                                {language === "th"
                                                  ? "แนวทางที่ใช้ในการแก้ปัญหา"
                                                  : "Approach taken"}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {
                                              feature.caseStudy?.solution[
                                                language
                                              ]
                                            }
                                          </div>
                                        </div>

                                        {/* Result */}
                                        <div className="p-4 rounded-xl border bg-gradient-to-br from-green-500/5 to-green-500/10">
                                          <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-green-500/10 flex-shrink-0">
                                              <TrendingUp className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div>
                                              <h6 className="font-semibold text-green-900 dark:text-green-100">
                                                {language === "th"
                                                  ? "✨ ผลลัพธ์"
                                                  : "✨ Result"}
                                              </h6>
                                              <p className="text-xs text-muted-foreground mt-0.5">
                                                {language === "th"
                                                  ? "ผลที่ได้จากการแก้ไข"
                                                  : "Outcome achieved"}
                                              </p>
                                            </div>
                                          </div>
                                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {
                                              feature.caseStudy?.result[
                                                language
                                              ]
                                            }
                                          </p>
                                        </div>

                                        {/* Metrics */}
                                        {feature.caseStudy?.metrics &&
                                          feature.caseStudy.metrics.length >
                                            0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                              {feature.caseStudy.metrics.map(
                                                (metric, idx) => (
                                                  <div
                                                    key={idx}
                                                    className="p-3 rounded-lg border bg-gradient-to-br from-purple-500/5 to-purple-500/10 text-center"
                                                  >
                                                    <div className="text-xs text-muted-foreground mb-1">
                                                      {metric.label}
                                                    </div>
                                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                      {metric.value}
                                                    </div>
                                                    {metric.improvement && (
                                                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                        ↑ {metric.improvement}
                                                      </div>
                                                    )}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </div>
                                    </motion.div>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Key Achievements */}
                          <div>
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-yellow-500" />
                              {language === "th"
                                ? "ความสำเร็จหลัก"
                                : "Key Achievements"}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                {
                                  icon: <Layers className="w-4 h-4" />,
                                  text:
                                    language === "th"
                                      ? `ใช้เทคโนโลยีสมัยใหม่ ${project.tech.length} ตัว`
                                      : `Implemented ${project.tech.length} modern technologies`,
                                  color: "blue",
                                },
                                {
                                  icon: <Zap className="w-4 h-4" />,
                                  text:
                                    language === "th"
                                      ? `พัฒนา ${featureCount} Features หลัก`
                                      : `Delivered ${featureCount} key features`,
                                  color: "orange",
                                },
                                challengeCount > 0 && {
                                  icon: <Target className="w-4 h-4" />,
                                  text:
                                    language === "th"
                                      ? `แก้ไขปัญหาซับซ้อน ${challengeCount} อย่าง`
                                      : `Solved ${challengeCount} complex challenges`,
                                  color: "green",
                                },
                                project.role && {
                                  icon: <Users className="w-4 h-4" />,
                                  text:
                                    language === "th"
                                      ? `ทำงานในบทบาท ${project.role}`
                                      : `Led as ${project.role}`,
                                  color: "purple",
                                },
                              ]
                                .filter(Boolean)
                                .map((achievement, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-lg border bg-gradient-to-br from-background to-muted/10 hover:from-muted/20 hover:to-muted/10 transition-all"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="text-primary">
                                        {/* {achievement.icon} */}
                                      </div>
                                      <span className="text-sm font-medium">
                                        {/* {achievement.text} */}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </div>

                          {/* Frontend Excellence */}
                          {/* <div className="p-6 rounded-xl border bg-gradient-to-r from-primary/5 to-primary/2">
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <Code2 className="w-5 h-5 text-primary" />
                              {language === "th"
                                ? "ความเป็นเลิศด้าน Frontend"
                                : "Frontend Development Excellence"}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                language === "th"
                                  ? "ใช้ React/Vue patterns และ best practices สมัยใหม่"
                                  : "Modern React/Vue patterns and best practices",
                                language === "th"
                                  ? "Responsive design แบบ mobile-first"
                                  : "Responsive design with mobile-first approach",
                                language === "th"
                                  ? "เพิ่มประสิทธิภาพและ lazy loading"
                                  : "Performance optimization and lazy loading",
                                language === "th"
                                  ? "รองรับมาตรฐาน WCAG 2.1"
                                  : "Accessibility compliance (WCAG 2.1)",
                                language === "th"
                                  ? "Component-based architecture ที่ใช้ซ้ำได้"
                                  : "Reusable component-based architecture",
                                language === "th"
                                  ? "State management ที่มีประสิทธิภาพ"
                                  : "Efficient state management",
                              ].map((item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                                >
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground leading-relaxed">
                                    {item}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div> */}

                          {/* Call to Action */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 items-center justify-center p-6 rounded-xl border bg-gradient-to-r from-muted/30 to-muted/10"
                          >
                            <p className="text-sm text-muted-foreground">
                              {language === "th"
                                ? "สนใจรายละเอียดเพิ่มเติม?"
                                : "Want to explore more?"}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab("features")}
                                className="gap-2"
                              >
                                <Zap className="w-4 h-4" />
                                {language === "th"
                                  ? "ดู Features"
                                  : "View Features"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab("tech")}
                                className="gap-2"
                              >
                                <Cpu className="w-4 h-4" />
                                {language === "th"
                                  ? "ดู Tech Stack"
                                  : "View Tech"}
                              </Button>
                            </div>
                          </motion.div>
                        </TabsContent>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </div>
            </ScrollArea>

            {/* Drawer Footer */}
            <DrawerFooter className="border-t">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1 flex gap-3">
                  {project.liveUrl && (
                    <Button
                      onClick={() => handleExternalLink(project.liveUrl!)}
                      className="flex-1 gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      onClick={() => handleExternalLink(project.githubUrl!)}
                      className="flex-1 gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </Button>
                  )}
                  {project.videoUrl && (
                    <Button
                      variant="outline"
                      onClick={() => handleExternalLink(project.videoUrl!)}
                      className="flex-1 gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Video Walkthrough
                    </Button>
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowFullDetail(false)}
                  className="sm:w-auto"
                >
                  Back to Overview
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
