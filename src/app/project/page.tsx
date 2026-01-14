// src/app/public-pages/projects/page.tsx
"use client"

import { ProjectList } from "@/components/sections/projects/project-list"
import { motion } from "framer-motion"
import { Suspense } from "react"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 pt-8">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              My <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Projects</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              A collection of my recent work and creative endeavors. Each project represents
              a unique challenge and learning opportunity.
            </motion.p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <ProjectList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}