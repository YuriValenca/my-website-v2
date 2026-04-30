"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { getGenres, getLatest, getMovie, getPopular, getTopRated } from "../(api)/movies";

export function useGetGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  })
}

export function useGetLatest() {
  return useQuery({
    queryKey: ["movies", "latest"],
    queryFn: () => getLatest(),
  })
}

export function useGetTopRated() {
  return useQuery({
    queryKey: ["movies", "top-rated"],
    queryFn: () => getTopRated(),
  })
}

export function useGetPopular(page = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => getPopular(page),
  })
}

export function useGetMovie(id: number) {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovie(id)
  })
}

export function useGetMoviePageData(options?: { enabled?: boolean }) {
  const results = useQueries({
    queries: [
      { queryKey: ["movies", "latest"], queryFn: getLatest, enabled: options?.enabled ?? true },
      { queryKey: ["movies", "top-rated"], queryFn: getTopRated, enabled: options?.enabled ?? true },
      { queryKey: ["movies", "popular"], queryFn: () => getPopular(), enabled: options?.enabled ?? true },
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
