"use client";

import { useQuery } from "@tanstack/react-query";
import { getLatest, getMovie, getPopular, getTopRated, searchMovies } from "../api/movies";

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

export function useGetPopular() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => getPopular(),
  })
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 2,
  })
}

export function useGetMovie(id: number) {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovie(id)
  })
}
