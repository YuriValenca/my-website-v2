import { css } from "@emotion/react";
import { theme } from "@/shared/theme/theme";

// Wide screens get a narrower gutter, so the extra width goes to the content instead of empty sides
export const contentGutter = css`
  padding-inline: 6%;

  @media (max-width: ${theme.breakpoints.xxl}) {
    padding-inline: 10%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding-inline: 6%;
  }
`;
