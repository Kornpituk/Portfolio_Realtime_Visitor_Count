import { Suspense } from "react"
import { ProjectList } from "@/components/sections/projects/project-list"

export default function ProjectsPage() {
  return (
    <main className="container mx-auto py-12">
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectList />
      </Suspense>
    </main>
  )
}
