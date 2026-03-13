import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const StyledButton = styled.button`
  padding: ${theme.spacing.xsmall} ${theme.spacing.default};
  border: none;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: ${theme.fontSize.normal};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &[data-bold="true"] {
    font-weight: bold;
  }
`;
