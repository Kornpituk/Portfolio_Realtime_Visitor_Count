"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "./theme-toggle"
import { Home, FolderKanban, User, Mail, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserProfileDropdown } from "@/components/common/ีuserProfileDropdown"

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
            {/* Navbar */}
            <AnimatePresence>
                {expanded && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md border-b shadow-lg 
                       flex items-center justify-around p-3 z-[50]"
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

            {/* Toggle Navbar Button */}
            <motion.div
                initial={false}
                animate={{
                    top: expanded ? 74 : 0, // ถ้า navbar เปิด → ปุ่มอยู่ใต้ navbar
                }}
                transition={{ duration: 0.3 }}
                className="fixed left-1/2 -translate-x-1/2 z-[80]"
            >
                {/* Hover Zone: invisible area ที่คุมการ hover */}
                <div className="relative w-32 h-12 -translate-y-2 group">
                    <motion.button
                        onClick={() => setExpanded(!expanded)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute left-1/2 -translate-x-1/2 w-20 h-10 
                 bg-background text-dark flex items-center justify-center 
                 transition-all duration-300 ease-in-out
                 rounded-b-full opacity-0 group-hover:opacity-100
                 shadow-[0_0_0px_rgba(59,130,246,0)] 
                 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_0_40px_rgba(59,130,246,0.6)]"
                    >
                        {expanded ? (
                            <X className="w-6 h-6 text-primary" />
                        ) : (
                            <Menu className="w-6 h-6 text-primary" />
                        )}
                    </motion.button>
                </div>
            </motion.div>
            {/* User Profile Dropdown */}
            <UserProfileDropdown />
        </>
    )
}
