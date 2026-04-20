import { Genre, MovieDetails, MovieList } from "../types/movies";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function getGenres(): Promise<Genre[]> {
  const res = await fetch (`${BASE_URL}/genre/movie/list`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch movie genres: ${res.status}`)

  return res.json().then((data) => data.genres);
}

async function getLatest(): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movie/now_playing`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch latest movies: ${res.status}`)

  return res.json() as Promise<MovieList>;
}

async function getTopRated(): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch top rated movies: ${res.status}`)

  return res.json() as Promise<MovieList>;
}

async function getPopular(page?: number): Promise<MovieList> {
  const res = await fetch(`${BASE_URL}/movie/popular${page ? `?page = ${page}` : ''}`, { headers })

  if (!res.ok) throw new Error (`Failed to fetch popular movies: ${res.status}`)  

  return res.json() as Promise<MovieList>;
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
  getGenres,
  getLatest,
  getTopRated,
  getPopular,
  getMovie,
}
