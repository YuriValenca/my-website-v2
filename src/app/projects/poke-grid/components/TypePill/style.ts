import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";
import NextImage from "next/image";

export const PillImage = styled(NextImage)`
  width: ${theme.spacing[100]};
  display: block;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 80px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: ${theme.spacing.enormous};
  }
`;
