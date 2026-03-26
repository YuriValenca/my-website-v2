import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

interface ErrorTypes {
  error?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.xsmall};
`;

export const InputContainer = styled.div<ErrorTypes>`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.neutral.gray100};
  border: 2px solid ${({ error }) => error ? theme.colors.border.error : theme.colors.border.input};
  border-radius: ${theme.borderRadius.medium};
  width: 100%;
  height: ${theme.spacing.xlarge};
  padding: ${theme.spacing.none} ${theme.spacing.default};
  gap: ${theme.spacing.xsmall};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ error }) => error ? theme.colors.border.error : theme.colors.border.focus};
    box-shadow: 0 0 0 3px ${({ error }) => error ? "rgba(229, 57, 53, 0.12)" : "rgba(92, 126, 199, 0.12)"};
  }
`;

export const InputField = styled.input`
  border: none;
  flex: 1;
  font-size: ${theme.fontSize.normal};
  color: ${theme.colors.text.dark};
  background: transparent;
  outline: none;
  line-height: 1;

  &::placeholder {
    color: ${theme.colors.text.placeholder};
  }
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  margin: ${theme.spacing.none};
  padding-left: ${theme.spacing.nano};
  gap: ${theme.spacing.micro};
`;
