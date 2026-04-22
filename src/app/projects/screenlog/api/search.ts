import { MovieList } from "../types/movies";
import { PersonList } from "../types/people";
import { TvShowList } from "../types/tv-shows";
import { MultiSearchList } from "../types/searchResults";

const BASE_URL = "https://api.themoviedb.org/3";
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
}

async function searchMovies(query: string, page = 1): Promise<MovieList> {
  const res = await fetch (
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&page=${page}`,
    { headers }
  )

  if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status}`);

  return res.json() as Promise<MovieList>
}

async function searchTvShows(query: string, page = 1): Promise<TvShowList> {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&page=${page}`,
    { headers }
  );

  if (!res.ok) throw new Error(`Failed to search TV shows: ${res.status}`);

  return res.json() as Promise<TvShowList>;
}

async function searchPeople(query: string, page = 1): Promise<PersonList> {
  const res = await fetch(
    `${BASE_URL}/search/person?query=${encodeURIComponent(query)}&page=${page}`,
    { headers }
  );

  if (!res.ok) throw new Error(`Failed to search people: ${res.status}`);

  return res.json() as Promise<PersonList>;
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
  searchTvShows,
  searchPeople,
  searchMulti,
}