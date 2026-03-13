import { type ReactNode, useEffect, useState } from "react";
import { ModalContainer, ModalOverlay, ModalContent } from "./style";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "center" | "left" | "right" | "bottom";
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

  useEffect(() => {
    if (!isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(true);
      setIsClosing(false);
    }
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <ModalOverlay isClosing={isClosing} onClick={() => !isVisible && onClose()}>
      <ModalContainer
        position={position}
        isClosing={isClosing}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2>{title}</h2>}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
