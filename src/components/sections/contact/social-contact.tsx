import {
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
  Music, // ใช้แทน TikTok (lucide ไม่มี icon tiktok ตรง)
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type SocialItem = {
  label: string
  href: string
  icon: React.ReactNode
  className?: string
}

export function SocialLinks() {
  const socials: SocialItem[] = [
    {
      label: "GitHub",
      href: "https://github.com/Kornpituk",
      icon: <Github className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kornpituk-kunnika-134336271/",
      icon: <Linkedin className="h-5 w-5" />,
      className: "hover:text-[#0A66C2]",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/kornpituk.kunnika",
      icon: <Facebook className="h-5 w-5" />,
      className: "hover:text-[#1877F2]",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/garrungk/",
      icon: <Instagram className="h-5 w-5" />,
      className: "hover:text-pink-500",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@thisusernamecannotbeuse",
      icon: <Music className="h-5 w-5" />,
    },
    {
      label: "Email",
      href: "mailto:kornpitukgunk@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {socials.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className={`
                  rounded-full
                  transition-all
                  hover:scale-110
                  hover:ring-2
                  hover:ring-primary
                  ${item.className ?? ""}
                `}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span>{item.label}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
