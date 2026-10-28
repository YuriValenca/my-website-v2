"use client";

import { useEffect, useRef } from "react";

// Starts loading a bit before the end is visible, so scrolling rarely hits the spinner
const PRELOAD_MARGIN = "600px";

export function useInfiniteScroll(onReachEnd: () => void, isEnabled: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !isEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReachEnd();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onReachEnd, isEnabled]);

  return sentinelRef;
}
