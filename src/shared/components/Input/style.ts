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
  background-color: #ffffff;
  border: 2px solid ${({ error }: ErrorTypes) => (error ? "#e53935" : "#d0d0d0")};
  border-radius: ${theme.borderRadius.medium};
  width: 100%;
  height: ${theme.spacing.xlarge};
  padding: ${theme.spacing.none} ${theme.spacing.default};
  gap: ${theme.spacing.xsmall};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ error }: ErrorTypes) => (error ? "#e53935" : "#1976d2")};
    box-shadow: 0 0 0 3px
      ${({ error }: ErrorTypes) =>
        error ? "rgba(229, 57, 53, 0.12)" : "rgba(25, 118, 210, 0.12)"};
  }
`;

// export const InputLogo = styled.img`
//   height: 18px;
//   flex-shrink: 0;
//   opacity: 0.5;
// `;

export const InputField = styled.input`
  border: none;
  flex: 1;
  font-size: ${theme.fontSize.normal};
  color: #1a1a1a;
  background: transparent;
  outline: none;
  line-height: 1;

  &::placeholder {
    color: #aaa;
  }
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: #e53935;
  margin: ${theme.spacing.none};
  padding-left: ${theme.spacing.nano};
  gap: ${theme.spacing.micro};

  /* &::before {
    content: "⚠";
    font-size: 11px;
  } */
`;
