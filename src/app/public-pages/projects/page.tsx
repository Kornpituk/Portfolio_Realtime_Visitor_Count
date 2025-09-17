// src/app/projects/page.tsx
import { ProjectList } from "@/components/sections/projects/project-list"

export default function ProjectsPage() {
    return (
        <main className="container mx-auto py-12">
            <h1 className="text-3xl font-bold my-8">My Projects</h1>
            <ProjectList />
        </main>
    )
}
