"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";
import { Home, FolderKanban, User, Mail, AppWindow } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfileDropdown } from "@/components/common/userProfileDropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useNavigationLoading } from "@/hooks/use-navigation-loading";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/public-pages/projects", label: "Projects", icon: FolderKanban },
  { href: "/public-pages/about", label: "About", icon: User },
  { href: "/public-pages/contact", label: "Contact", icon: Mail },
];

export function TopNavbar() {
  const pathname = usePathname();
  const { loadingPath, startLoading, isPathLoading } = useNavigationLoading();

  // Handle navigation with loading state
  const handleNavigation = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === pathname) {
      e.preventDefault();
      return;
    }
    
    // Start loading indicator
    startLoading(href);
  };

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
            <div
              className="hidden md:flex items-center gap-2
  absolute left-1/2 transform -translate-x-1/2
  backdrop-blur-sm"
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + index * 0.08 }}
                    className="relative"
                  >
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Link 
                          href={item.href} 
                          prefetch={true}
                          onClick={(e) => handleNavigation(item.href, e)}
                        >
                          <div
                            className={cn(
                              "w-40 h-14 flex items-center justify-center rounded-xl cursor-pointer transition-all relative",
                              "hover:bg-muted/40", // hover แบบ Facebook
                              isPathLoading(item.href) && "opacity-70"
                            )}
                          >
                            {isPathLoading(item.href) ? (
                              <LoadingSpinner size="sm" className="text-primary" />
                            ) : (
                              <item.icon
                                className={cn(
                                  "w-7 h-7 transition-transform duration-200",
                                  isActive
                                    ? "text-primary scale-110" // Active เหมือน FB
                                    : "text-foreground/70 hover:scale-105"
                                )}
                              />
                            )}
                          </div>
                        </Link>
                      </TooltipTrigger>

                      {/* Tooltip แบบเล็ก เหมือน FB */}
                      <TooltipContent
                        side="bottom"
                        className="bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-medium"
                      >
                        {item.label}
                      </TooltipContent>
                    </Tooltip>

                    {/* Active Indicator Bar แบบ FB */}
                    {isActive && (
                      <motion.div
                        layoutId="fbActiveBar"
                        className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
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
                    <Link 
                      href={item.href} 
                      prefetch={true}
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full flex-col h-14 gap-1 relative transition-all",
                          isActive && "text-primary font-semibold",
                          isPathLoading(item.href) && "opacity-70"
                        )}
                        disabled={isPathLoading(item.href)}
                      >
                        {isPathLoading(item.href) ? (
                          <LoadingSpinner size="sm" className="text-primary" />
                        ) : (
                          <item.icon className="w-8 h-8" />
                        )}
                        {/* <span className="text-xs">{item.label}</span> */}
                        {isActive && !loadingPath && (
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
    </>
  );
}
