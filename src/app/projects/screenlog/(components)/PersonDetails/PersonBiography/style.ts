import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

const COLLAPSED_LINES = 4;

export const BiographyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing.xsmall};
  max-width: 70ch;
`;

export const BiographyText = styled.p<{ isExpanded: boolean }>`
  font-size: ${theme.fontSize.normal};
  line-height: 1.6;
  white-space: pre-line;
  color: ${theme.colors.text.secondary};

  ${({ isExpanded }) => !isExpanded && `
    display: -webkit-box;
    -webkit-line-clamp: ${COLLAPSED_LINES};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const ReadMoreButton = styled.button`
  padding: ${theme.spacing.none};
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.accent.blue};
  cursor: pointer;
`;
