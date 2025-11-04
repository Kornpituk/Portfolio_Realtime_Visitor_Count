import Image from "next/image";

import Hero from "@/components/sections/home/hero"
import TechStack from "@/components/sections/home/tech-stack"
import RecentProjects from "@/components/sections/home/recent-projects"
import  VisitorCounter  from "@/components/sections/home/visitor-counter"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <TechStack />
      <RecentProjects />
      <VisitorCounter />
    </main>
  );
}
