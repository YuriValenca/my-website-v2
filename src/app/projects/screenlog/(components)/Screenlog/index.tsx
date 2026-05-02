"use client";

import { useMemo } from "react";
import MovieSection from "../MovieSection";
import { ScreenlogWrapper } from "./style";
import { useGetGenres, useGetMoviePageData } from "../../(hooks)/useMovies";
import { useGetTvGenres } from "../../(hooks)/useTVShows";
import Spinner from "@/shared/components/Spinner";
import { randomRange } from "@/shared/utils/mathUtils";
import MovieHighlight from "../MovieHighlight";
import GenreContext from "../../(context)/context";

const Screenlog = () => {
  const { latest, popular, topRated, isLoading, isError } = useGetMoviePageData({ enabled: true });
  const { data: movieGenres = [] } = useGetGenres();
  const { data: tvGenres = [] } = useGetTvGenres();

  // Get random movies. The min is fallback JIC the popular endpoint returns less than 20 movies.
  const randomPopMovie = useMemo(() => {
    if (!popular?.total_results) return 0;
    return randomRange(0, Math.min(20, popular.total_results));
  }, [popular?.total_results]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>

  return (
    <GenreContext.Provider value={{ movieGenres, tvGenres }}>
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
