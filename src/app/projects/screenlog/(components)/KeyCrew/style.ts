import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { canHover, HOVER_SCALE, HOVER_TRANSITION, hoverScale } from "../../(helpers)/interactions";

export const KeyCrewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${theme.spacing.xsmall};
`;

export const KeyCrewCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  min-width: 0;
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  background-color: ${theme.colors.background.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.small};
  text-decoration: none;
  transition: ${HOVER_TRANSITION};

  ${canHover} {
    &:hover {
      background-color: ${theme.colors.background.surfaceHover};
    }
  }

  ${hoverScale(HOVER_SCALE.subtle)};
`;

export const KeyCrewInfo = styled.div`
  min-width: 0;
`;

export const KeyCrewName = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
`;

export const KeyCrewRoles = styled.p`
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.placeholder};
`;
