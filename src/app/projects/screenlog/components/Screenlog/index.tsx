"use client";

import MovieSection from "../MovieSection";
import { ScreenlogWrapper } from "./style";
import { useGetGenres, useGetLandingPageData } from "../../hooks/useMovies";
import Spinner from "@/shared/components/Spinner";
import { randomRange } from "@/shared/utils/mathUtils";
import MovieHighlight from "../MovieHighlight";
import GenreContext from "../../context/context";

const Screenlog = () => {
  const { latest, popular, topRated, isLoading, isError } = useGetLandingPageData({ enabled: true });
  const { data: genreList = [] } = useGetGenres();

  // Get random movies. The min is fallback JIC the popular endpoint returns less than 20 movies.
  const randomPopMovie = randomRange(0, Math.min(20, (popular?.total_results || 1)));

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>

  return (
    <GenreContext.Provider value={genreList}>
      <ScreenlogWrapper>
        <MovieHighlight data={popular?.results[randomPopMovie]} totalResults={popular?.total_results} />
        <MovieSection title="Latest" data={latest} />
        <MovieSection title="Popular" data={popular} />
        <MovieSection title="Top Rated" data={topRated} />
      </ScreenlogWrapper>
    </GenreContext.Provider>
  )
}

export default Screenlog;
