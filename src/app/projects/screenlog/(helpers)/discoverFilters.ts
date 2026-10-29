import { TOP_RATED_MIN_VOTES } from "../(api)/movies";
import { TOP_RATED_TV_MIN_VOTES } from "../(api)/tv-shows";
import { ListCategory, ListMediaType } from "./routes";

export type SortOption = "popularity" | "rating" | "release" | "title" | "revenue";
export type SortOrder = "desc" | "asc";

export interface Range {
  min: number;
  max: number;
}

export interface DiscoverFilters {
  sortBy: SortOption;
  sortOrder: SortOrder;
  genres: number[];
  certifications: string[];
  language?: string;
  score?: Range;
  minVotes?: number;
  runtime?: Range;
  releaseFrom?: string;
  releaseTo?: string;
  airingFrom?: string;
  airingTo?: string;
}

export const SCORE_LIMITS: Range = { min: 0, max: 10 };
export const RUNTIME_LIMITS: Range = { min: 0, max: 240 };
export const MIN_VOTES_OPTIONS = [0, 100, 500, 1000, 2000, 5000, 10000];
export const MOVIE_CERTIFICATIONS = ["G", "PG", "PG-13", "R", "NC-17"];

export const SORT_OPTIONS: Record<ListMediaType, { value: SortOption; label: string }[]> = {
  movies: [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "release", label: "Release date" },
    { value: "revenue", label: "Revenue" },
    { value: "title", label: "Title" },
  ],
  "tv-shows": [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "release", label: "First air date" },
    { value: "title", label: "Title" },
  ],
};

const SORT_ORDER_LABELS: Record<SortOption, Record<SortOrder, string>> = {
  popularity: { desc: "high to low", asc: "low to high" },
  rating: { desc: "high to low", asc: "low to high" },
  release: { desc: "newest first", asc: "oldest first" },
  revenue: { desc: "high to low", asc: "low to high" },
  title: { asc: "A → Z", desc: "Z → A" },
};

export const getDefaultSortOrder = (sortBy: SortOption): SortOrder => (sortBy === "title" ? "asc" : "desc");

const getOppositeOrder = (order: SortOrder): SortOrder => (order === "desc" ? "asc" : "desc");

// Each sort field shows up twice, with its natural direction first
export const getSortChoices = (mediaType: ListMediaType) =>
  SORT_OPTIONS[mediaType].flatMap(({ value, label }) => {
    const defaultOrder = getDefaultSortOrder(value);
    return [defaultOrder, getOppositeOrder(defaultOrder)].map((order) => ({
      sortBy: value,
      sortOrder: order,
      label: `${label} (${SORT_ORDER_LABELS[value][order]})`,
    }));
  });

// Same windows TMDB uses for its own now_playing and on_the_air lists
const NOW_PLAYING_DAYS_BACK = 42;
const ON_THE_AIR_DAYS_AHEAD = 7;

const isoDateFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const withDefaults = (filters: Partial<DiscoverFilters>): DiscoverFilters => ({
  sortBy: "popularity",
  genres: [],
  certifications: [],
  ...filters,
  sortOrder: getDefaultSortOrder(filters.sortBy ?? "popularity"),
});

const CATEGORY_FILTERS: Record<ListMediaType, Record<ListCategory, () => Partial<DiscoverFilters>>> = {
  movies: {
    popular: () => ({}),
    "now-playing": () => ({
      releaseFrom: isoDateFromToday(-NOW_PLAYING_DAYS_BACK),
      releaseTo: isoDateFromToday(0),
    }),
    "top-rated": () => ({ sortBy: "rating", minVotes: TOP_RATED_MIN_VOTES }),
  },
  "tv-shows": {
    popular: () => ({}),
    "now-playing": () => ({
      airingFrom: isoDateFromToday(0),
      airingTo: isoDateFromToday(ON_THE_AIR_DAYS_AHEAD),
    }),
    "top-rated": () => ({ sortBy: "rating", minVotes: TOP_RATED_TV_MIN_VOTES }),
  },
};

export const getCategoryFilters = (mediaType: ListMediaType, category: ListCategory) =>
  withDefaults(CATEGORY_FILTERS[mediaType][category]());

export type FilterSearchParams = Record<string, string | undefined>;

const SORT_VALUES: SortOption[] = ["popularity", "rating", "release", "title", "revenue"];
const RANGE_SEPARATOR = "-";
const LIST_SEPARATOR = ",";

const isSortOption = (value: string): value is SortOption => (SORT_VALUES as string[]).includes(value);

const parseNumber = (value: string | undefined) => {
  const number = Number(value);
  return value && Number.isFinite(number) ? number : undefined;
};

const parseRange = (value: string | undefined): Range | undefined => {
  const [min, max] = (value ?? "").split(RANGE_SEPARATOR).map(parseNumber);
  return min !== undefined && max !== undefined && min <= max ? { min, max } : undefined;
};

const parseList = (value: string | undefined) => (value ? value.split(LIST_SEPARATOR) : undefined);

// Category filters are the starting point; whatever the URL sets replaces them
export const parseDiscoverFilters = (
  mediaType: ListMediaType,
  category: ListCategory,
  params: FilterSearchParams,
): DiscoverFilters => {
  const filters = getCategoryFilters(mediaType, category);

  if (params.sort && isSortOption(params.sort)) {
    filters.sortBy = params.sort;
    filters.sortOrder = getDefaultSortOrder(params.sort);
  }
  if (params.order === "asc" || params.order === "desc") filters.sortOrder = params.order;
  if (params.genres) filters.genres = parseList(params.genres)!.map(Number).filter(Number.isInteger);
  if (params.cert) filters.certifications = parseList(params.cert)!.filter((cert) => MOVIE_CERTIFICATIONS.includes(cert));
  if (params.lang) filters.language = params.lang;
  if (params.score) filters.score = parseRange(params.score);
  if (params.votes) filters.minVotes = parseNumber(params.votes);
  if (params.runtime) filters.runtime = parseRange(params.runtime);
  if (params.from) filters.releaseFrom = params.from;
  if (params.to) filters.releaseTo = params.to;

  return filters;
};

export const isFullRange = (range: Range | undefined, limits: Range) =>
  !range || (range.min <= limits.min && range.max >= limits.max);

const formatRange = ({ min, max }: Range) => `${min}${RANGE_SEPARATOR}${max}`;

export const toFilterSearchParams = (filters: DiscoverFilters) => {
  const params = new URLSearchParams({ sort: filters.sortBy, order: filters.sortOrder });

  if (filters.genres.length) params.set("genres", filters.genres.join(LIST_SEPARATOR));
  if (filters.certifications.length) params.set("cert", filters.certifications.join(LIST_SEPARATOR));
  if (filters.language) params.set("lang", filters.language);
  if (!isFullRange(filters.score, SCORE_LIMITS)) params.set("score", formatRange(filters.score!));
  if (filters.minVotes) params.set("votes", String(filters.minVotes));
  if (!isFullRange(filters.runtime, RUNTIME_LIMITS)) params.set("runtime", formatRange(filters.runtime!));
  if (filters.releaseFrom) params.set("from", filters.releaseFrom);
  if (filters.releaseTo) params.set("to", filters.releaseTo);

  return params.toString();
};
