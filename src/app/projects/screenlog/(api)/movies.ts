import { Genre, MovieDetails, MovieList } from "../(types)/movies";
import { tmdbFetch } from "./tmdbClient";

async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

const getLatest = () => tmdbFetch<MovieList>("/movie/now_playing");

const getTopRated = () => tmdbFetch<MovieList>("/movie/top_rated");

const getPopular = (page = 1) => tmdbFetch<MovieList>("/movie/popular", { page });

const getMovie = (id: number) =>
  tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,videos,recommendations,release_dates",
  });

const discoverMovies = (minVoteCount: number, page = 1) =>
  tmdbFetch<MovieList>("/discover/movie", {
    include_adult: false,
    sort_by: "popularity.desc",
    "vote_count.gte": minVoteCount,
    page,
  });

export {
  getGenres,
  getLatest,
  getTopRated,
  getPopular,
  getMovie,
  discoverMovies,
}
