import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme";
import { contentGutter } from "../../(helpers)/contentGutter";

export const ScreenlogWrapper = styled.div`
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.enormous};
  ${contentGutter};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxlarge};
`;
