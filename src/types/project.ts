export interface Project {
  id: number
  title: string
  description: string
  image: string
  images?: string[] // สำหรับ multiple images
  tech: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  date?: string
  features?: string[]
  link: string
}