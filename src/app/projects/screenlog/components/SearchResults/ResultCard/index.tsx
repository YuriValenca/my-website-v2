import { Movie } from "../../../types/movies";
import { Person } from "../../../types/people";
import { MediaType } from "../../../types/searchResults";
import { TvShow } from "../../../types/tv-shows";


interface ResultCardProps {
  item: Movie | TvShow | Person;
  mediaType: MediaType;
}

const ResultCard = ({ item, mediaType }: ResultCardProps) => {
  const label = mediaType === "person" 
    ? (item as Person).name 
    : mediaType === "movie" 
      ? (item as Movie).title 
      : (item as TvShow).name;

  return (
    <>
      {label}
    </>
  )
};

export default ResultCard;
