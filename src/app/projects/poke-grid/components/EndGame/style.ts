import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";

export const EndGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const EndGameText = styled.p`
  font-family: "Lato", sans-serif;
  margin: ${theme.spacing.default} ${theme.spacing.none};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: auto;
  margin-top: ${theme.spacing.default};

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    flex-direction: column;
  }
`;
