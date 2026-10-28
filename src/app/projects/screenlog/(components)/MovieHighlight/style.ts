import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import TmdbImage from "../TmdbImage";

export const MovieHighlightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.large};
`;

export const HighlightPoster = styled(TmdbImage)`
  flex-shrink: 0;
  border: 2px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.screenlog.posterBackground};
  width: 200px;
  height: 300px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 150px;
    height: 225px;
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.md};
`;

export const Title = styled.h5`
  font-size: ${theme.fontSize.h5};
  color: ${theme.colors.text.primary};
  font-weight: 500;
  line-height: 1.1;
`;

export const ExtraInfo = styled.div``;

export const Overview = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.md};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.small};

  button {
    font-size: ${theme.fontSize.md};
    padding: ${theme.spacing.xsmall} ${theme.spacing.medium};
  }
`;
