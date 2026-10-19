import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useGenres } from "../../(context)/context";
import { Movie } from "../../(types)/movies";
import Button from "@/shared/components/Button";
import RandomizeIcon from "../../../../../shared/assets/icons/randomizeIcon.svg";
import { ButtonsWrapper, DetailsWrapper, ExtraInfo, HighlightPoster, MovieHighlightWrapper, Overview, RatingWrapper, Rating, Tag, Tags, Title, TopRow } from "./style";
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

  const displayGenres = genreList
    .filter(genre => data?.genre_ids.includes(genre.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const goToMovie = (id: number | undefined) => {
    if (id) router.push(screenlogRoutes.movie(id));
  };

  const handleSurpriseMe = async () => {
    const movie = await getSurpriseMovie();
    goToMovie(movie?.id);
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
          text="Surprise me"
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
          <Tags>
            {displayGenres.map(genre => (
              <Tag
                key={genre.id}
                onClick={() => router.push(screenlogRoutes.genre(genre.name))}
              >
                {genre.name}
              </Tag>
            ))}
          </Tags>
          <Title>{data?.title}</Title>
          <ExtraInfo>{formatDate(data?.release_date, 'yearOnly')}</ExtraInfo>
          <RatingWrapper>
            <Rating voteValue={data?.vote_average}>
              {data?.vote_average.toFixed(1)}
            </Rating>
            /10
          </RatingWrapper>
          {!isMobile && overviewAndButtons}
        </DetailsWrapper>
      </TopRow>
      {isMobile && overviewAndButtons}
    </MovieHighlightWrapper>
  )
}

export default MovieHighlight;
