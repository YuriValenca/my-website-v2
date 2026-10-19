import { useGetGenres } from "../../(hooks)/useMovies";
import { useGetTvGenres } from "../../(hooks)/useTVShows";
import { MediaCardData } from "../../(helpers)/mediaDetails";
import { Genre } from "../../(types)/movies";
import MediaCard from "../MediaCard";
import { RecommendationsWrapper } from "./style";

interface RecommendationsProps {
  items: MediaCardData[];
  isTVShow: boolean;
}

const getFirstGenreName = (genreIds: number[], genres: Genre[]) =>
  genres.find(({ id }) => id === genreIds[0])?.name;

const Recommendations = ({ items, isTVShow }: RecommendationsProps) => {
  const { data: movieGenres = [] } = useGetGenres();
  const { data: tvGenres = [] } = useGetTvGenres();
  const genres = isTVShow ? tvGenres : movieGenres;

  return (
    <RecommendationsWrapper>
      {items.map(({ id, href, title, posterPath, releaseDate, vote, genreIds }) => (
        <MediaCard
          key={id}
          href={href}
          title={title}
          posterPath={posterPath}
          releaseDate={releaseDate}
          vote={vote}
          genre={getFirstGenreName(genreIds, genres)}
        />
      ))}
    </RecommendationsWrapper>
  );
};

export default Recommendations;
