// src/components/sections/projects/project-list.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { projectsMockData } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectFilter } from "./project-filter";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import สำหรับ ProjectDetailDialog เพื่อลด initial bundle size
const ProjectDetailDialog = dynamic(
  () => import("./project-detail-dialog").then((mod) => ({ default: mod.ProjectDetailDialog })),
  {
    loading: () => null, // ไม่แสดง loading indicator เพราะ dialog จะแสดงเมื่อ open=true เท่านั้น
    ssr: false, // ไม่ต้อง render บน server เพราะเป็น dialog
  }
);
import { Button } from "@/components/ui/button";
import { Search, X, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectList() {
  const categories = [...new Set(projectsMockData.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle URL query params
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSelectedProjectId(Number(id));
    }
  }, [searchParams]);

  // Filter projects
  const filteredProjects = projectsMockData.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const selectedProject =
    projectsMockData.find((p) => p.id === selectedProjectId) || null;

  // Navigation functions
  const currentIndex = selectedProjectId
    ? filteredProjects.findIndex((p) => p.id === selectedProjectId)
    : -1;

  const hasNext = currentIndex < filteredProjects.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      const nextProject = filteredProjects[currentIndex + 1];
      setSelectedProjectId(nextProject.id);
      router.push(`/public-pages/projects?id=${nextProject.id}`);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      const prevProject = filteredProjects[currentIndex - 1];
      setSelectedProjectId(prevProject.id);
      router.push(`/public-pages/projects?id=${prevProject.id}`);
    }
  };

  const handleClose = () => {
    setSelectedProjectId(null);
    router.push("/public-pages/projects");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8 mx-auto">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Search and Controls Bar */}
        <Card className="bg-background/50 backdrop-blur-sm border-muted/30 m-4">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 w-full lg:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search projects by title, description, or technology..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-background/50"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Clear Filters */}
                {(searchQuery || activeCategory !== "All") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter and Results */}
        <div className="flex flex-col sm:flex-row gap-4 m-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filter by:
            </span>
          </div>

          <ProjectFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary" className="font-normal">
              {filteredProjects.length} of {projectsMockData.length} projects
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${searchQuery}-${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6 m-4"
                : "space-y-4"
            }
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  router.push(`/public-pages/projects?id=${project.id}`);
                }}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 space-y-6"
          >
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">No projects found</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-lg">
                We couldn&apos;t find any projects matching your search
                criteria.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                size="lg"
              >
                Clear all filters
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/public-pages/contact")}
              >
                Suggest a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog
        project={selectedProject}
        open={!!selectedProjectId}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}
