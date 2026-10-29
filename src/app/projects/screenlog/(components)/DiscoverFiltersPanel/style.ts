import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/shared/theme/theme";

const fieldBase = css`
  width: 100%;
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  border: 1px solid ${theme.colors.border.input};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.background.page};
  font-family: ${theme.fontFamily.noto};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.primary};
  color-scheme: dark;

  &:focus {
    outline: none;
    border-color: ${theme.colors.border.focus};
  }
`;

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterSelect = styled.select`
  ${fieldBase};
  cursor: pointer;
`;

export const DateFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xsmall};
`;

export const DateLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.micro};
  font-size: ${theme.fontSize.xsm};
  color: ${theme.colors.text.secondary};
`;

export const DateInput = styled.input`
  ${fieldBase};
  padding-inline: ${theme.spacing.xsmall};
  font-size: ${theme.fontSize.sm};
`;

export const PanelActions = styled.div`
  display: flex;
  gap: ${theme.spacing.xsmall};
  padding-top: ${theme.spacing.default};

  > button {
    flex: 1;
    justify-content: center;
  }
`;
