// src/components/sections/projects/project-card.tsx (updated)
"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink, Github, Eye, Calendar } from "lucide-react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onClick: () => void;
  viewMode?: "grid" | "list";
  index?: number;
};

export function ProjectCard({
  project,
  onClick,
  viewMode = "grid",
  index = 0,
}: Props) {
  if (viewMode === "list") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        className="w-full"
      >
        <Card
          className="cursor-pointer group bg-muted backdrop-blur-sm border-muted/30 hover:border-primary/30 transition-all duration-300 overflow-hidden"
          onClick={onClick}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-48 lg:w-64 flex-shrink-0">
              <div className="relative aspect-video md:aspect-square md:h-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardFooter className="p-0 pt-4 mt-4 border-t border-muted/30">
                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {project.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.date}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        View Details
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid View (default)
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      className="h-full"
    >
      <Card
        className="cursor-pointer group h-full bg-muted backdrop-blur-sm 
        border-muted/30 hover:border-primary/30 transition-all duration-300 
        overflow-hidden shadow-lg hover:shadow-xl"
        onClick={onClick}
      >
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="capitalize">
                {project.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            {project.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.date}
              </span>
            )}
            <Button variant="ghost" size="sm" className="gap-2">
              View Details
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
