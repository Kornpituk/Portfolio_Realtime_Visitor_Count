// skills.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Rocket } from "lucide-react"
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiSupabase,
  SiNodedotjs,
  SiGo,
  SiGithub,
  SiGitlab,
  SiSourcetree,
  SiVuetify,
} from "react-icons/si"

const skills = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "React", icon: SiReact, color: "text-blue-500" },
  { name: "Vue", icon: SiVuedotjs, color: "text-green-500" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "text-cyan-500" },
  { name: "Vuetify", icon: SiVuetify, color: "text-blue-500" },
  { name: "Supabase", icon: SiSupabase, color: "text-green-600" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "Golang", icon: SiGo, color: "text-cyan-600" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-800 dark:text-white" },
  { name: "GitLab", icon: SiGitlab, color: "text-orange-500" },
  { name: "Sourcetree", icon: SiSourcetree, color: "text-blue-600" },
]

export function Skills() {
  return (
    <TooltipProvider>
      <Card className="border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Skills
              </h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {skills.map((skill, i) => {
                const Icon = skill.icon
                return (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.3 }
                        }}
                        transition={{ 
                          delay: i * 0.05, 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center"
                      >
                        <Card className="w-20 h-20 flex items-center justify-center bg-muted/30 border-muted/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                          <CardContent className="p-0 flex items-center justify-center">
                            <Icon 
                              className={`w-10 h-10 transition-all duration-300 group-hover:scale-110 ${skill.color}`} 
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="font-medium">{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}