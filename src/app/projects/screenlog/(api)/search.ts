import { MovieList } from "../(types)/movies";
import { PersonList } from "../(types)/people";
import { TvShowList } from "../(types)/tv-shows";
import { MultiSearchList } from "../(types)/searchResults";
import { tmdbFetch } from "./tmdbClient";

const searchMovies = (query: string, page = 1) =>
  tmdbFetch<MovieList>("/search/movie", { query, include_adult: false, page });

const searchTvShows = (query: string, page = 1) =>
  tmdbFetch<TvShowList>("/search/tv", { query, page });

const searchPeople = (query: string, page = 1) =>
  tmdbFetch<PersonList>("/search/person", { query, page });

const searchMulti = (query: string) =>
  tmdbFetch<MultiSearchList>("/search/multi", { query, include_adult: false, page: 1 });

export {
  searchMovies,
  searchTvShows,
  searchPeople,
  searchMulti,
}
