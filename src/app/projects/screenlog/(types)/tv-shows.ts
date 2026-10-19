import { MediaBase, VideoList } from "./movies";

export interface Network {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface EpisodeSummary {
  air_date: string;
  season_number: number;
  episode_number: number;
}

export interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

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
  original_language: string;
  networks: Network[];
  created_by: Creator[];
  last_episode_to_air: EpisodeSummary | null;
  next_episode_to_air: EpisodeSummary | null;
  content_ratings: { results: ContentRating[] };
  videos: VideoList;
  recommendations: TvShowList;
}

export interface TvShowList {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
