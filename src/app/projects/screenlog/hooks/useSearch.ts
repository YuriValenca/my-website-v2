import { useQuery } from "@tanstack/react-query";
import { searchMovies, searchMulti } from "../api/search";
import { SearchResultItem } from "../types/searchResults";


export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 2,
  })
}

export function useSearchMulti(query: string) {
  return useQuery({
    queryKey: ["search", "multi", query],
    queryFn: () => searchMulti(query),
    enabled: query.length > 2,
  });
}

export const groupResultsByType = (results: SearchResultItem[]) => ({
  movie: results.filter((r) => r.media_type === "movie"),
  tv: results.filter((r) => r.media_type === "tv"),
  person: results.filter((r) => r.media_type === "person"),
});
