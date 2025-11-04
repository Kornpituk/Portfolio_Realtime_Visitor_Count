// footer.tsx
"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t bg-background/50 backdrop-blur-sm py-8 mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {[
              { 
                icon: Github, 
                href: "https://github.com/Kornpituk", 
                label: "GitHub" 
              },
              { 
                icon: Linkedin, 
                href: "https://www.linkedin.com/in/kornpituk-kunnika-134336271/", 
                label: "LinkedIn" 
              },
              { 
                icon: Mail, 
                href: "mailto:kornpituk@example.com", 
                label: "Email" 
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { href: "/", label: "Home" },
              { href: "/public-pages/projects", label: "Projects" },
              { href: "/public-pages/about", label: "About" },
              { href: "/public-pages/contact", label: "Contact" },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-1">
              © {currentYear} Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Kornpituk Kunnika
            </p>
            <p className="mt-1">All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}