import { useQuery } from "@tanstack/react-query";
import { searchMovies, searchMulti, searchTvShows } from "../api/search";
import { MediaType, SearchResultItem } from "../types/searchResults";
import { searchPeople } from "../api/people";


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

export function useSearchByCategory(query: string, page: Record<MediaType, number>) {
  const enabled = query.length > 2;

  const movies = useQuery({
    queryKey: ["search", "movie", query, page.movie],
    queryFn: () => searchMovies(query, page.movie),
    enabled,
  });

  const tv = useQuery({
    queryKey: ["search", "tv", query, page.tv],
    queryFn: () => searchTvShows(query, page.tv),
    enabled,
  });

  const people = useQuery({
    queryKey: ["search", "person", query, page.person],
    queryFn: () => searchPeople(query, page.person),
    enabled,
  });

  return {
    movies: { data: movies.data, isFetching: movies.isFetching },
    tv: { data: tv.data, isFetching: tv.isFetching },
    people: { data: people.data, isFetching: people.isFetching },
  };
}
