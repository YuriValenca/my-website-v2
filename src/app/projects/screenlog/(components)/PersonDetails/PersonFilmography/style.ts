import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/shared/theme/theme";
import { canHover, HOVER_TRANSITION } from "../../../(helpers)/interactions";

export const FilmographyControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xsmall};
`;

export const CreditRows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CompactRow = styled(Link)`
  display: grid;
  grid-template-columns: ${theme.spacing.enormous} minmax(0, 1fr) auto;
  align-items: baseline;
  gap: ${theme.spacing.default};
  padding: ${theme.spacing.small} ${theme.spacing.xsmall};
  border-bottom: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.small};
  text-decoration: none;
  transition: ${HOVER_TRANSITION};

  ${canHover} {
    &:hover {
      background-color: ${theme.colors.background.surface};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: ${theme.spacing.xlarge} minmax(0, 1fr) auto;
    gap: ${theme.spacing.small};
    padding-inline: ${theme.spacing.none};
  }
`;

export const CompactYear = styled.span`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
`;

export const CompactHeading = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${theme.spacing.micro} ${theme.spacing.xsmall};
  min-width: 0;
`;

export const CompactTitle = styled.span`
  font-size: ${theme.fontSize.normal};
  color: ${theme.colors.text.primary};
`;

export const CompactRole = styled.span`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
`;

export const CompactType = styled.span`
  font-size: ${theme.fontSize.xsm};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.text.secondary};
`;

export const EmptyMessage = styled.p`
  padding-block: ${theme.spacing.medium};
  font-size: ${theme.fontSize.normal};
  color: ${theme.colors.text.secondary};
`;
