import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { getRatingColor } from "../../(helpers)/getRatingColor";
import { HOVER_SCALE, HOVER_TRANSITION, hoverScale } from "../../(helpers)/interactions";

export const MediaCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 132px;
  text-decoration: none;

  ${hoverScale(HOVER_SCALE.default, "> :first-of-type")};
`;

export const PosterFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: ${theme.colors.screenlog.posterBackground};
  border: 1px solid ${theme.colors.screenlog.posterBorder};
  border-radius: ${theme.borderRadius.small};
  transition: ${HOVER_TRANSITION};

  svg {
    width: ${theme.spacing.xxxlarge};
    height: ${theme.spacing.xxxlarge};
    fill: ${theme.colors.border.input};
  }
`;

export const CardPoster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, ${theme.colors.screenlog.ratingBg} 0%, transparent 45%);
`;

export const CardRating = styled.span<{ voteValue: number }>`
  position: absolute;
  top: ${theme.spacing.micro};
  right: ${theme.spacing.micro};
  padding: 1px ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.screenlog.ratingBg};
  color: ${({ voteValue }) => getRatingColor(voteValue)};
  font-size: ${theme.fontSize.xsm};
  font-weight: bold;
`;

export const CardGenre = styled.span`
  position: absolute;
  left: ${theme.spacing.micro};
  bottom: ${theme.spacing.micro};
  font-size: ${theme.fontSize.tooltip};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${theme.colors.screenlog.genreText};
`;

export const CardTitle = styled.p`
  margin-top: ${theme.spacing.xsmall};
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.primary};
  line-height: 1.3;
`;

export const CardYear = styled.p`
  font-size: ${theme.fontSize.tooltip};
  color: ${theme.colors.text.placeholder};
`;
