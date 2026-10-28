"use client";

import { RefObject, useCallback, useEffect, useState } from "react";

// Sub-pixel scroll values never reach the exact end on some zoom levels
const END_TOLERANCE = 1;

export function useCarouselPaging(trackRef: RefObject<HTMLDivElement | null>) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setIsAtStart(track.scrollLeft <= 0);
    setIsAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - END_TOLERANCE);
  }, [trackRef]);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const goToPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    track?.scrollBy({ left: direction * track.clientWidth });
  };

  return {
    isAtStart,
    isAtEnd,
    updateEdges,
    goToPreviousPage: () => goToPage(-1),
    goToNextPage: () => goToPage(1),
  };
}
