import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";


export const HeaderOptionWrapper = styled.button`
  position: relative;
  background-color: transparent;
  color: ${theme.colors.text.primary};
  cursor: pointer;
`;

export const OptionsList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 87.5%;
  width: ${theme.spacing[100]};
  left: -${theme.spacing.micro};
  background-color: ${theme.colors.neutral.gray100};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.none};
  min-width: 100%;
  z-index: 3;
  overflow: hidden;
`;

export const OptionItem = styled.a`
  width: 100%;
  padding: ${theme.spacing.micro} ${theme.spacing.xsmall};
  background-color: transparent;
  border: none;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.dark};
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.neutral.gray300};
  }
`;
