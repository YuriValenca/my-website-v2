import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const ImageFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.border.input};

  svg {
    width: 40%;
    max-width: ${theme.spacing.xxxlarge};
    height: auto;
  }
`;
