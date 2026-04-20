import { MovieList } from "../types/movies";
import { MultiSearchList } from "../types/searchResults";

const BASE_URL = "https://api.themoviedb.org/3";
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function searchMovies(query: string): Promise<MovieList> {
  const res = await fetch (
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&page=1`,
    { headers }
  )

  if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);

  return res.json() as Promise<MovieList>
}

async function searchMulti(query: string): Promise<MultiSearchList> {
  const res = await fetch (
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&page=1`,
    { headers }
  )

  if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);

  return res.json() as Promise<MultiSearchList>
}

export {
  searchMovies,
  searchMulti,
}