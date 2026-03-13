import { StyledButton } from "./style";

interface ButtonProps {
  text: string;
  bg: string;
  textColor: string;
  onClick: () => void;
  isBold?: Boolean;
}

const Button = ({
  text,
  bg,
  textColor,
  onClick,
  isBold = false,
}: ButtonProps) => {
  return (
    <StyledButton
      data-bold={isBold}
      onClick={onClick}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {text}
    </StyledButton>
  )
}

export default Button;
