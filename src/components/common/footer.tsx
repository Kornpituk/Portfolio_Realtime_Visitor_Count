import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t p-6 mt-10 text-center">
            <div className="flex justify-center gap-4 mb-3">
                <Link href="https://github.com/your-github" target="_blank">
                    <Github className="w-5 h-5 hover:text-primary" />
                </Link>
                <Link href="https://linkedin.com/in/your-linkedin" target="_blank">
                    <Linkedin className="w-5 h-5 hover:text-primary" />
                </Link>
                <Link href="mailto:your@email.com">
                    <Mail className="w-5 h-5 hover:text-primary" />
                </Link>
            </div>
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} MyPortfolio. All rights reserved.
            </p>
        </footer>
    )
}
