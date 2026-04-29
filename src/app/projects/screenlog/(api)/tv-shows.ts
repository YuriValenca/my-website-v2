import { TvShowDetails, TvShowList } from "../(types)/tv-shows";


const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  "Content-type": "application/json",
};

async function getTvGenres() {
  const res = await fetch(`${BASE_URL}/genre/tv/list`, { headers });

  if (!res.ok) throw new Error(`Failed to fetch TV genres: ${res.status}`);

  return res.json().then((data) => data.genres);
}

async function getLatestTvShows(): Promise<TvShowList> {
  const res = await fetch(`${BASE_URL}/tv/on_the_air`, { headers });

  if (!res.ok) throw new Error(`Failed to fetch latest TV shows: ${res.status}`);

  return res.json() as Promise<TvShowList>;
}

async function getTopRatedTvShows(): Promise<TvShowList> {
  const res = await fetch(`${BASE_URL}/tv/top_rated`, { headers });

  if (!res.ok) throw new Error(`Failed to fetch top rated TV shows: ${res.status}`);

  return res.json() as Promise<TvShowList>;
}

async function getPopularTvShows(page?: number): Promise<TvShowList> {
  const res = await fetch(`${BASE_URL}/tv/popular${page ? `?page=${page}` : ""}`, { headers });

  if (!res.ok) throw new Error(`Failed to fetch popular TV shows: ${res.status}`);

  return res.json() as Promise<TvShowList>;
}

async function searchTvShows(query: string): Promise<TvShowList> {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&page=1`,
    { headers }
  );

  if (!res.ok) throw new Error(`Failed to fetch TV show: ${res.status}`);

  return res.json() as Promise<TvShowList>;
}

async function getTvShow(id: number): Promise<TvShowDetails> {
  const res = await fetch(`${BASE_URL}/tv/${id}?append_to_response=credits`, { headers });

  if (!res.ok) throw new Error(`Failed to fetch TV show: ${res.status}`);

  return res.json() as Promise<TvShowDetails>;
}

export {
  getTvGenres,
  getLatestTvShows,
  getTopRatedTvShows,
  getPopularTvShows,
  searchTvShows,
  getTvShow,
};
