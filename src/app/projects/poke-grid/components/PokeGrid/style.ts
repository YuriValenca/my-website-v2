import { theme } from "@/shared/theme/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const borderRadiusGrid = (
  topLeft: number,
  topRight: number,
  bottomLeft: number,
  bottomRight: number
) => css`
  > *:nth-of-type(${topLeft}) { border-top-left-radius: ${theme.borderRadius.medium}; }
  > *:nth-of-type(${topRight}) { border-top-right-radius: ${theme.borderRadius.medium}; }
  > *:nth-of-type(${bottomLeft}) { border-bottom-left-radius: ${theme.borderRadius.medium}; }
  > *:nth-of-type(${bottomRight}) { border-bottom-right-radius: ${theme.borderRadius.medium}; }
`;

export const PokeGridContainer = styled.div`
  background-color: ${theme.colors.background.page};
  height: calc(100dvh - (${theme.spacing.xxxlarge} + ${theme.spacing.huge}));
  width: 100dvw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-size: ${theme.fontSize.h3};
  color: ${theme.colors.text.primary};
  font-family: ${theme.fontFamily.ps2p};
  text-align: center;
`;

export const PokeGridContent = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, 128px);
  grid-template-rows: repeat(4, 128px);
  gap: ${theme.spacing.nano};
  margin-bottom: ${theme.spacing.medium};

  ${borderRadiusGrid(3, 5, 11, 13)}

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, ${theme.spacing[100]});
    grid-template-rows: repeat(4, ${theme.spacing[100]});

    ${borderRadiusGrid(2, 4, 8, 10)}
    > *:nth-of-type(3) { border-top-left-radius: ${theme.borderRadius.none}; }
    > *:nth-of-type(5) { border-top-right-radius: ${theme.borderRadius.none}; }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(4, 80px);
    grid-template-rows: repeat(4, 80px);
  }

  @media (max-width: ${theme.breakpoints.xs}) {
    grid-template-columns: repeat(4, 72px);
    grid-template-rows: repeat(4, 72px);
  }
`;

export const ScoreWrapper = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.text.primary};
  margin-bottom: ${({ mobile }) => mobile ? theme.spacing.default : theme.spacing.none};
`;
