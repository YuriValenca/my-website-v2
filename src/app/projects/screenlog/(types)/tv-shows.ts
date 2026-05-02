import { MediaBase } from "./movies";

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
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
}

export interface TvShowList {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
