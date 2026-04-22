import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.none} 10%;
  background-color: ${theme.colors.background.surface};
  height: ${theme.spacing.huge};

  svg {
    width: ${theme.spacing.medium};
    height: ${theme.spacing.medium};
    flex-shrink: 0;
    cursor: pointer;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    height: ${theme.spacing.xxxlarge};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.none} 6%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: ${theme.spacing.xxxlarge};
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.medium};
`;

export const Title = styled.h2`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.h2};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.none} ${theme.spacing.medium} ${theme.spacing.micro} ${theme.spacing.none};
  letter-spacing: 1px;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.default};
`;
