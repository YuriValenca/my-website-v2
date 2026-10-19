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
  transition: opacity 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-variant="outline"] {
    background-color: transparent;
    border: 1px solid ${theme.colors.border.default};
    color: ${theme.colors.text.secondary};
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover:not(:disabled) {
      opacity: 1;
      background-color: ${theme.colors.background.surface};
      border-color: ${theme.colors.border.focus};
      color: ${theme.colors.text.primary};
    }
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
