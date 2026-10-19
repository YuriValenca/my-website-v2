import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/shared/theme/theme";
import { HOVER_TRANSITION } from "../../(helpers)/interactions";

interface AvatarProps {
  diameter: number;
}

const avatarBase = ({ diameter }: AvatarProps) => css`
  width: ${diameter}px;
  height: ${diameter}px;
  flex-shrink: 0;
  border-radius: ${theme.borderRadius.circle};
  border: 1px solid ${theme.colors.border.default};
  background-color: ${theme.colors.background.surface};
  transition: ${HOVER_TRANSITION};
`;

export const AvatarImage = styled.img<AvatarProps>`
  ${avatarBase};
  object-fit: cover;
`;

export const AvatarInitials = styled.div<AvatarProps>`
  ${avatarBase};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ diameter }) => (diameter > 40 ? theme.fontSize.md : theme.fontSize.tooltip)};
  font-weight: 500;
  color: ${theme.colors.text.secondary};
`;
