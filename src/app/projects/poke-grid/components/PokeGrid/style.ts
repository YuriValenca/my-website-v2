import { theme } from "@/shared/theme/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const borderRadiusGrid = (
  topLeft: number,
  topRight: number,
  bottomLeft: number,
  bottomRight: number
) => css`
  > *:nth-child(${topLeft}) { border-top-left-radius: ${theme.borderRadius.medium}; }
  > *:nth-child(${topRight}) { border-top-right-radius: ${theme.borderRadius.medium}; }
  > *:nth-child(${bottomLeft}) { border-bottom-left-radius: ${theme.borderRadius.medium}; }
  > *:nth-child(${bottomRight}) { border-bottom-right-radius: ${theme.borderRadius.medium}; }
`;

export const PokeGridContainer = styled.div`
  background-color: ${theme.colors.background.page};
  height: 100dvh;
  width: 100dvw;
  padding-bottom: ${theme.spacing[100]};

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

  ${borderRadiusGrid(7, 9, 17, 19)}

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, ${theme.spacing[100]});
    grid-template-rows: repeat(4, ${theme.spacing[100]});

    ${borderRadiusGrid(6, 8, 14, 16)}
    > *:nth-child(7) { border-top-left-radius: ${theme.borderRadius.none}; }
    > *:nth-child(9) { border-top-right-radius: ${theme.borderRadius.none}; }
    > *:nth-child(19) { border-bottom-right-radius: ${theme.borderRadius.none}; }
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
