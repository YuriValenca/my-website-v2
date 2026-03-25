import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { theme } from "@/shared/theme/theme";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideInCenter = keyframes`
  from { transform: translate(-50%, -48%) scale(0.96); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`;

const slideOutCenter = keyframes`
  from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  to { transform: translate(-50%, -48%) scale(0.96); opacity: 0; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOutRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOutLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const slideInBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideOutBottom = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

const slideInTop = keyframes`
  from { transform: translateX(-50%) scale(0.96); opacity: 0; }
  to { transform: translateX(-50%) scale(1); opacity: 1; }
`;

const slideOutTop = keyframes`
  from { transform: translateX(-50%) scale(1); opacity: 1; }
  to { transform: translateX(-50%) scale(0.96); opacity: 0; }
`;

const getContainerAnimation = (position: string, isClosing: boolean) => {
  if (position === "right") return isClosing ? slideOutRight : slideInRight;
  if (position === "left") return isClosing ? slideOutLeft : slideInLeft;
  if (position === "bottom") return isClosing ? slideOutBottom : slideInBottom;
  if (position === "top") return isClosing ? slideOutTop : slideInTop;
  return isClosing ? slideOutCenter : slideInCenter;
};

export const ModalOverlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  animation: ${({ isClosing }) => isClosing ? fadeOut : fadeIn} 0.3s ease forwards;
  cursor: default;
`;

export const ModalContainer = styled.div<{ position: string; isClosing: boolean }>`
  position: fixed;
  background: #1e1e2e;
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.medium};
  z-index: 101;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${({ position, isClosing }) => getContainerAnimation(position, isClosing)} 0.3s ease forwards;

  ${({ position }) => position === "center" && `
    top: 50%;
    left: 50%;
  `}

  ${({ position }) => position === "right" && `
    top: 0;
    right: 0;
    height: 100%;
    border-radius: 8px 0 0 8px;
  `}

  ${({ position }) => position === "left" && `
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 0 8px 8px 0;
  `}

  ${({ position }) => position === "bottom" && `
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 8px 8px 0 0;
  `}

  ${({ position }) => position === "top" && `
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
  `}
`;

export const ModalTitle = styled.h4`
  font-size: ${theme.fontSize.h4};
  text-align: center;
`;

export const ModalContent = styled.div`
  margin-top: ${theme.spacing.xsmall};
`;
