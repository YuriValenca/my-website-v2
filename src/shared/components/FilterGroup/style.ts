import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const FilterGroupWrapper = styled.section`
  border-bottom: 1px solid ${theme.colors.border.default};
`;

export const FilterGroupHeader = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.spacing.small} ${theme.spacing.none};
  border: none;
  background: none;
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.xsm};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.text.secondary};
  cursor: pointer;

  svg {
    width: ${theme.spacing.small};
    height: ${theme.spacing.small};
    transform: rotate(${({ isOpen }) => (isOpen ? "90deg" : "-90deg")});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const FilterGroupContent = styled.div`
  padding-bottom: ${theme.spacing.default};
`;
