// tech-stack.tsx
"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Cloud, Palette } from "lucide-react"

const techCategories = [
  {
    icon: Code2,
    title: "Frontend",
    color: "text-blue-500",
    techs: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vue.js", "Vuetify"]
  },
  {
    icon: Database,
    title: "Backend",
    color: "text-green-500",
    techs: ["Node.js", "Express", "Golang", "PostgreSQL", "MySQL", "REST API"]
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "text-purple-500",
    techs: ["Supabase", "Firebase", "Docker", "GitHub Actions", "Vercel", "Netlify"]
  },
  {
    icon: Palette,
    title: "Tools & Others",
    color: "text-orange-500",
    techs: ["Git", "GitHub", "GitLab", "Figma", "Postman", "VS Code"]
  }
]

export default function TechStack() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tech Stack{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              ⚡
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life and solve complex problems
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-muted/50 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-primary/10 ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="px-3 py-1.5 text-sm font-medium cursor-default hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}