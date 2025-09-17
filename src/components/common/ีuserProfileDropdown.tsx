"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { LogOut, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserProfileDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const router = useRouter()

    // อ่านจาก localStorage
    const visitorName =
        typeof window !== "undefined" ? localStorage.getItem("visitor_name") : "Guest"
    const visitorAvatar =
        typeof window !== "undefined"
            ? localStorage.getItem("visitor_avatar")
            : "/avatars/cat.png"
    const loginWithGoogle =
        typeof window !== "undefined"
            ? localStorage.getItem("login_provider") === "google"
            : false

    function logout() {
        // localStorage.clear()
        sessionStorage.clear()
        router.push("/login")
    }

    return (
        <div className="fixed top-4 left-4 z-[80]">
            {/* ปุ่ม Avatar */}
            <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer w-14 h-14 rounded-full bg-primary flex items-center justify-center 
                   shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
                <Image
                    src={visitorAvatar || "/avatars/cat.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {dropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-56 bg-background rounded-xl shadow-lg border p-4"
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src={visitorAvatar || "/avatars/cat.png"}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold flex items-center gap-1">
                                    {visitorName || "Guest"}
                                    {loginWithGoogle && <Check className="w-4 h-4 text-green-500" />}
                                </p>
                                <span className="text-xs text-muted-foreground">User Profile</span>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition w-full py-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
