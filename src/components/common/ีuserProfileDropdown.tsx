"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { LogOut, Check, Swords } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Separator } from "@/components/ui/separator"


export function UserProfileDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [visitorName, setVisitorName] = useState("Guest")
    const [visitorAvatar, setVisitorAvatar] = useState("")
    const [loginWithGoogle, setLoginWithGoogle] = useState(false)
    const router = useRouter()

    // อ่านค่าหลังจาก client mount
    useEffect(() => {
        const name = localStorage.getItem("visitor_name")
        const avatar = localStorage.getItem("visitor_avatar")
        const provider = localStorage.getItem("login_provider")

        if (name) setVisitorName(name)
        if (avatar) setVisitorAvatar(avatar)
        setLoginWithGoogle(provider === "google")

        setVisitorAvatar(avatar || "/jacutinga.png")
    }, [])

    function logout() {
        sessionStorage.clear()
        router.push("/login")
    }

    return (
        <div className="fixed top-4 left-4 z-[80]">

            <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center 
                   shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
                {visitorAvatar ? (
                    <>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image key={visitorAvatar}
                                src={visitorAvatar}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full" />
                        </div>
                    </>

                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                )}
            </motion.button>

            <AnimatePresence>
                {dropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-56 bg-background rounded-xl shadow-lg border p-4"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src={visitorAvatar}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold flex items-center gap-1">
                                    {loginWithGoogle && <Check className="w-4 h-4 text-green-500" />}
                                </p>
                                <Swords className="w-6 h-6" />
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">Hunter</span>
                                    <span className="text-lg font-semibold">{visitorName}</span>
                                </div>


                            </div>
                        </div>

                        <Separator />

                        <Button
                            onClick={logout}
                            className="flex items-center bg-blackgound gap-2 text-red-500 hover:text-red-600 hover:bg-red-300 transition w-full py-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
