import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Tag = styled.button`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.tooltip};
  text-transform: uppercase;
  background-color: transparent;
  padding: ${theme.spacing.micro};
  border: 1px solid ${theme.colors.border.default};
  color: ${theme.colors.text.placeholder};
  border-radius: ${theme.borderRadius.small};
  line-height: 1.25;
  letter-spacing: 2px;
  cursor: pointer;
  transition: opacity 0.25s ease-in-out;

  :hover {
    opacity: 0.7;
  }
`;
