import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { canHover } from "../../(helpers)/interactions";

const PAGING_AREA_WIDTH = 80;

// Paging buttons only show while the pointer is over the row, and never at the edge they point to
export const PagedRowViewport = styled.div`
  position: relative;

  ${canHover} {
    &:hover > button[data-available="true"] {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

// Offset by the track's negative margin to reach its real edge
export const PagingButton = styled.button<{ isNext?: boolean; controlsTop: string; controlsHeight: string }>`
  position: absolute;
  top: ${({ controlsTop }) => controlsTop};
  ${({ isNext }) => (isNext ? "right" : "left")}: -${theme.spacing.xsmall};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ isNext }) => (isNext ? "flex-end" : "flex-start")};
  width: ${PAGING_AREA_WIDTH}px;
  height: ${({ controlsHeight }) => controlsHeight};
  padding: ${theme.spacing.none} ${theme.spacing.xsmall};
  border: none;
  background: linear-gradient(
    to ${({ isNext }) => (isNext ? "left" : "right")},
    ${theme.colors.background.page} 0%,
    transparent 100%
  );
  color: ${theme.colors.text.primary};
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;

  svg {
    width: ${theme.spacing.large};
    height: ${theme.spacing.large};
    transform: ${({ isNext }) => (isNext ? "rotate(180deg)" : "none")};
    filter: drop-shadow(0 2px 4px ${theme.colors.background.heavyOverlay});
  }

  &:focus-visible[data-available="true"] {
    opacity: 1;
    pointer-events: auto;
  }

  @media (hover: none) {
    display: none;
  }
`;

// The negative margin cancels the inline padding, which only exists so hover effects aren't clipped by the scroll
export const PagedRowTrack = styled.div<{ gap: string; paddingBlock: string }>`
  display: flex;
  gap: ${({ gap }) => gap};
  overflow-x: auto;
  padding: ${({ paddingBlock }) => paddingBlock} ${theme.spacing.xsmall};
  margin: ${theme.spacing.none} -${theme.spacing.xsmall};
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${theme.spacing.xsmall};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
  }

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
`;
