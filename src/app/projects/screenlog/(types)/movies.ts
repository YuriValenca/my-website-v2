export interface MediaBase {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  tagline: string;
  status: string;
  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface Movie extends MediaBase {
  title: string;
  release_date: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  popularity: number;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface VideoList {
  results: Video[];
}

export interface ReleaseDate {
  certification: string;
  type: number;
}

export interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface MovieDetails extends MediaBase {
  title: string;
  release_date: string;
  runtime: number | null;
  budget: number | null;
  revenue: number | null;
  original_language: string;
  release_dates: { results: CountryReleaseDates[] };
  videos: VideoList;
  recommendations: MovieList;
}

export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
