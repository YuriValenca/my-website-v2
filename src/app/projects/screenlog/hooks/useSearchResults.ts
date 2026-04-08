import { useQuery } from "@tanstack/react-query";
import { searchMulti } from "../api/searchResults";

export function useSearchMulti(query: string) {
  return useQuery({
    queryKey: ["search", "multi", query],
    queryFn: () => searchMulti(query),
    enabled: query.length > 2,
  });
}
