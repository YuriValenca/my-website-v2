import { TOP_RATED_MIN_VOTES } from "../(api)/movies";
import { TOP_RATED_TV_MIN_VOTES } from "../(api)/tv-shows";
import { ListCategory, ListMediaType } from "./routes";

export type SortOption = "popularity" | "rating";

export interface DiscoverFilters {
  sortBy: SortOption;
  minVotes?: number;
  releaseFrom?: string;
  releaseTo?: string;
  airingFrom?: string;
  airingTo?: string;
}

// Same windows TMDB uses for its own now_playing and on_the_air lists
const NOW_PLAYING_DAYS_BACK = 42;
const ON_THE_AIR_DAYS_AHEAD = 7;

const isoDateFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const CATEGORY_FILTERS: Record<ListMediaType, Record<ListCategory, () => DiscoverFilters>> = {
  movies: {
    popular: () => ({ sortBy: "popularity" }),
    "now-playing": () => ({
      sortBy: "popularity",
      releaseFrom: isoDateFromToday(-NOW_PLAYING_DAYS_BACK),
      releaseTo: isoDateFromToday(0),
    }),
    "top-rated": () => ({ sortBy: "rating", minVotes: TOP_RATED_MIN_VOTES }),
    discover: () => ({ sortBy: "popularity" }),
  },
  "tv-shows": {
    popular: () => ({ sortBy: "popularity" }),
    "now-playing": () => ({
      sortBy: "popularity",
      airingFrom: isoDateFromToday(0),
      airingTo: isoDateFromToday(ON_THE_AIR_DAYS_AHEAD),
    }),
    "top-rated": () => ({ sortBy: "rating", minVotes: TOP_RATED_TV_MIN_VOTES }),
    discover: () => ({ sortBy: "popularity" }),
  },
};

export const getCategoryFilters = (mediaType: ListMediaType, category: ListCategory) =>
  CATEGORY_FILTERS[mediaType][category]();
