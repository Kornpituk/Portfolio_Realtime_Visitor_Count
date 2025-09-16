"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "./theme-toggle"
import { Home, FolderKanban, User, Mail, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/public-pages/projects", label: "Projects", icon: <FolderKanban className="w-5 h-5" /> },
    { href: "/public-pages/about", label: "About", icon: <User className="w-5 h-5" /> },
    { href: "/public-pages/contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
]

export function TopNavbar() {
    const [expanded, setExpanded] = useState(true)

    return (
        <>
            {/* Navbar ด้านบน */}
            <AnimatePresence>
                {expanded && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md border-b shadow-lg 
                                   flex items-center justify-around p-3 z-[60]"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center text-sm hover:text-primary transition"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        <ModeToggle />
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* ปุ่ม Toggle แยกออกมา */}
            <div className="fixed top-4 left-4 z-[80]">
                <motion.button
                    onClick={() => setExpanded(!expanded)}
                    whileHover={{ scale: 1.15, rotate: 0 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                    className="cursor-pointer w-14 h-14 rounded-full bg-primary text-dark flex items-center justify-center 
                               shadow-[0_0_15px_rgba(59,130,246,0.7),0_0_30px_rgba(59,130,246,0.5)]
                               transition-all duration-300 ease-in-out
                               hover:shadow-[0_0_25px_rgba(59,130,246,1),0_0_50px_rgba(59,130,246,0.8)]"
                >
                    {expanded ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                </motion.button>
            </div>
        </>
    )
}
