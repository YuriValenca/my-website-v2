const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  Accept: "application/json",
};

type QueryParams = Record<string, string | number | boolean>;

const buildUrl = (path: string, params: QueryParams) => {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url.toString();
};

export async function tmdbFetch<T>(path: string, params: QueryParams = {}): Promise<T> {
  const res = await fetch(buildUrl(path, params), { headers });

  if (!res.ok) throw new Error(`TMDB request to ${path} failed: ${res.status}`);

  return res.json() as Promise<T>;
}
