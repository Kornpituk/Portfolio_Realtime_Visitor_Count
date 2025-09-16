"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
            <motion.h1
                className="text-4xl sm:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Hi, I’m <span className="text-primary">Your Name</span> 👋
            </motion.h1>

            <motion.p
                className="text-lg text-muted-foreground max-w-xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                A passionate <span className="font-medium">Full-Stack Developer</span> who loves building
                modern web applications and interactive experiences.
            </motion.p>

            <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <Button asChild>
                    <a href="/projects">View Projects</a>
                </Button>
                <Button variant="outline" asChild>
                    <a href="/contact">Contact Me</a>
                </Button>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
                <a href="https://github.com/yourusername" target="_blank">
                    <Github className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank">
                    <Linkedin className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
                <a href="mailto:youremail@example.com">
                    <Mail className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
            </div>
        </section>
    )
}
