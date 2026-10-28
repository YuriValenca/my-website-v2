import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.xsmall};
`;

export const StatCard = styled.div`
  min-width: 0;
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  background-color: ${theme.colors.background.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.small};
`;

export const StatLabel = styled.p`
  font-size: ${theme.fontSize.xsm};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.text.placeholder};
`;

export const StatValue = styled.p`
  margin-top: ${theme.spacing.nano};
  font-size: ${theme.fontSize.normal};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const StatSub = styled.p`
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.secondary};
`;
