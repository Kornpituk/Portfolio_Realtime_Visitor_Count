"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function NavigationLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathnameRef = useRef(pathname);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detect navigation start
    if (prevPathnameRef.current !== pathname) {
      // Navigation completed, reset
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
      prevPathnameRef.current = pathname;
    }
  }, [pathname, searchParams]);

  // Listen for link clicks to start loading
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;
      
      if (link && link.href) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Only show loading for internal navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          setIsLoading(true);
          setProgress(0);
          
          // Clear any existing interval
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          
          // Simulate progress
          progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 85) {
                if (progressIntervalRef.current) {
                  clearInterval(progressIntervalRef.current);
                }
                return 85; // Stop at 85% until navigation completes
              }
              return prev + Math.random() * 15;
            });
          }, 150);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[100] h-1 bg-primary/10"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary shadow-lg shadow-primary/50"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Subtle Loading Indicator (แสดงเมื่อโหลดนานกว่า 500ms) */}
          {progress > 30 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-20 right-4 z-[99] bg-background/95 backdrop-blur-md border border-muted rounded-lg shadow-lg p-3"
            >
              <div className="flex items-center gap-3">
                <LoadingSpinner size="sm" className="text-primary" />
                <p className="text-sm text-muted-foreground font-medium">
                  กำลังโหลด...
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

