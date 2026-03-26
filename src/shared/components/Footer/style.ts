import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 48px;
  background-color: ${theme.colors.background.surface};
  border-top: 1px solid ${theme.colors.border.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.large};
  padding: 0 ${theme.spacing.medium};
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xsmall};
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }

  svg {
    width: ${theme.spacing.medium};
    height: ${theme.spacing.medium};
    flex-shrink: 0;
  }
`;

export const Divider = styled.span`
  width: 1px;
  height: ${theme.spacing.medium};
  background-color: ${theme.colors.border.default};
`;
