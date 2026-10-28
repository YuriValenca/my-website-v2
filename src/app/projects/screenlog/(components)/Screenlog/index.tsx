"use client";

import { useMemo } from "react";
import MovieSection from "../MovieSection";
import { ScreenlogWrapper } from "./style";
import { useGetGenres, useGetMoviePageData } from "../../(hooks)/useMovies";
import { useGetTvGenres } from "../../(hooks)/useTVShows";
import Spinner from "@/shared/components/Spinner";
import { theme } from "@/shared/theme/theme";
import TicketIcon from "../../../../../shared/assets/icons/ticketIcon.svg";
import FlameIcon from "../../../../../shared/assets/icons/flameIcon.svg";
import TrophyIcon from "../../../../../shared/assets/icons/trophyIcon.svg";
import { randomRange } from "@/shared/utils/mathUtils";
import MovieHighlight from "../MovieHighlight";
import GenreContext from "../../(context)/context";
import { screenlogRoutes } from "../../(helpers)/routes";

const Screenlog = () => {
  const { latest, popular, topRated, isLoading, isError } = useGetMoviePageData({ enabled: true });
  const { data: movieGenres = [] } = useGetGenres();
  const { data: tvGenres = [] } = useGetTvGenres();

  const randomPopMovie = useMemo(() => {
    const movieCount = popular?.results.length ?? 0;
    if (!movieCount) return 0;
    return randomRange(0, movieCount - 1);
  }, [popular?.results.length]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>

  return (
    <GenreContext.Provider value={{ movieGenres, tvGenres }}>
      <ScreenlogWrapper>
        <MovieHighlight data={popular?.results[randomPopMovie]} />
        <MovieSection
          title="Latest"
          badge="In theatres"
          badgeIcon={<TicketIcon />}
          badgeColor={theme.colors.screenlog.badge.inTheatres}
          seeAllHref={screenlogRoutes.list("movies", "now-playing")}
          data={latest}
        />
        <MovieSection
          title="Popular"
          badge="Trending now"
          badgeIcon={<FlameIcon />}
          badgeColor={theme.colors.screenlog.badge.trending}
          seeAllHref={screenlogRoutes.list("movies", "popular")}
          data={popular}
        />
        <MovieSection
          title="Top Rated"
          badge="All time"
          badgeIcon={<TrophyIcon />}
          badgeColor={theme.colors.screenlog.badge.allTime}
          seeAllHref={screenlogRoutes.list("movies", "top-rated")}
          data={topRated}
        />
      </ScreenlogWrapper>
    </GenreContext.Provider>
  )
}

export default Screenlog;
