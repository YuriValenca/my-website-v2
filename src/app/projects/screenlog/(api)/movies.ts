import { Genre, MovieDetails, MovieList } from "../(types)/movies";
import { tmdbFetch } from "./tmdbClient";

async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

const getLatest = () => tmdbFetch<MovieList>("/movie/now_playing");

// /movie/top_rated lets new releases with a few hundred votes outrank classics, so the vote floor is set here
const TOP_RATED_MIN_VOTES = 5000;

const getTopRated = (page = 1) =>
  tmdbFetch<MovieList>("/discover/movie", {
    include_adult: false,
    sort_by: "vote_average.desc",
    "vote_count.gte": TOP_RATED_MIN_VOTES,
    page,
  });

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
