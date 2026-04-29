import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.none} 10% ${theme.spacing[100]};
  gap: ${theme.spacing.xxlarge};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.none} 6% ${theme.spacing[100]};
    flex-direction: column;
  }
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: fit-content;
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.none} ${theme.borderRadius.none} ${theme.borderRadius.medium} ${theme.borderRadius.medium};
`;

export const ResultsTitle = styled.p`
  padding: ${theme.spacing.default};
  font-weight: bold;
  background-color: ${theme.colors.accent.blue};
  border-radius: ${theme.borderRadius.medium} ${theme.borderRadius.medium} ${theme.borderRadius.none} ${theme.borderRadius.none};
`;

export const Category = styled.div<{ active: boolean }>`
  min-width: 190px;
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.xxxlarge};
  padding: ${theme.spacing.small} ${theme.spacing.default};
  font-weight: ${({ active }) => active ? "600" : "400"};
  color: ${({ active }) => active ? theme.colors.neutral.white : theme.colors.text.secondary};
  cursor: pointer;
  transition: opacity 0.25s ease-in-out;

  :hover {
    opacity: 0.7;
  }

  :nth-of-type(2) {
    border-top: 1px solid ${theme.colors.border.default};
    border-bottom: 1px solid ${theme.colors.border.default};
  }
`;

export const CategoryAmount = styled.span`
  font-size: ${theme.fontSize.xsm};
  background-color: ${theme.colors.neutral.gray100};
  color: ${theme.colors.neutral.gray800};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.micro};
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${theme.spacing.medium};
`;
