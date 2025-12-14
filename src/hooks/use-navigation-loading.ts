"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useNavigationLoading() {
  const pathname = usePathname();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  // Reset loading when pathname changes
  useEffect(() => {
    setLoadingPath(null);
  }, [pathname]);

  const startLoading = useCallback((path: string) => {
    setLoadingPath(path);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingPath(null);
  }, []);

  const isPathLoading = useCallback(
    (path: string) => {
      return loadingPath === path;
    },
    [loadingPath]
  );

  return {
    loadingPath,
    startLoading,
    stopLoading,
    isPathLoading,
  };
}

