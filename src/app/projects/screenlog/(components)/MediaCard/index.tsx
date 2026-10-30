import { formatDate } from "@/shared/utils/stringUtils";
import {
  CardCaption, CardLabel, CardOverlay, CardPoster, CardRating, CardTitle,
  MediaCardWrapper, PosterFrame,
} from "./style";

interface MediaCardProps {
  href: string;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  vote: number;
  label?: string;
  caption?: string;
}

const MediaCard = ({ href, title, posterPath, releaseDate, vote, label, caption }: MediaCardProps) => (
  <MediaCardWrapper href={href}>
    <PosterFrame>
      <CardPoster path={posterPath} size="w342" alt="" />
      <CardOverlay />
      {!!vote && <CardRating voteValue={vote}>{vote.toFixed(1)}</CardRating>}
      {label && <CardLabel>{label}</CardLabel>}
    </PosterFrame>
    <CardTitle>{title}</CardTitle>
    <CardCaption>{caption || formatDate(releaseDate, "yearOnly")}</CardCaption>
  </MediaCardWrapper>
);

export default MediaCard;
