// src/components/sections/projects/project-filter.tsx
"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    categories: string[]
    active: string
    onChange: (value: string) => void
}

export function ProjectFilter({ categories, active, onChange }: Props) {
    return (
        <Tabs value={active} onValueChange={onChange} className="mb-6">
            <TabsList>
                {["All", ...categories].map((cat) => (
                    <TabsTrigger key={cat} value={cat}>
                        {cat}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
