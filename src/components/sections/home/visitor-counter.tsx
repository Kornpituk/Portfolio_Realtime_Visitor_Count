"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState<number>(0)

  useEffect(() => {
    fetch("/api/visitor")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => console.error("Visitor API error:", err))
  }, [])

  // Counter animation
  useEffect(() => {
    if (count !== null) {
      let frame: number
      const start = displayCount
      const end = count
      const duration = 500 // 0.5s
      let startTime: number | null = null

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const value = Math.floor(start + (end - start) * progress)
        setDisplayCount(value)
        if (progress < 1) {
          frame = requestAnimationFrame(step)
        }
      }

      frame = requestAnimationFrame(step)
      return () => cancelAnimationFrame(frame)
    }
  }, [count])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-fit mx-auto mt-10 shadow-md">
        <CardContent className="flex items-center gap-2 py-4 px-6">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">Visitors:</span>

          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayCount}
              className="font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {displayCount ?? "..."}
            </motion.span>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
