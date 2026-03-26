import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 56px;
  background-color: ${theme.colors.background.surface};
  border-bottom: 1px solid ${theme.colors.border.default};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 ${theme.spacing.medium};
`;

export const ProjectInfo = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  min-width: 0;
`;

export const ProjectName = styled.h5`
  font-size: ${theme.fontSize.h5};
  color: ${theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;
