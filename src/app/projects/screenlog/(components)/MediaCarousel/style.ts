import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { canHover, HOVER_SCALE, HOVER_TRANSITION, hoverScale } from "../../(helpers)/interactions";
import { MEDIA_CARD_WIDTH } from "../MediaCard/style";

export const SeeAllCard = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${MEDIA_CARD_WIDTH}px;
  text-decoration: none;

  ${hoverScale(HOVER_SCALE.default, "> :first-of-type")};
`;

export const SeeAllFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 3;
  border: 2px dashed ${theme.colors.border.input};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.text.secondary};
  transition: ${HOVER_TRANSITION}, color 0.3s ease, border-color 0.3s ease;

  svg {
    width: ${theme.spacing.huge};
    height: ${theme.spacing.huge};
  }

  ${canHover} {
    a:hover > & {
      color: ${theme.colors.accent.blue};
      border-color: ${theme.colors.accent.blue};
    }
  }
`;

export const SeeAllLabel = styled.p`
  margin-top: ${theme.spacing.xsmall};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.primary};
`;
