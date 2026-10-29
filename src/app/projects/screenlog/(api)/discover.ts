import { MovieList } from "../(types)/movies";
import { TvShowList } from "../(types)/tv-shows";
import { DiscoverFilters, Range, RUNTIME_LIMITS, SCORE_LIMITS, SortOption } from "../(helpers)/discoverFilters";
import { tmdbFetch } from "./tmdbClient";

const CERTIFICATION_COUNTRY = "US";

const MOVIE_SORT_FIELDS: Record<SortOption, string> = {
  popularity: "popularity",
  rating: "vote_average",
  release: "primary_release_date",
  title: "title",
  revenue: "revenue",
};

const TV_SORT_FIELDS: Record<SortOption, string> = {
  ...MOVIE_SORT_FIELDS,
  release: "first_air_date",
  title: "name",
  revenue: MOVIE_SORT_FIELDS.popularity,
};

const sortParam = (fields: Record<SortOption, string>, { sortBy, sortOrder }: DiscoverFilters) =>
  `${fields[sortBy]}.${sortOrder}`;

// A bound at the slider's edge means "no limit", so it isn't sent
const rangeParams = (range: Range | undefined, limits: Range, field: string) => ({
  [`${field}.gte`]: range && range.min > limits.min ? range.min : undefined,
  [`${field}.lte`]: range && range.max < limits.max ? range.max : undefined,
});

const sharedParams = (filters: DiscoverFilters, page: number) => ({
  include_adult: false,
  with_genres: filters.genres.join(",") || undefined,
  with_original_language: filters.language,
  "vote_count.gte": filters.minVotes,
  ...rangeParams(filters.score, SCORE_LIMITS, "vote_average"),
  ...rangeParams(filters.runtime, RUNTIME_LIMITS, "with_runtime"),
  page,
});

const discoverMoviePage = (filters: DiscoverFilters, page: number) =>
  tmdbFetch<MovieList>("/discover/movie", {
    ...sharedParams(filters, page),
    sort_by: sortParam(MOVIE_SORT_FIELDS, filters),
    certification: filters.certifications.join("|") || undefined,
    certification_country: filters.certifications.length ? CERTIFICATION_COUNTRY : undefined,
    "primary_release_date.gte": filters.releaseFrom,
    "primary_release_date.lte": filters.releaseTo,
  });

const discoverTvShowPage = (filters: DiscoverFilters, page: number) =>
  tmdbFetch<TvShowList>("/discover/tv", {
    ...sharedParams(filters, page),
    sort_by: sortParam(TV_SORT_FIELDS, filters),
    "first_air_date.gte": filters.releaseFrom,
    "first_air_date.lte": filters.releaseTo,
    "air_date.gte": filters.airingFrom,
    "air_date.lte": filters.airingTo,
  });

export {
  discoverMoviePage,
  discoverTvShowPage,
}
