export interface MediaBase {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
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

export interface MovieDetails extends MediaBase {
  title: string;
  release_date: string;
  tagline: string;
  runtime: number | null;
  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  }
}

export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
