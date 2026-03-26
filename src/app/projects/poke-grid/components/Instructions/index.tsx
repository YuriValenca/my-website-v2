import Button from "@/shared/components/Button";
import { theme } from "@/shared/theme/theme";
import { InstructionsButtonWrapper, InstructionsContainer, InstructionsList, ListItem } from "./style"

interface InstructionsProps {
  onButtonClick: () => void;
}

const Instructions = ({
  onButtonClick
}: InstructionsProps) => {
  return (
    <InstructionsContainer>
      <InstructionsList>
        <ListItem>
          → The goal is to fill all 9 with the correct pokemon, according to the types on the left and top.
        </ListItem>
        <ListItem>
          → Click on the grid, and type the name of the pokemon you think is correct.
        </ListItem>
        <ListItem>
          → If you select a pokemon on a grid, you can change it up by clicking on it again.
        </ListItem>
        <ListItem>
          → The game will end ONLY when all 9 cells are correct. Until then, you can select and change the pokemon as many times as you want.
        </ListItem>
      </InstructionsList>
      <InstructionsButtonWrapper>
        <Button
          bg={theme.colors.accent.red}
          onClick={onButtonClick}
          text="Got it!"
          textColor={theme.colors.text.primary}
        />
      </InstructionsButtonWrapper>
    </InstructionsContainer>
  )
}

export default Instructions;
