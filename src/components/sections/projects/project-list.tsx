// src/components/sections/projects/project-list.tsx
"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { projectsMockData } from "@/data/projects"
import { ProjectCard } from "./project-card"
import { ProjectFilter } from "./project-filter"
import { ProjectDetailDialog } from "./project-detail-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProjectList() {
  const categories = [...new Set(projectsMockData.map((p) => p.category))]
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()

  // Handle URL query params
  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setSelectedProjectId(Number(id))
    }
  }, [searchParams])

  // Filter projects
  const filteredProjects = projectsMockData.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(tech => 
                           tech.toLowerCase().includes(searchQuery.toLowerCase())
                         )
    return matchesCategory && matchesSearch
  })

  const selectedProject = projectsMockData.find((p) => p.id === selectedProjectId) || null

  // Navigation functions
  const currentIndex = selectedProjectId 
    ? filteredProjects.findIndex(p => p.id === selectedProjectId) 
    : -1

  const hasNext = currentIndex < filteredProjects.length - 1
  const hasPrev = currentIndex > 0

  const handleNext = () => {
    if (hasNext) {
      const nextProject = filteredProjects[currentIndex + 1]
      setSelectedProjectId(nextProject.id)
      router.push(`/public-pages/projects?id=${nextProject.id}`)
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      const prevProject = filteredProjects[currentIndex - 1]
      setSelectedProjectId(prevProject.id)
      router.push(`/public-pages/projects?id=${prevProject.id}`)
    }
  }

  const handleClose = () => {
    setSelectedProjectId(null)
    router.push("/public-pages/projects")
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects by title, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
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

        {/* Category Filter */}
        <ProjectFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projectsMockData.length} projects
          </p>
          {(searchQuery || activeCategory !== "All") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("All")
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => {
                  setSelectedProjectId(project.id)
                  router.push(`/public-pages/projects?id=${project.id}`)
                }}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No projects found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              No projects match your current filters. Try adjusting your search or category filter.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("All")
              }}
            >
              Clear all filters
            </Button>
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
  )
}