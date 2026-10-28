import { Rating, RatingWrapper } from "./style";

interface RatingScoreProps {
  vote: number | undefined;
}

const RatingScore = ({ vote }: RatingScoreProps) => (
  <RatingWrapper>
    <Rating voteValue={vote}>{vote?.toFixed(1)}</Rating>
    /10
  </RatingWrapper>
);

export default RatingScore;
