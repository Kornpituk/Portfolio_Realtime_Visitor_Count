"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiVuedotjs, SiTailwindcss, SiSupabase, SiNodedotjs, SiGo, SiGithub, SiGitlab, SiSourcetree, SiVuetify } from "react-icons/si"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// mapping skill -> icon
const skills = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "React", icon: SiReact },
    { name: "Vue", icon: SiVuedotjs },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "Vuetify", icon: SiVuetify },
    { name: "Supabase", icon: SiSupabase },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Golang", icon: SiGo },
    { name: "GitHub", icon: SiGithub },
    { name: "GitLab", icon: SiGitlab },
    { name: "Sourcetree", icon: SiSourcetree },
]

export function Skills() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">🚀 Skills</h2>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => {
                    const Icon = skill.icon
                    return (
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Icon className="w-30 h-30 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-15 lg:h-15" />
                                </TooltipTrigger>
                                <TooltipContent>{skill.name}</TooltipContent>
                            </Tooltip>
                        </>
                    )
                })}
            </div>
        </motion.div>
    )
}
