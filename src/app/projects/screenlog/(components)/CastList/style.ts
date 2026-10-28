import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { canHover, HOVER_SCALE, HOVER_TRANSITION, hoverScale } from "../../(helpers)/interactions";

// The negative margin cancels the inline padding, which only exists so the hover background isn't clipped by the scroll
export const CastListWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.micro};
  overflow-x: auto;
  padding: ${theme.spacing.micro} ${theme.spacing.xsmall} ${theme.spacing.xsmall};
  margin: ${theme.spacing.none} -${theme.spacing.xsmall};
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.border.default} transparent;
`;

export const CastMemberItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.micro};
  flex-shrink: 0;
  width: 96px;
  padding: ${theme.spacing.xsmall} ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  text-decoration: none;
  transition: ${HOVER_TRANSITION};

  ${canHover} {
    &:hover {
      background-color: ${theme.colors.background.surface};
    }
  }

  ${hoverScale(HOVER_SCALE.strong, "> :first-of-type")};
`;

export const CastMemberName = styled.p`
  margin-top: ${theme.spacing.micro};
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.primary};
  line-height: 1.3;
`;

export const CastMemberCharacter = styled.p`
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.placeholder};
  line-height: 1.3;
`;
