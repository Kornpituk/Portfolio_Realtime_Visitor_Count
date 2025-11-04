// visitor-counter.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Users, MapPin, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(1247)
  const [currentTime, setCurrentTime] = useState("")
  const [location, setLocation] = useState("Bangkok, TH")

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3))
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      icon: Eye,
      label: "Total Visitors",
      value: visitorCount.toLocaleString(),
      color: "text-blue-500"
    },
    {
      icon: Users,
      label: "Active Now",
      value: "12",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
      color: "text-purple-500"
    },
    {
      icon: Calendar,
      label: "Last Updated",
      value: currentTime || "Loading...",
      color: "text-orange-500"
    }
  ]

  return (
    <section className="w-full py-16 bg-muted/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Live Stats{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              📊
            </span>
          </h2>
          <p className="text-muted-foreground">
            Real-time insights about my portfolio s engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center bg-background border-muted/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-full bg-primary/10 w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <motion.p 
                    className="text-2xl font-bold mb-2"
                    key={stat.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Thanks for visiting! You are one of {visitorCount.toLocaleString()} amazing visitors.
          </p>
        </motion.div>
      </div>
    </section>
  )
}