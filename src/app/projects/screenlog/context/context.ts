import { createContext, useContext } from "react";
import { Genre } from "../types/movies";

const GenreContext = createContext<Genre[]>([]);

export const useGenres = () => useContext(GenreContext);

export default GenreContext;
