"use client";

import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../api/people";

export function useSearchPeople(query: string) {
  return useQuery({
    queryKey: ["people", "search", query],
    queryFn: () => searchPeople(query),
    enabled: query.length > 2,
  });
}
