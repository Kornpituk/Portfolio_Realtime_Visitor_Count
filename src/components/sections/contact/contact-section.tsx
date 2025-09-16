import { ContactForm } from "@/components/sections/contact/contact-form"
import { SocialLinks } from "@/components/sections/contact/social-contact"

export function ContactSection() {
  return (
    <section id="contact" className="w-full max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>
      <p className="text-center text-muted-foreground mb-10">
        Got a question or want to work together? Send me a message below!
      </p>

      {/* <ContactForm /> */}
      <SocialLinks />
    </section>
  )
}
