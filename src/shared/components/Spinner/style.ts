import styled from "@emotion/styled";

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerSvg = styled.svg`
  .r1 {
    animation: cw 1.1s linear infinite;
    transform-origin: 340px 340px;
  }

  .r2 {
    animation: ccw 1.7s linear infinite;
    transform-origin: 340px 340px;
  }

  .r3 {
    animation: cw 2.6s linear infinite;
    transform-origin: 340px 340px;
  }

  .r4 {
    animation: ccw 3.8s linear infinite;
    transform-origin: 340px 340px;
  }

  .r5 {
    animation: cw 5.5s linear infinite;
    transform-origin: 340px 340px;
  }

  @keyframes cw {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes ccw {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
`;
