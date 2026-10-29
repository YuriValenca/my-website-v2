import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xsmall};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.default};
`;

export const SectionTitle = styled.h2`
  font-family: ${theme.fontFamily.playfair};
  font-size: ${theme.fontSize.h3};
  font-weight: normal;
  color: ${theme.colors.text.primary};
`;

export const SectionBadge = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  padding: ${theme.spacing.micro} ${theme.spacing.xsmall};
  border: 1px solid ${({ color }) => color};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSize.sm};
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ color }) => color};

  svg {
    width: ${theme.spacing.default};
    height: ${theme.spacing.default};
  }
`;
