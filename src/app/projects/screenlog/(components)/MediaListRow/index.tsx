import { formatDate } from "@/shared/utils/stringUtils";
import { MediaCardData } from "../../(helpers)/mediaDetails";
import {
  Rank, RatingValue, RowInfo, RowMeta, RowOverview, RowPoster, RowRating, RowTitle, RowWrapper,
} from "./style";

interface MediaListRowProps {
  rank: number;
  item: MediaCardData;
  genres: string[];
}

const MediaListRow = ({ rank, item, genres }: MediaListRowProps) => {
  const { href, title, posterPath, releaseDate, vote, voteCount, overview } = item;
  const meta = [formatDate(releaseDate, "yearOnly"), ...genres].filter(Boolean).join(" • ");

  return (
    <RowWrapper href={href}>
      <Rank>{rank}</Rank>
      <RowPoster path={posterPath} size="w185" alt="" />
      <RowInfo>
        <RowTitle>{title}</RowTitle>
        {meta && <RowMeta>{meta}</RowMeta>}
        {!!voteCount &&
          <RowRating>
            <RatingValue voteValue={vote}>{vote.toFixed(1)}</RatingValue>
            {voteCount.toLocaleString("en-US")} votes
          </RowRating>
        }
        {overview && <RowOverview>{overview}</RowOverview>}
      </RowInfo>
    </RowWrapper>
  );
};

export default MediaListRow;
