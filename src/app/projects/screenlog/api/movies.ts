import { MovieDetails, MovieList } from "../types/movies";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function getLatest(): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movie/now_playing`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch latest movies: ${res.status}`)

  return res.json() as Promise<MovieList>;
}

async function getTopRated(): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movies/top_rated`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch top rated movies: ${res.status}`)

  return res.json() as Promise<MovieList>;
}

async function getPopular(): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movies/popular`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch popular movies: ${res.status}`)  

  return res.json() as Promise<MovieList>;
}

async function searchMovies(query: string): Promise<MovieList> {
  const res = await fetch (
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=1`,
    { headers }
  )

  if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);

  return res.json() as Promise<MovieList>
}

async function getMovie(id: number): Promise<MovieDetails> {
  const res = await fetch (
    `${BASE_URL}/movie/${id}?append_to_response=credits`,
    { headers }
  )

  if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);

  return res.json() as Promise<MovieDetails>;
}

export {
  getLatest,
  getTopRated,
  getPopular,
  searchMovies,
  getMovie,
}
