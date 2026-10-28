import { MovieList } from "../(types)/movies";
import { TvShowList } from "../(types)/tv-shows";
import { DiscoverFilters, SortOption } from "../(helpers)/discoverFilters";
import { tmdbFetch } from "./tmdbClient";

const SORT_PARAMS: Record<SortOption, string> = {
  popularity: "popularity.desc",
  rating: "vote_average.desc",
};

const sharedParams = (filters: DiscoverFilters, page: number) => ({
  include_adult: false,
  sort_by: SORT_PARAMS[filters.sortBy],
  "vote_count.gte": filters.minVotes,
  page,
});

const discoverMoviePage = (filters: DiscoverFilters, page: number) =>
  tmdbFetch<MovieList>("/discover/movie", {
    ...sharedParams(filters, page),
    "primary_release_date.gte": filters.releaseFrom,
    "primary_release_date.lte": filters.releaseTo,
  });

const discoverTvShowPage = (filters: DiscoverFilters, page: number) =>
  tmdbFetch<TvShowList>("/discover/tv", {
    ...sharedParams(filters, page),
    "first_air_date.gte": filters.releaseFrom,
    "first_air_date.lte": filters.releaseTo,
    "air_date.gte": filters.airingFrom,
    "air_date.lte": filters.airingTo,
  });

export {
  discoverMoviePage,
  discoverTvShowPage,
}
