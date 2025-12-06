"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";
import { Home, FolderKanban, User, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfileDropdown } from "@/components/common/userProfileDropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/public-pages/projects", label: "Projects", icon: FolderKanban },
  { href: "/public-pages/about", label: "About", icon: User },
  { href: "/public-pages/contact", label: "Contact", icon: Mail },
];

export function TopNavbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Main Navbar - แสดงตลอดเวลา */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        }}
        className="fixed top-0 left-0 w-full z-50 bg-muted backdrop-blur-xl border-b shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 border shadow-sm">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="relative"
                  >
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative h-14 w-14 p-0 transition-all duration-200 group",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "hover:bg-primary/8 text-muted-foreground hover:text-primary"
                        )}
                      >
                        {/* ไอคอนหลัก - ขนาดใหญ่ขึ้นสำหรับ Desktop */}
                        <item.icon
                          className={cn(
                            "w-7 h-7 transition-all duration-200", // ขยายจาก w-6 h-6 เป็น w-7 h-7
                            isActive ? "scale-110" : "group-hover:scale-105"
                          )}
                        />

                        {/* ตัวบ่งชี้เมนูที่เลือก (เส้นใต้แบบ Facebook) */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-primary rounded-full" // ขยายเส้นใต้
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </Button>
                    </Link>

                    {/* Tooltip ที่แสดงชื่อเมนูเมื่อโฮเวอร์ (แบบ Facebook) */}
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <div className="absolute inset-0 pointer-events-none" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium" // ขยาย Tooltip
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />{" "}
                          {/* ไอคอนใน Tooltip */}
                          <span>{item.label}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ModeToggle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <UserProfileDropdown />
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t pt-4 pb-2"
          >
            <div className="grid grid-cols-4 gap-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full flex-col h-14 gap-1 relative transition-all",
                          isActive && "text-primary font-semibold"
                        )}
                      >
                        <item.icon className="w-8 h-8" />
                        {/* <span className="text-xs">{item.label}</span> */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16 md:h-16" />
    </>
  );
}
