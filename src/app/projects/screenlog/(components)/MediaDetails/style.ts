import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { contentGutter } from "../../(helpers)/contentGutter";
import TmdbImage from "../TmdbImage";

export const MediaDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${theme.spacing.enormous};

  > *:not(:first-of-type) {
    margin-bottom: ${theme.spacing.medium};
    ${contentGutter};
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    padding-bottom: ${theme.spacing.xxlarge};
  }
`;

export const BackdropWrapper = styled.div`
  position: relative;
  height: 300px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const BackdropImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const BackdropFade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${theme.colors.background.page} 100%
  );
`;

export const HeroSection = styled.div`
  display: flex;
  gap: ${theme.spacing.large};
  margin-top: -${theme.spacing.xxlarge};
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing.medium};
  }
`;

export const PosterImage = styled(TmdbImage)`
  width: 220px;
  height: 330px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.medium};
  border: 2px solid ${theme.colors.border.default};
  background-color: ${theme.colors.screenlog.posterBackground};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 120px;
    height: 180px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.xsmall};
  color: ${theme.colors.text.secondary};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-top: ${theme.spacing.none};
  }
`;

export const MediaTitle = styled.h1`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.h1};
  font-weight: normal;
  color: ${theme.colors.text.primary};
  line-height: 1.1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.h4};
  }
`;

export const Tagline = styled.small`
  font-size: ${theme.fontSize.md};
  font-style: italic;
  color: ${theme.colors.text.secondary};
  line-height: 1.1;
`;

export const TextInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
  line-height: 1.25;
`;

export const Certification = styled.span`
  padding: 0 ${theme.spacing.micro};
  border: 1.5px solid ${theme.colors.text.secondary};
  border-radius: 3px;
  font-size: ${theme.fontSize.xsm};
  font-weight: bold;
  letter-spacing: 0.5px;
  color: ${theme.colors.text.primary};
  line-height: 1.6;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xsmall};
  margin-top: ${theme.spacing.micro};

  button {
    font-size: ${theme.fontSize.md};
  }

  svg {
    width: ${theme.spacing.small};
    height: ${theme.spacing.small};
  }
`;

export const RatingCount = styled.p`
  font-size: ${theme.fontSize.xsm};
  line-height: 1.25;
`;

// A lone section fills the row, since it is both the first and the last child
export const OverviewRow = styled.div`
  display: flex;
  gap: ${theme.spacing.xxlarge};

  > :first-of-type {
    flex: 3;
    min-width: 0;
  }

  > :last-of-type {
    flex: 2;
    min-width: 0;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${theme.spacing.large};
  }
`;

export const OverviewContent = styled.p`
  font-size: ${theme.fontSize.normal};
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  text-transform: none;
  letter-spacing: normal;
`;
