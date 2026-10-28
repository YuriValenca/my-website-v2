import { Genre } from "../(types)/movies";
import { TvShowDetails, TvShowList } from "../(types)/tv-shows";
import { tmdbFetch } from "./tmdbClient";

async function getTvGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/tv/list");
  return data.genres;
}

const getLatestTvShows = () => tmdbFetch<TvShowList>("/tv/on_the_air");

// Same issue as movies' top rated, with a lower floor since shows get fewer votes
export const TOP_RATED_TV_MIN_VOTES = 2000;

const getTopRatedTvShows = (page = 1) =>
  tmdbFetch<TvShowList>("/discover/tv", {
    sort_by: "vote_average.desc",
    "vote_count.gte": TOP_RATED_TV_MIN_VOTES,
    page,
  });

const getPopularTvShows = (page = 1) => tmdbFetch<TvShowList>("/tv/popular", { page });

const getTvShow = (id: number) =>
  tmdbFetch<TvShowDetails>(`/tv/${id}`, {
    append_to_response: "credits,videos,recommendations,content_ratings",
  });

export {
  getTvGenres,
  getLatestTvShows,
  getTopRatedTvShows,
  getPopularTvShows,
  getTvShow,
};
