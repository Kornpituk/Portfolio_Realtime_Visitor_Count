// home.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles } from "lucide-react"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Avatar & Welcome */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-bold text-primary-foreground">KK</span>
            </div>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-500 fill-current" />
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hi, I am{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Kornpituk
              </span>{" "}
              👋
            </motion.h1>

            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground min-h-[1.5em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer',
                  2000,
                  'React Specialist',
                  2000,
                  'Problem Solver',
                  2000,
                  'Tech Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          A passionate <span className="font-semibold text-foreground">Full-Stack Developer</span> who loves 
          building modern web applications with <span className="text-primary font-medium">React</span>,{" "}
          <span className="text-primary font-medium">Next.js</span>, and cutting-edge technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button asChild size="lg" className="gap-2 group">
            <a href="/public-pages/projects">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button variant="outline" asChild size="lg" className="gap-2">
            <a href="/contact">
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
          </Button>
          <Button variant="ghost" asChild size="lg" className="gap-2">
            <a href="/resume.pdf" download>
              <Download className="w-4 h-4" />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-6 justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { icon: Github, href: "https://github.com/Kornpituk", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/kornpituk-kunnika-134336271/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:kornpituk@example.com", label: "Email" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted/50 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
            animate={{ 
              y: [0, 8, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}