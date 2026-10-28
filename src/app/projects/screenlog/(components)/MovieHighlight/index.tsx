import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useGenres } from "../../(context)/context";
import { Movie } from "../../(types)/movies";
import Button from "@/shared/components/Button";
import RandomizeIcon from "../../../../../shared/assets/icons/randomizeIcon.svg";
import GenreTags from "../GenreTags";
import RatingScore from "../RatingScore";
import { ButtonsWrapper, DetailsWrapper, ExtraInfo, HighlightPoster, MovieHighlightWrapper, Overview, Title, TopRow } from "./style";
import { theme } from "@/shared/theme/theme";
import { getSurpriseMovie } from "../../(helpers)/getSurpriseMovie";
import { screenlogRoutes } from "../../(helpers)/routes";
import { formatDate } from "@/shared/utils/stringUtils";

interface MovieHighlightProps {
  data: Movie | undefined;
}

const MovieHighlight = ({ data }: MovieHighlightProps) => {
  const router = useRouter();
  const genreList = useGenres().movieGenres;
  const isMobile = useBreakpoint("tablet");
  const [isPicking, setIsPicking] = useState(false);

  const displayGenres = genreList
    .filter(genre => data?.genre_ids.includes(genre.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const goToMovie = (id: number | undefined) => {
    if (id) router.push(screenlogRoutes.movie(id));
  };

  // Only re-enabled when nothing was picked: on success the page is about to navigate away
  const handleSurpriseMe = async () => {
    setIsPicking(true);
    const movie = await getSurpriseMovie().catch(() => undefined);
    if (movie) return goToMovie(movie.id);
    setIsPicking(false);
  }

  const overviewAndButtons = (
    <>
      <Overview>{data?.overview}</Overview>
      <ButtonsWrapper>
        <Button
          bg={theme.colors.neutral.gray100}
          onClick={() => goToMovie(data?.id)}
          text="See details"
          textColor={theme.colors.text.dark}
        />
        <Button
          variant="outline"
          onClick={handleSurpriseMe}
          disabled={isPicking}
          text={isPicking ? "Picking..." : "Surprise me"}
          icon={<RandomizeIcon />}
        />
      </ButtonsWrapper>
    </>
  );

  return (
    <MovieHighlightWrapper>
      <TopRow>
        <HighlightPoster
          path={data?.poster_path ?? null}
          size="original"
          alt={data?.title ?? ""}
          loading="eager"
          onClick={() => goToMovie(data?.id)}
        />
        <DetailsWrapper>
          <GenreTags genres={displayGenres} />
          <Title>{data?.title}</Title>
          <ExtraInfo>{formatDate(data?.release_date, 'yearOnly')}</ExtraInfo>
          <RatingScore vote={data?.vote_average} />
          {!isMobile && overviewAndButtons}
        </DetailsWrapper>
      </TopRow>
      {isMobile && overviewAndButtons}
    </MovieHighlightWrapper>
  )
}

export default MovieHighlight;
