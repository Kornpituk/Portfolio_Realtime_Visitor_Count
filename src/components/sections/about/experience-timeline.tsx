// experience-timeline.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

const experiences = [
  { 
    year: "2023 - Now", 
    role: "Frontend Developer", 
    company: "Smart Reform Plus" 
  },
  { 
    year: "2022 - 2023", 
    role: "Programmer (Contract)", 
    company: "Barsitar IT" 
  },
  { 
    year: "2021 - 2022", 
    role: "Full-Stack Web Development (Intern)", 
    company: "Icute Think Beyond" 
  },
]

export function ExperienceTimeline() {
  return (
    <Card className="border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-muted" />
            
            <ul className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute left-0 top-0 w-6 h-6 bg-primary rounded-full ring-4 ring-background flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  </motion.div>
                  
                  <Card className="bg-muted/30 border-muted/30 hover:border-primary/30 transition-colors duration-300">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground font-medium mb-2">{exp.year}</p>
                      <p className="font-semibold text-lg mb-1">{exp.role}</p>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}