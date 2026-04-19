import { useRouter } from "next/navigation";
import { useGenres } from "../../context/context";
import { Movie } from "../../types/movies";
import Button from "@/shared/components/Button";
import RandomizeIcon from "../../../../../shared/assets/icons/randomizeIcon.svg";
import { ButtonsWrapper, Cast, DetailsWrapper, ExtraInfo, MovieHighlightWrapper, Overview, Rating, RatingWrapper, Tag, Tags, Title } from "./style";
import { theme } from "@/shared/theme/theme";
import { getPopular } from "../../api/movies";
import { formatDate } from "@/shared/utils/stringUtils";

interface MovieHighlightProps {
  data: Movie | undefined;
  totalResults: number | undefined;
}

const MovieHighlight = ({
  data,
  totalResults,
}: MovieHighlightProps) => {
  const router = useRouter();
  const genreList = useGenres();

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

  return (
    <MovieHighlightWrapper>
      <img
        src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
        alt={data?.title}
      />
      <DetailsWrapper>
        <Tags>
          {displayGenres.map(genre => (
            <Tag
              key={genre.id}
              // onClick={() => router.push(`/projects/screenlog/genre/${displayGenre.name}`)}
            >
              {genre.name}
            </Tag>
          ))}
        </Tags>
        <Title>{data?.title}</Title>
        <ExtraInfo>
          {formatDate(data?.release_date, 'yearOnly')}
        </ExtraInfo>
        <RatingWrapper>
          <Rating voteValue={data?.vote_average}>
            {data?.vote_average.toFixed(1)}
          </Rating>
          /10
        </RatingWrapper>
        <Overview>
          {data?.overview}
        </Overview>
        <Cast>

        </Cast>
        <ButtonsWrapper>
          <Button
            bg={theme.colors.neutral.gray100}
            onClick={() => router.push(`projects/screenlog/movie/id=${data?.id}`)}
            text="See details"
            textColor={theme.colors.text.dark}
          />
          <Button
            bg="transparent"
            onClick={() => handleSurpriseMe()}
            text="Surprise me"
            textColor={theme.colors.text.secondary}
            icon={<RandomizeIcon />}
          />
        </ButtonsWrapper>
      </DetailsWrapper>
    </MovieHighlightWrapper>
  )
}

export default MovieHighlight;
