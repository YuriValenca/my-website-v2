import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const MediaDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:first-of-type) {
    margin-bottom: ${theme.spacing.medium};
    padding: ${theme.spacing.none} 10%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    > *:not(:first-of-type) {
      padding: ${theme.spacing.none} 6%;
    }
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

export const PosterImage = styled.img`
  width: 160px;
  height: 240px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.medium};
  border: 2px solid ${theme.colors.border.default};
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

export const Tagline = styled.small`
  font-size: ${theme.fontSize.xsm};
  font-style: italic;
  color: ${theme.colors.text.secondary};
  line-height: 1.1;
`;

export const TextInfo = styled.div`
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.secondary};
  line-height: 1.25;
`;

export const RatingCount = styled.p`
  font-size: ${theme.fontSize.xsm};
  line-height: 1.25;
`;

export const SectionTitle = styled.p`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.xsm};
  text-transform: uppercase;
  color: ${theme.colors.text.placeholder};
  letter-spacing: ${theme.spacing.nano};
`;

export const OverviewWrapper = styled.div`
  hr {
    margin: ${theme.spacing.xsmall} ${theme.spacing.none};
    color: ${theme.colors.border.default};
  }
`;

export const OverviewContent = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
  text-transform: none;
  letter-spacing: normal;
`;

export const CastListWrapper = styled.div``;
