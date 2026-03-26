import Button from "@/shared/components/Button";
import { ButtonsContainer, EndGameContainer, EndGameText } from "./style"
import { theme } from "@/shared/theme/theme";

interface EndGameContentProps {
  onNewGameClick: () => void;
  seeBoardClick: () => void;
}

const EndGameContent = ({
  onNewGameClick,
  seeBoardClick,
}: EndGameContentProps) => {
  return (
    <EndGameContainer>
      <EndGameText>You can play a new game, or take a look at the board you filled.</EndGameText>
      <ButtonsContainer>
        <Button
          bg={theme.colors.accent.yellow}
          textColor={theme.colors.text.dark}
          text="New game"
          onClick={onNewGameClick}
        />
        <EndGameText>or</EndGameText>
        <Button
          bg={theme.colors.accent.yellow}
          textColor={theme.colors.text.dark}
          text="See board"
          onClick={seeBoardClick}
        />
      </ButtonsContainer>
    </EndGameContainer>
  );
};

export default EndGameContent;
