import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const PokeGridContainer = styled.div`
  background-color: #101833;
  height: 100dvh;
  width: 100dvw;
  padding-bottom: ${theme.spacing[100]};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h3`
  font-size: ${theme.fontSize.h3};
`;

export const PokeGridContent = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, 128px);
  grid-template-rows: repeat(4, 128px);
  gap: ${theme.spacing.nano};
  margin-bottom: ${theme.spacing.medium};

  > *:nth-child(7) {
    border-top-left-radius: ${theme.borderRadius.medium};
  }

  > *:nth-child(9) {
    border-top-right-radius: ${theme.borderRadius.medium};
  }

  > *:nth-child(17) {
    border-bottom-left-radius: ${theme.borderRadius.medium};
  }

  > *:nth-child(19) {
    border-bottom-right-radius: ${theme.borderRadius.medium};
  }
`;

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
