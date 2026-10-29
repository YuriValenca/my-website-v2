import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/shared/theme/theme";

const THUMB_SIZE = "16px";

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xsmall};
`;

export const SliderValues = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
`;

export const SliderTrack = styled.div`
  position: relative;
  height: ${THUMB_SIZE};
`;

export const SliderRail = styled.div<{ fromPercent: number; toPercent: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: ${theme.borderRadius.small};
  transform: translateY(-50%);
  background: linear-gradient(
    to right,
    ${theme.colors.border.default} ${({ fromPercent }) => fromPercent}%,
    ${theme.colors.accent.blue} ${({ fromPercent }) => fromPercent}%,
    ${theme.colors.accent.blue} ${({ toPercent }) => toPercent}%,
    ${theme.colors.border.default} ${({ toPercent }) => toPercent}%
  );
`;

const thumb = css`
  width: ${THUMB_SIZE};
  height: ${THUMB_SIZE};
  border: 2px solid ${theme.colors.accent.blue};
  border-radius: ${theme.borderRadius.circle};
  background-color: ${theme.colors.background.page};
  cursor: pointer;
  pointer-events: auto;
`;

// Both inputs share the same track, so only their thumbs may catch the pointer
export const SliderInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  margin: 0;
  background: none;
  pointer-events: none;
  appearance: none;

  &::-webkit-slider-thumb {
    ${thumb};
    appearance: none;
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &:focus-visible::-webkit-slider-thumb {
    outline: 2px solid ${theme.colors.border.focus};
    outline-offset: 2px;
  }
`;
