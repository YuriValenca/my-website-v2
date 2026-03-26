import { useEffect, useState } from "react";
import { theme } from "../theme/theme";

export const useBreakpoint = (breakpoint: keyof typeof theme.breakpoints) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${theme.breakpoints[breakpoint]})`);
    setMatches(query.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, [breakpoint]);

  return matches;
};
