"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";
import { Home, FolderKanban, User, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect และ bottom detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsScrolled(scrollY > 50);

      // ตรวจสอบว่าอยู่ล่างสุดของหน้าหรือไม่ (เหลืออีก 100px)
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollDirection = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100 && !isAtBottom) {
        setIsExpanded(false);
      } else if (window.scrollY < lastScrollY || isAtBottom) {
        setIsExpanded(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, [isAtBottom]);

  // Handle top area hover for showing toggle button
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // ถ้าเมาส์อยู่บนสุด 50px ของจอ และไม่ได้อยู่ที่ล่างสุดของหน้า
      if (e.clientY < 50 && !isAtBottom) {
        setIsHoveringTop(true);
      } else {
        setIsHoveringTop(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isAtBottom]);

  return (
    <>
      {/* Main Navbar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
            className={cn(
              "fixed top-0 left-0 w-full z-50 transition-all duration-300",
              isScrolled
                ? "bg-background/95 backdrop-blur-xl border-b shadow-lg"
                : "bg-background/80 backdrop-blur-md border-b"
            )}
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
        )}
      </AnimatePresence>

      {/* Top Hover Zone - สำหรับแสดงปุ่ม toggle */}
      <motion.div
        className="fixed top-0 left-0 w-full h-12 z-40 cursor-pointer"
        onMouseEnter={() => !isAtBottom && setIsHoveringTop(true)}
        onMouseLeave={() => setIsHoveringTop(false)}
        animate={{
          opacity: isHoveringTop ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating Toggle Button - แสดงเมื่อ hover บนสุด และไม่ได้อยู่ล่างสุด */}
      <AnimatePresence>
        {((!isExpanded && !isAtBottom) || (isHoveringTop && !isAtBottom)) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60]"
          >
            <motion.div className="relative group">
              {/* Glow Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"
              />

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "hsl(var(--primary))",
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                  isExpanded
                    ? "bg-background border border-muted shadow-lg text-foreground hover:bg-primary hover:text-primary-foreground"
                    : "bg-primary text-primary-foreground shadow-2xl"
                )}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isExpanded ? 0 : 180 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {isExpanded ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              >
                {isExpanded ? "Close menu" : "Open menu"}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div
        className={cn(
          "transition-all duration-300",
          isExpanded ? "h-16 md:h-16" : "h-0"
        )}
      />
    </>
  );
}
