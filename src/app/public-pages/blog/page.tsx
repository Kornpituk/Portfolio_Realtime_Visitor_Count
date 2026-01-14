import { Suspense } from "react"
import BlogClient from "@/components/sections/blog/blog-list"

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  )
}