import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { getRatingColor } from "../../(helpers)/getRatingColor";

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
`;

export const Rating = styled.span<{ voteValue: number | undefined }>`
  color: ${({ voteValue }) => getRatingColor(voteValue)};
  font-size: ${theme.fontSize.h4};
  font-weight: bold;
`;
