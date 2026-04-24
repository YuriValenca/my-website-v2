import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.micro};
  margin-top: ${theme.spacing.medium};
`;

export const PageButton = styled.button<{ active?: boolean }>`
  min-width: ${theme.spacing.medium};
  height: ${theme.spacing.medium};
  padding: 0 ${theme.spacing.xsmall};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${({ active }) => active ? theme.colors.accent.blue : "transparent"};
  background-color: ${({ active }) => active ? theme.colors.accent.blue : "transparent"};
  color: ${({ active }) => active ? theme.colors.neutral.white : theme.colors.text.secondary};
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${({ active }) => active ? theme.colors.accent.blue : theme.colors.background.surfaceHover};
    color: ${theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const Ellipsis = styled.span`
  min-width: ${theme.spacing.medium};
  height: ${theme.spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.md};
  user-select: none;
`;
