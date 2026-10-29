import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xsmall};
`;

export const Chip = styled.button<{ isSelected: boolean }>`
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border: 1px solid ${({ isSelected }) => (isSelected ? theme.colors.accent.blue : theme.colors.border.default)};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${({ isSelected }) => (isSelected ? theme.colors.accent.blueSoft : "transparent")};
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.sm};
  color: ${({ isSelected }) => (isSelected ? theme.colors.text.primary : theme.colors.text.secondary)};
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;
