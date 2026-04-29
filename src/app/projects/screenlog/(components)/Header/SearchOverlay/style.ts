import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background: ${theme.colors.background.heavyOverlay};
  z-index: 200;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.large} 6%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: opacity 0.2s ease;
`;

export const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.large};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.none};
  display: flex;
  align-items: center;
  color: ${theme.colors.text.secondary};
  flex-shrink: 0;

  svg {
    width: ${theme.spacing.medium};
    height: ${theme.spacing.medium};
  }

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const Dropdown = styled.ul`
  list-style: none;
  margin: ${theme.spacing.none};
  padding: ${theme.spacing.none};
  display: flex;
  flex-direction: column;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.small} ${theme.spacing.none};
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors.border.default};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
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
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing.small} ${theme.spacing.none};
`;

export const SeeAllItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.small} ${theme.spacing.none};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: ${theme.spacing.default};
    height: ${theme.spacing.default};
    flex-shrink: 0;
  }
`;
