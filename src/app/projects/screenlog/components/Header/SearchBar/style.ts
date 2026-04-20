import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const SearchBarWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 280px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  transform: ${({ visible }) => (visible ? "translateX(0)" : "translateX(20px)")};
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.background.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
  list-style: none;
  margin: ${theme.spacing.none};
  padding: ${theme.spacing.micro} ${theme.spacing.none};
  z-index: 100;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${theme.colors.background.surfaceHover};
  }

  svg {
    width: ${theme.spacing.default};
    height: ${theme.spacing.default};
    flex-shrink: 0;
  }
`;

export const ItemLabel = styled.span`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.primary};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemCategory = styled.span`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.secondary};
  flex-shrink: 0;
`;

export const EmptyQuery = styled.span`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
`;

export const SeeAllItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  cursor: pointer;
  border-top: 1px solid ${theme.colors.border.default};
  transition: background 0.15s ease;

  &:hover {
    background: ${theme.colors.background.surfaceHover};
  }
`;