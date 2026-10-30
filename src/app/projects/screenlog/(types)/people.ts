import { Movie, MovieSummary } from "./movies";
import { TvShow, TvShowSummary } from "./tv-shows";

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

export interface MovieCredit extends MovieSummary {
  media_type: "movie";
}

export interface TvShowCredit extends TvShowSummary {
  media_type: "tv";
}

export type MediaCredit = MovieCredit | TvShowCredit;

export type CastCredit = MediaCredit & {
  character: string;
};

export type CrewCredit = MediaCredit & {
  job: string;
  department: string;
};

export interface PersonProfile extends Omit<Person, "known_for"> {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  combined_credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
}
