export interface SearchResultMovie {
  id: number;
  media_type: "movie";
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
}

export interface SearchResultPerson {
  id: number;
  media_type: "person";
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

export interface SearchResultTV {
  id: number;
  media_type: "tv";
  name: string;
  popularity: number;
}

export type SearchResultItem = SearchResultMovie | SearchResultPerson | SearchResultTV;

export interface MultiSearchList {
  page: number;
  results: SearchResultItem[];
  total_pages: number;
  total_results: number;
}
