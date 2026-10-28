import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { getRatingColor } from "../../(helpers)/getRatingColor";
import { canHover, HOVER_TRANSITION } from "../../(helpers)/interactions";
import TmdbImage from "../TmdbImage";

export const RowWrapper = styled(Link)`
  display: grid;
  grid-template-columns: ${theme.spacing.xxxlarge} 80px 1fr;
  align-items: center;
  gap: ${theme.spacing.default};
  padding: ${theme.spacing.small};
  border-bottom: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.small};
  text-decoration: none;
  transition: ${HOVER_TRANSITION};

  ${canHover} {
    &:hover {
      background-color: ${theme.colors.background.surface};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: ${theme.spacing.large} 64px 1fr;
    gap: ${theme.spacing.small};
    padding: ${theme.spacing.xsmall} ${theme.spacing.none};
  }
`;

export const Rank = styled.span`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.h3};
  color: ${theme.colors.text.secondary};
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.h5};
  }
`;

export const RowPoster = styled(TmdbImage)`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border: 1px solid ${theme.colors.screenlog.posterBorder};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.screenlog.posterBackground};
`;

export const RowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.micro};
  min-width: 0;
`;

export const RowTitle = styled.p`
  font-size: ${theme.fontSize.normal};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const RowMeta = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const RowRating = styled.p`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.xsmall};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.placeholder};
`;

export const RatingValue = styled.span<{ voteValue: number }>`
  font-size: ${theme.fontSize.md};
  font-weight: bold;
  color: ${({ voteValue }) => getRatingColor(voteValue)};
`;

export const RowOverview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: ${theme.fontSize.md};
  line-height: 1.5;
  color: ${theme.colors.text.secondary};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;
