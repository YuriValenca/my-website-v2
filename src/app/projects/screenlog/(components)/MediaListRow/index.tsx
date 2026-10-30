import { MediaCardData } from "../../(helpers)/mediaDetails";
import {
  Rank, RatingValue, RowHeading, RowInfo, RowMeta, RowOverview, RowPoster, RowRating, RowRole, RowTitle, RowWrapper,
  RowYear,
} from "./style";

interface MediaListRowProps {
  rank?: number;
  year?: string;
  item: MediaCardData;
  meta: string;
  role?: string;
}

const MediaListRow = ({ rank, year, item, meta, role }: MediaListRowProps) => {
  const { href, title, posterPath, vote, voteCount, overview } = item;

  return (
    <RowWrapper href={href} data-has-year={!!year}>
      {year ? <RowYear>{year}</RowYear> : <Rank>{rank}</Rank>}
      <RowPoster path={posterPath} size="w185" alt="" />
      <RowInfo>
        <RowHeading>
          <RowTitle>{title}</RowTitle>
          {role && <RowRole>{role}</RowRole>}
        </RowHeading>
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
