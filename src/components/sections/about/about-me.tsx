// about.tsx
"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Hand } from "lucide-react"
import Me from "@/assets/images/Me.jpg"

export function AboutMe() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-background to-muted/30 border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl">
                <AvatarImage src={Me.src} alt="My Avatar" className="object-cover" />
                <AvatarFallback className="text-lg font-semibold">ME</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="space-y-4 text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center md:justify-start gap-2"
              >
                <Hand className="w-6 h-6 text-primary animate-bounce" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  สวัสดีครับ
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                ผมคือ <span className="font-semibold text-foreground">กัน กรพิทักญ์ กรรณิกา (Kornpttak Kannika)</span>
                Fullstack Developer ที่ชอบสร้าง Web App & Portfolio โดยใช้{" "}
                <span className="text-primary font-medium">Next.js, Tailwind, Supabase</span> 
                และเทคโนโลยีใหม่ ๆ
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}