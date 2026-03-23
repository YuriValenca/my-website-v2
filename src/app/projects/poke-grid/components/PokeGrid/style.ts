import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const PokeGridContainer = styled.div`
  background-color: #101833;
  height: calc(100dvh - ${theme.spacing.xxlarge});
  width: 100dvw;
  margin-top: ${theme.spacing.xxlarge};
  padding-bottom: ${theme.spacing.xxxlarge};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h3`
  font-size: ${theme.fontSize.h3};
  margin-bottom: ${theme.spacing.default};
`;

export const PokeGridContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  gap: ${theme.spacing.nano};
  justify-items: center;
  align-items: center;
`;
