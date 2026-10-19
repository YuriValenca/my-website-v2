import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

// The negative margin cancels the inline padding, which only exists so the scaled poster isn't clipped by the scroll
export const RecommendationsWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.default};
  overflow-x: auto;
  padding: ${theme.spacing.small} ${theme.spacing.xsmall} ${theme.spacing.xsmall};
  margin: ${theme.spacing.none} -${theme.spacing.xsmall};
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.border.default} transparent;
`;
