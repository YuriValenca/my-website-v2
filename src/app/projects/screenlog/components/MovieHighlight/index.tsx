import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGenres } from "../../context/context";
import { Movie } from "../../types/movies";
import Button from "@/shared/components/Button";
import RandomizeIcon from "../../../../../shared/assets/icons/randomizeIcon.svg";
import { ButtonsWrapper, Cast, DetailsWrapper, ExtraInfo, MovieHighlightWrapper, Overview, RatingWrapper, Rating, Tag, Tags, Title, TopRow } from "./style";
import { theme } from "@/shared/theme/theme";
import { getPopular } from "../../api/movies";
import { formatDate } from "@/shared/utils/stringUtils";

interface MovieHighlightProps {
  data: Movie | undefined;
  totalResults: number | undefined;
}

const TABLET_BREAKPOINT = parseInt(theme.breakpoints.tablet);

const MovieHighlight = ({ data, totalResults }: MovieHighlightProps) => {
  const router = useRouter();
  const genreList = useGenres();
  const [isMobile, setIsMobile] = useState(window.innerWidth < TABLET_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < TABLET_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayGenres = genreList
    .filter(genre => data?.genre_ids.includes(genre.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSurpriseMe = async () => {
    if (!totalResults) return;
    const randomIndex = Math.floor(Math.random() * totalResults);
    const randomPage = Math.floor(randomIndex / 20) + 1;
    const randomIndexOnPage = randomIndex % 20;

    const result = await getPopular(randomPage);
    const movie = result.results[randomIndexOnPage];
    router.push(`projects/screenlog/movie/id=${movie?.id}`)
  }

  const overviewAndButtons = (
    <>
      <Overview>{data?.overview}</Overview>
      <ButtonsWrapper>
        <Button
          bg={theme.colors.neutral.gray100}
          onClick={() => router.push(`projects/screenlog/movie/id=${data?.id}`)}
          text="See details"
          textColor={theme.colors.text.dark}
        />
        <Button
          bg="transparent"
          onClick={handleSurpriseMe}
          text="Surprise me"
          textColor={theme.colors.text.secondary}
          icon={<RandomizeIcon />}
        />
      </ButtonsWrapper>
    </>
  );

  return (
    <MovieHighlightWrapper>
      <TopRow>
        <img
          src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
          alt={data?.title}
        />
        <DetailsWrapper>
          <Tags>
            {displayGenres.map(genre => (
              <Tag key={genre.id}>{genre.name}</Tag>
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
          <Cast />
          {!isMobile && overviewAndButtons}
        </DetailsWrapper>
      </TopRow>
      {isMobile && overviewAndButtons}
    </MovieHighlightWrapper>
  )
}

export default MovieHighlight;
