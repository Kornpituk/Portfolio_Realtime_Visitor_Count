// src/data/projects.ts

import { Project } from "@/types/project"

// export type Project = {
//     id: number
//     title: string
//     description: string
//     image: string
//     category: string
//     link: string
//     tech: string[]
// }

// src/data/projects.ts
export const projectsMockData: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "My personal portfolio built with Next.js, Tailwind, shadcn/ui.",
    image: "/images/portfolio.png",
    category: "Web Development",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    link: "/public-pages/projects?id=1",
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "Full-stack e-commerce with cart, checkout, and admin dashboard.",
    image: "/images/ecommerce.png",
    category: "E-commerce",
    tech: ["React", "Node.js", "MongoDB"],
    link: "/public-pages/projects?id=2",
  },
  {
    id: 3,
    title: "Mobile Game",
    description: "A casual 2D mobile game inspired by Stardew Valley.",
    image: "/images/game.png",
    category: "Game",
    tech: ["Unity", "C#"],
    link: "/public-pages/projects?id=3",
  },
]