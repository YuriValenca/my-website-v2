"use client";

import { useGetGenres } from "./useMovies";
import { useGetTvGenres } from "./useTVShows";

export function useGenreNames(isTVShow: boolean) {
  const { data: movieGenres = [] } = useGetGenres();
  const { data: tvGenres = [] } = useGetTvGenres();
  const genres = isTVShow ? tvGenres : movieGenres;

  return (genreIds: number[]) =>
    genreIds.flatMap((genreId) => genres.find(({ id }) => id === genreId)?.name ?? []);
}
