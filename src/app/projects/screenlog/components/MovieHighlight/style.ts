import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

const getRatingColor = (vote: number | undefined): string => {
  if (!vote) return theme.colors.feedback.badRating;
  if (vote >= 7) return theme.colors.feedback.goodRating;
  if (vote >= 5) return theme.colors.feedback.avgRating;
  if (vote >= 3) return theme.colors.feedback.badRating;
  return theme.colors.feedback.horribleRating;
};

export const MovieHighlightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.large};

  img {
    border: 2px solid ${theme.colors.border.default};
    border-radius: ${theme.borderRadius.medium};
    width: 200px;
    height: 300px;
    cursor: pointer;
    transition: transform 0.3s ease;

    :hover {
      transform: scale(1.05);
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 150px;
      height: 225px;
    }
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.md};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Tag = styled.button`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.tooltip};
  text-transform: uppercase;
  background-color: transparent;
  padding: ${theme.spacing.micro};
  border: 1px solid ${theme.colors.border.default};
  color: ${theme.colors.text.placeholder};
  border-radius: ${theme.borderRadius.small};
  line-height: 1.25;
  letter-spacing: 2px;
  cursor: pointer;
  transition: opacity 0.25s ease-in-out;

  :hover {
    opacity: 0.7;
  }
`;

export const Title = styled.h3``;

export const ExtraInfo = styled.div``;

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

export const Overview = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.md};
`;

export const Cast = styled.div``;

export const CastAvatar = styled.div``;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.small};

  button {
    font-size: ${theme.fontSize.md};
    padding: ${theme.spacing.xsmall} ${theme.spacing.medium};
  }

  button:last-of-type {
    border: 1px solid ${theme.colors.border.default};
  }
`;
