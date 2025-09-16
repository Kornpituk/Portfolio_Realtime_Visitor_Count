"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AboutMe() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-8"
        >
            <Avatar className="w-32 h-32 ring-4 ring-primary/20 shadow-xl">
                <AvatarImage src="/me.jpg" alt="My Avatar" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>

            <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold">สวัสดีครับ 👋</h1>
                <p className="text-muted-foreground">
                    ผมคือ <span className="font-semibold">[Your Name]</span>
                    Fullstack Developer ที่ชอบสร้าง Web App & Portfolio
                    โดยใช้ Next.js, Tailwind, Supabase และเทคโนโลยีใหม่ ๆ
                </p>
            </div>
        </motion.div>
    )
}
