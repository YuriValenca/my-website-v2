import { StyledButton } from "./style";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "solid" | "outline";
  bg?: string;
  textColor?: string;
  isBold?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  text,
  onClick,
  variant = "solid",
  bg,
  textColor,
  isBold = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  return (
    <StyledButton
      data-variant={variant}
      data-bold={isBold}
      data-icon-position={iconPosition}
      onClick={onClick}
      style={variant === "solid" ? { backgroundColor: bg, color: textColor } : undefined}
    >
      {icon && iconPosition === "left" && icon}
      {text}
      {icon && iconPosition === "right" && icon}
    </StyledButton>
  )
}

export default Button;
