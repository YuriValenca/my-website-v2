import { css } from "@emotion/react";

// Touch screens keep :hover applied after a tap, so hover effects only target devices with a real pointer
export const canHover = "@media (hover: hover)";
const canHoverWithMotion = "@media (hover: hover) and (prefers-reduced-motion: no-preference)";

export const HOVER_TRANSITION = "transform 0.3s ease, background-color 0.3s ease";

export const HOVER_SCALE = {
  subtle: 1.02,
  default: 1.05,
  strong: 1.1,
} as const;

// childSelector scales a child instead of the hovered element itself, e.g. "> :first-of-type"
export const hoverScale = (scale: number, childSelector = "") => css`
  ${canHoverWithMotion} {
    &:hover ${childSelector} {
      transform: scale(${scale});
    }
  }
`;
