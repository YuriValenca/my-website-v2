import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
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

  &[data-icon-position="right"] {
    flex-direction: row-reverse;
  }

  svg {
    width: ${theme.spacing.default};
    height: ${theme.spacing.default};
  }
`;
