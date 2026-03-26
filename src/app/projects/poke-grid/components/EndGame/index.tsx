import Button from "@/shared/components/Button";
import { ButtonsContainer, EndGameContainer, EndGameText } from "./style"

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
          bg="#F2CB07"
          textColor="#1d1d1d"
          text="New game"
          onClick={onNewGameClick}
        />
        <EndGameText>or</EndGameText>
        <Button
          bg="#F2CB07"
          textColor="#1d1d1d"
          text="See board"
          onClick={seeBoardClick}
        />
      </ButtonsContainer>
    </EndGameContainer>
  );
};

export default EndGameContent;
