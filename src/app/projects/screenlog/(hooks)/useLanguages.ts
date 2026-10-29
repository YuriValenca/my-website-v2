"use client";

import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../(api)/languages";

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
    staleTime: Infinity,
  });
}
