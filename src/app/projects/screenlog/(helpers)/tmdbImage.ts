export type TmdbImageSize = "w185" | "w342" | "w500" | "original";

export const tmdbImage = (path: string, size: TmdbImageSize) => `https://image.tmdb.org/t/p/${size}${path}`;
