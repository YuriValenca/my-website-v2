import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const SelectionCellModalArea = styled.div<{ solved?: boolean }>`
  background-color: ${({ solved }) => solved ? "transparent" : theme.colors.neutral.gray100};
  width: 100%;
  height: 100%;
  cursor: ${({ solved }) => solved ? "default" : "pointer"};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ solved }) => solved ? "transparent" : theme.colors.neutral.gray200};
  }
`;

 export const SolvedPokemonImage = styled.img `
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const PairTypes = styled.p`
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.small};
`;

export const SuggestionsInputWrapper = styled.div`
  position: relative;
`;

export const SuggestionsWrapper = styled.ul`
  list-style: none;
  margin: ${theme.spacing.none};
  padding: ${theme.spacing.none};
  margin-top: ${theme.spacing.small};
  max-height: 400px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: ${theme.spacing.xsmall};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.neutral.gray600};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.neutral.gray400};
  }
`;

export const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  cursor: pointer;
  background-color: "transparent";
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.text.primary};

  &:hover {
    background-color: ${theme.colors.background.surfaceHover};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.none};
  }
`;

export const SuggestionPokemonImage = styled.img`
  width: ${theme.spacing.enormous};
  height: ${theme.spacing.enormous};
`;
