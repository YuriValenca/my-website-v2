import { type ReactNode, useEffect, useState } from "react";
import { ModalContainer, ModalOverlay, ModalContent, ModalTitle } from "./style";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "center" | "left" | "right" | "bottom" | "top";
  width?: string;
}

const Modal = ({
  isVisible,
  onClose,
  title,
  children,
  position = "center",
  width = "30%",
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(isVisible);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (!isVisible) {
      handleClose();
    } else {
      setIsMounted(true);
      setIsClosing(false);
    }
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <ModalOverlay isClosing={isClosing} onClick={handleClose}>
      <ModalContainer
        position={position}
        isClosing={isClosing}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <ModalTitle>{title}</ModalTitle>}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
