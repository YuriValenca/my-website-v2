import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${theme.spacing.small};
`;

export const SectionTitle = styled.p`
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.xsm};
  text-transform: uppercase;
  color: ${theme.colors.text.placeholder};
  letter-spacing: ${theme.spacing.nano};
`;

export const SectionWrapper = styled.div`
  hr {
    margin: ${theme.spacing.xsmall} ${theme.spacing.none};
    color: ${theme.colors.border.default};
  }
`;
