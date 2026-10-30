import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { contentGutter } from "../../(helpers)/contentGutter";
import TmdbImage from "../TmdbImage";

export const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxlarge};
  padding-block: ${theme.spacing.xxxlarge} ${theme.spacing.enormous};
  ${contentGutter};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.large};
    padding-block: ${theme.spacing.medium} ${theme.spacing.xxlarge};
  }
`;

export const PersonHero = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${theme.spacing.xxlarge};

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.medium};
  }
`;

export const PersonPhoto = styled(TmdbImage)`
  flex-shrink: 0;
  width: 240px;
  height: 360px;
  object-fit: cover;
  border: 2px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.screenlog.posterBackground};
`;

export const PersonInfo = styled.div`
  display: flex;
  flex: 999 1 520px;
  flex-direction: column;
  gap: ${theme.spacing.default};
  min-width: 0;
`;

export const PersonRole = styled.span`
  font-size: ${theme.fontSize.sm};
  letter-spacing: ${theme.spacing.nano};
  text-transform: uppercase;
  color: ${theme.colors.accent.blue};
`;

export const PersonName = styled.h1`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.display};
  font-weight: normal;
  line-height: 1.1;
  color: ${theme.colors.text.primary};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.h2};
  }
`;

export const LifeSummary = styled.p`
  font-size: ${theme.fontSize.normal};
  line-height: 1.5;
  color: ${theme.colors.text.secondary};
`;

export const PersonStats = styled.div`
  max-width: 640px;
  margin-top: ${theme.spacing.xsmall};
`;
