import { createContext, useContext } from "react";
import { Genre } from "../(types)/movies";

interface GenreContextValue {
  movieGenres: Genre[];
  tvGenres: Genre[];
}

const GenreContext = createContext<GenreContextValue>({
  movieGenres: [],
  tvGenres: [],
});

export const useGenres = () => useContext(GenreContext);
export const useMovieGenres = () => useContext(GenreContext).movieGenres;
export const useTvGenres = () => useContext(GenreContext).tvGenres;

export default GenreContext;
