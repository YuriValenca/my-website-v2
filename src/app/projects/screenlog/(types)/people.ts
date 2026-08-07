import { Movie } from "./movies";
import { TvShow } from "./tv-shows";

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  known_for: (Movie | TvShow)[],
  popularity: number;
}

export interface PersonList {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}
