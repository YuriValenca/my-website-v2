import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { MediaType } from "../../../types/searchResults";

export const ResultCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.default};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.default};
  background-color: ${theme.colors.background.surface};
  transition: transform 0.3s ease;
  cursor: pointer;

  :hover {
    background-color: ${theme.colors.background.surfaceHover};
    transform: scale(1.02);
  }
`;

export const ResultDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.xsmall};
`;

export const PosterWrapper = styled.div<{ variant: MediaType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-start;
  background-color: ${theme.colors.neutral.gray200};
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  width: ${({ variant }) => variant === "person" ? theme.spacing.enormous : theme.spacing[100]};
  height: ${({ variant }) => variant === "person" ? "unset" : "150px"};

  svg {
    width: ${theme.spacing.enormous};
    height: ${theme.spacing.enormous};
    fill: ${theme.colors.neutral.gray400};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: ${({ variant }) => variant === "person" ? theme.spacing.huge : "72px"};
    height: ${({ variant }) => variant === "person" ? "unset" : "108px"};
  }
`;

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

export const ResultTitle = styled.p`
  font-size: ${theme.fontSize.normal};
  color: ${theme.colors.text.primary};
`;

export const MediaDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.micro};
`;

export const MediaDetailContent = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.sm};
`;

export const PersonDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.nano};
`;
