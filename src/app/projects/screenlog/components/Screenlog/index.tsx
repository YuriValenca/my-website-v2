"use client";

import MovieSection from "../MovieSection";
import { ScreenlogWrapper } from "./style";
import { useGetGenres, useGetLandingPageData } from "../../hooks/useMovies";
import MovieHighlight from "../MovieHighlight";
import GenreContext from "../../context/context";

const Screenlog = () => {
  const { latest, popular, topRated, isLoading, isError } = useGetLandingPageData({ enabled: true });
  const { data: genreList = [] } = useGetGenres();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>

  return (
    <GenreContext.Provider value={genreList}>
      <ScreenlogWrapper>
        <MovieHighlight data={popular?.results[0]} totalResults={popular?.total_results} />
        <MovieSection title="Latest" data={latest} />
        <MovieSection title="Popular" data={popular} />
        <MovieSection title="Top Rated" data={topRated} />
      </ScreenlogWrapper>
    </GenreContext.Provider>
  )
}

export default Screenlog;
