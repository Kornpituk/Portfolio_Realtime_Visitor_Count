// src/components/sections/projects/project-filter.tsx
"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"

type Props = {
  categories: string[]
  active: string
  onChange: (value: string) => void
}

export function ProjectFilter({ categories, active, onChange }: Props) {
  const allCategories = ["All", ...categories]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Filter by Category</h3>
      </div> */}
      
      <Tabs value={active} onValueChange={onChange} className="w-full">
        <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 gap-1">
          {allCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground transition-all duration-200"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  )
}