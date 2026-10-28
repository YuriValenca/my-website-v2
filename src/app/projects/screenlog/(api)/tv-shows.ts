import { Genre } from "../(types)/movies";
import { TvShowDetails, TvShowList } from "../(types)/tv-shows";
import { tmdbFetch } from "./tmdbClient";

async function getTvGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/tv/list");
  return data.genres;
}

const getLatestTvShows = () => tmdbFetch<TvShowList>("/tv/on_the_air");

const getTopRatedTvShows = () => tmdbFetch<TvShowList>("/tv/top_rated");

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
