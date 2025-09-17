/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import avartar01 from "@/assets/icons/bird.png"
import avartar02 from "@/assets/icons/deer.png"
import avartar03 from "@/assets/icons/jacutinga.png"
import avartar04 from "@/assets/icons/jaguar.png"
import avartar05 from "@/assets/icons/pelican.png"
import avartar06 from "@/assets/icons/rabbit.png"

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// avatar ที่ระบบมีให้เลือก
const presetAvatars = [
  avartar01,
  avartar02,
  avartar03,
  avartar04,
  avartar05,
  avartar06,
]

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<string>("")
  const [showModal, setShowModal] = useState(false)
  const [displayCount, setDisplayCount] = useState<number>(0)

  // Counter animation
  useEffect(() => {
    if (count !== null) {
      let frame: number
      const start = displayCount
      const end = count
      const duration = 350 // 0.5s
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

  useEffect(() => {
    const storedName = localStorage.getItem("visitor_name")
    const storedAvatar = localStorage.getItem("visitor_avatar")
    const storedId = localStorage.getItem("visitor_id")

    if (!storedName || !storedAvatar || !storedId) {
      setShowModal(true)
    } else {
      fetchVisitorCount()
    }
  }, [])

  async function saveVisit(visitorName: string, avatar: string) {
    const storedId = localStorage.getItem("visitor_id")

    // ถ้ามี id_user เก็บแล้ว → ไม่ insert ซ้ำ
    if (storedId) {
      fetchVisitorCount()
      return
    }

    try {
      const res = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: visitorName, avatar_url: avatar }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      // เก็บ localStorage: name, avatar, id_user
      localStorage.setItem("visitor_name", visitorName)
      localStorage.setItem("visitor_avatar", avatar)
      localStorage.setItem("visitor_id", data.data.id_user)

      // ทุกครั้งที่ login → set session
      sessionStorage.setItem("active_user", "true")

      fetchVisitorCount()
    } catch (err: any) {
      console.error("Failed to save visit:", err.message)
    }
  }

  async function fetchVisitorCount() {
    try {
      const res = await fetch("/api/visitor-count")
      const data = await res.json()
      setCount(data.count ?? 0)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Card className="p-6 w-96">
            <h2 className="text-lg font-bold mb-4">ใส่ชื่อ + เลือกรูป Avatar</h2>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น Korn"
              className="mb-4"
            />

            <div className="grid grid-cols-4 gap-3 mb-4">
              {presetAvatars.map((avatar) => (
                <button
                  key={avatar.src}
                  onClick={() => setSelectedAvatar(avatar.src)}
                  className={`rounded-lg border p-1 hover:scale-105 transition ${selectedAvatar === avatar.src ? "border-blue-500" : "border-gray-300"
                    }`}
                >
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>

            <Button
              className="w-full"
              onClick={() => {
                if (name.trim() && selectedAvatar) {
                  saveVisit(name, selectedAvatar)
                  setShowModal(false)
                }
              }}
            >
              ยืนยัน
            </Button>
          </Card>
        </div>
      )}

      {/* Visitor Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
    </>
  )
}
