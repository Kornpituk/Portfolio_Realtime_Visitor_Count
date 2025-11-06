"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";
import { Home, FolderKanban, User, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfileDropdown } from "@/components/common/userProfileDropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "relative gap-2 transition-all duration-200",
                          isActive && "text-primary font-semibold"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                            transition={{
                              type: "spring",
                              stiffness: 300,
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
                        <item.icon className="w-4 h-4" />
                        <span className="text-xs">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 300,
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