const SCREENLOG_ROOT = "/projects/screenlog";

export type ListMediaType = "movies" | "tv-shows";

export const LIST_CATEGORIES = ["popular", "now-playing", "top-rated", "discover"] as const;
export type ListCategory = typeof LIST_CATEGORIES[number];

export const isListCategory = (value: string): value is ListCategory =>
  (LIST_CATEGORIES as readonly string[]).includes(value);

export const screenlogRoutes = {
  home: () => SCREENLOG_ROOT,
  movie: (id: number) => `${SCREENLOG_ROOT}/movie/${id}`,
  tvShow: (id: number) => `${SCREENLOG_ROOT}/tv-show/${id}`,
  person: (id: number) => `${SCREENLOG_ROOT}/people/${id}`,
  genre: (name: string) => `${SCREENLOG_ROOT}/genre/${encodeURIComponent(name.toLowerCase())}`,
  list: (mediaType: ListMediaType, category: ListCategory) => `${SCREENLOG_ROOT}/${mediaType}/${category}`,
  search: (query: string) => `${SCREENLOG_ROOT}/search?query=${encodeURIComponent(query)}`,
};
