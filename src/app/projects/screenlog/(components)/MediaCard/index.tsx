import { formatDate } from "@/shared/utils/stringUtils";
import MediaPlaceholder from "../../../../../shared/assets/icons/emptyMediaIcon.svg";
import { tmdbImage } from "../../(helpers)/tmdbImage";
import {
  CardGenre, CardOverlay, CardPoster, CardRating, CardTitle,
  CardYear, MediaCardWrapper, PosterFrame,
} from "./style";

interface MediaCardProps {
  href: string;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  vote: number;
  genre?: string;
}

const MediaCard = ({ href, title, posterPath, releaseDate, vote, genre }: MediaCardProps) => (
  <MediaCardWrapper href={href}>
    <PosterFrame>
      {posterPath
        ? <CardPoster src={tmdbImage(posterPath, "w342")} alt="" loading="lazy" />
        : <MediaPlaceholder />
      }
      <CardOverlay />
      {!!vote && <CardRating voteValue={vote}>{vote.toFixed(1)}</CardRating>}
      {genre && <CardGenre>{genre}</CardGenre>}
    </PosterFrame>
    <CardTitle>{title}</CardTitle>
    <CardYear>{formatDate(releaseDate, "yearOnly")}</CardYear>
  </MediaCardWrapper>
);

export default MediaCard;
