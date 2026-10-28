const BASE_URL = "https://api.themoviedb.org/3";

// TMDB rejects any page past 500, whatever total_pages says
export const TMDB_MAX_PAGES = 500;
export const TMDB_PAGE_SIZE = 20;
// Larger result sets all report exactly this total, so it can't be shown as a real count
export const TMDB_TOTAL_RESULTS_CAP = 20001;

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  Accept: "application/json",
};

export type QueryParams = Record<string, string | number | boolean | undefined>;

const buildUrl = (path: string, params: QueryParams) => {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url.toString();
};

export async function tmdbFetch<T>(path: string, params: QueryParams = {}): Promise<T> {
  const res = await fetch(buildUrl(path, params), { headers });

  if (!res.ok) throw new Error(`TMDB request to ${path} failed: ${res.status}`);

  return res.json() as Promise<T>;
}
