"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { projectsMockData } from "@/data/projects"
import { ProjectCard } from "./project-card"
import { ProjectFilter } from "./project-filter"
import { ProjectDetailDialog } from "./project-detail-dialog"
import { motion } from "framer-motion"

export function ProjectList() {
  const categories = [...new Set(projectsMockData.map((p) => p.category))]
  const [active, setActive] = useState("All")
  const [selected, setSelected] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  // ถ้ามี query id → เปิด dialog ทันที
  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setSelected(Number(id))
    }
  }, [searchParams])

  const filtered =
    active === "All" ? projectsMockData : projectsMockData.filter((p) => p.category === active)

  const project = projectsMockData.find((p) => p.id === selected) || null

  return (
    <div>
      <ProjectFilter
        categories={categories}
        active={active}
        onChange={setActive}
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {filtered.map((p, idx) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClick={() => {
              setSelected(p.id)
              router.push(`/public-pages/projects?id=${p.id}`) // อัปเดต url เวลาเลือกจาก list
            }}
            index={idx}
          />
        ))}
      </motion.div>

      <ProjectDetailDialog
        project={project}
        open={!!selected}
        onClose={() => {
          setSelected(null)
          router.push("/public-pages/projects") // ปิด dialog → ลบ query param ออก
        }}
      />
    </div>
  )
}
