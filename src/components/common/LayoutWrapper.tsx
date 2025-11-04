// LayoutWrapper.tsx
"use client"

import { usePathname } from "next/navigation"
import { TopNavbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // ซ่อน navbar/footer สำหรับบาง path
  const hiddenPaths = ["/login", "/register", "/forgot-password"]
  const isHidden = hiddenPaths.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!isHidden && <TopNavbar />}
      <main className="flex-1">{children}</main>
      {!isHidden && <Footer />}
    </div>
  )
}