"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { getTvGenres, getTvShow, getLatestTvShows, getPopularTvShows, getTopRatedTvShows } from "../(api)/tv-shows";

export function useGetTvGenres() {
  return useQuery({
    queryKey: ["tv-genres"],
    queryFn: () => getTvGenres(),
  });
}

export function useGetLatestTvShows() {
  return useQuery({
    queryKey: ["tv-shows", "latest"],
    queryFn: () => getLatestTvShows(),
  });
}

export function useGetTopRatedTvShows() {
  return useQuery({
    queryKey: ["tv-shows", "top-rated"],
    queryFn: () => getTopRatedTvShows(),
  });
}

export function useGetPopularTvShows(page = 1) {
  return useQuery({
    queryKey: ["tv-shows", "popular", page],
    queryFn: () => getPopularTvShows(page),
  });
}

export function useGetTvShow(id: number) {
  return useQuery({
    queryKey: ["tv-shows", id],
    queryFn: () => getTvShow(id),
  });
}

export function useGetTVShowsPageData(options?: { enabled?: boolean }) {
  const results = useQueries({
    queries: [
      { queryKey: ["movies", "latest"], queryFn: getLatestTvShows, enabled: options?.enabled ?? true },
      { queryKey: ["movies", "top-rated"], queryFn: getTopRatedTvShows, enabled: options?.enabled ?? true },
      { queryKey: ["movies", "popular"], queryFn: () => getPopularTvShows(), enabled: options?.enabled ?? true },
    ]
  });

  return {
    latest: results[0].data,
    topRated: results[1].data,
    popular: results[2].data,
    isLoading: results.some(state => state.isLoading),
    isError: results.some(state => state.isError),
  }
}
