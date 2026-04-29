import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const ScreenlogWrapper = styled.div`
  height: calc(100dvh - (${theme.spacing.xxxlarge} + ${theme.spacing.huge}));
  padding: ${theme.spacing.medium} 10% ${theme.spacing.none};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.medium} 6% ${theme.spacing.none};
  }
`;
