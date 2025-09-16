import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialLinks() {
    return (
        <div className="flex justify-center gap-4 mt-8">
            <Button asChild variant="outline" size="icon">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                </a>
            </Button>

            <Button asChild variant="outline" size="icon">
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                </a>
            </Button>

            <Button asChild variant="outline" size="icon">
                <a href="mailto:youremail@example.com">
                    <Mail className="w-5 h-5" />
                </a>
            </Button>
        </div>
    )
}
