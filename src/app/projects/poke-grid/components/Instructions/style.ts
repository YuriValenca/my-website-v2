import { theme } from "@/shared/theme/theme";
import styled from "@emotion/styled";


export const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.h3`
  font-size: ${theme.fontSize.h3};
  margin-bottom: ${theme.spacing.small};
`;

export const InstructionsList = styled.ul`
  list-style: none;
  font-size: ${theme.fontSize.normal};
  padding: ${theme.spacing.none};
  margin: ${theme.spacing.none};
`;

export const ListItem = styled.li`
  margin-bottom: 12px;
`;

export const InstructionsButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: ${theme.spacing.medium};
`;