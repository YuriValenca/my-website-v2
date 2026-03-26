import { StyledButton } from "./style";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  bg: string;
  textColor: string;
  onClick: () => void;
  isBold?: Boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  text,
  bg,
  textColor,
  onClick,
  isBold = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  return (
    <StyledButton
      data-bold={isBold}
      data-icon-position={iconPosition}
      onClick={onClick}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {icon && iconPosition === "left" && icon}
      {text}
      {icon && iconPosition === "right" && icon}
    </StyledButton>
  )
}

export default Button;
