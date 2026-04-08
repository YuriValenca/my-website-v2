import { MultiSearchList } from "../types/searchResults";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function searchMulti(query: string): Promise<MultiSearchList> {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=1`,
    { headers }
  );

  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  return res.json() as Promise<MultiSearchList>;
}

export {
  searchMulti,
}