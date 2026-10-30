import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const SegmentedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${theme.spacing.nano};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
`;

export const SegmentedOption = styled.button<{ isActive: boolean }>`
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border: none;
  border-radius: ${theme.borderRadius.small};
  background-color: ${({ isActive }) => (isActive ? theme.colors.background.surfaceHover : "transparent")};
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  color: ${({ isActive }) => (isActive ? theme.colors.text.primary : theme.colors.text.secondary)};
  cursor: pointer;
`;
