import { CastMember, CrewMember, Genre, MediaBase } from "./movies";

export interface TvShow extends MediaBase {
  name: string;
  first_air_date: string;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
}

export interface TvShowDetails extends MediaBase {
  name: string;
  first_air_date: string;
  tagline: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface TvShowList {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
