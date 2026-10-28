import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { contentGutter } from "../../(helpers)/contentGutter";
import { canHover } from "../../(helpers)/interactions";
import { MEDIA_CARD_WIDTH } from "../MediaCard/style";

export const MediaListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.enormous};
  ${contentGutter};
`;

export const ListTitle = styled.h1`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.h1};
  font-weight: normal;
  color: ${theme.colors.text.primary};
`;

export const CategoryTabs = styled.nav`
  display: flex;
  gap: ${theme.spacing.large};
  overflow-x: auto;
  border-bottom: 1px solid ${theme.colors.border.default};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryTab = styled(Link)<{ isActive: boolean }>`
  flex-shrink: 0;
  padding-bottom: ${theme.spacing.small};
  border-bottom: 2px solid ${({ isActive }) => (isActive ? theme.colors.accent.blue : "transparent")};
  margin-bottom: -1px;
  font-size: ${theme.fontSize.normal};
  color: ${({ isActive }) => (isActive ? theme.colors.text.primary : theme.colors.text.secondary)};
  text-decoration: none;
  transition: color 0.2s ease;

  ${canHover} {
    &:hover {
      color: ${theme.colors.text.primary};
    }
  }
`;

export const ListToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.small};
`;

export const ListDescription = styled.p`
  font-size: ${theme.fontSize.normal};
  color: ${theme.colors.text.secondary};
`;

export const TotalCount = styled.span`
  margin-left: ${theme.spacing.xsmall};
  color: ${theme.colors.text.placeholder};
`;

export const ViewToggle = styled.div`
  display: flex;
  padding: ${theme.spacing.nano};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.medium};
`;

export const ViewOption = styled.button<{ isActive: boolean }>`
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border: none;
  border-radius: ${theme.borderRadius.small};
  background-color: ${({ isActive }) => (isActive ? theme.colors.background.surfaceHover : "transparent")};
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  color: ${({ isActive }) => (isActive ? theme.colors.text.primary : theme.colors.text.secondary)};
  cursor: pointer;
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${MEDIA_CARD_WIDTH}px);
  justify-content: space-between;
  gap: ${theme.spacing.large} ${theme.spacing.default};
`;

export const MediaRows = styled.div`
  display: flex;
  flex-direction: column;
`;
