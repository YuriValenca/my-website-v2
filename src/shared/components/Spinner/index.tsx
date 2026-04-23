import { SpinnerSvg, SpinnerWrapper } from "./style";


interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 360 }: SpinnerProps) => {
  return (
    <SpinnerWrapper>
      <SpinnerSvg
        width={size}
        height={size}
        viewBox="0 0 680 680"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8eaf6" />
            <stop offset="100%" stopColor="#5c7ec7" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c7ec7" />
            <stop offset="100%" stopColor="#3a4f7a" />
          </linearGradient>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a4f7a" />
            <stop offset="100%" stopColor="#2e3f6e" />
          </linearGradient>
          <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e3f6e" />
            <stop offset="100%" stopColor="#1a2444" />
          </linearGradient>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8892b0" />
            <stop offset="100%" stopColor="#2e3f6e" />
          </linearGradient>
        </defs>

        <g className="r1">
          <circle
            cx="340" cy="340" r="30"
            fill="none"
            stroke="url(#g1)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="120 69"
          />
        </g>

        <g className="r2">
          <circle
            cx="340" cy="340" r="36"
            fill="none"
            stroke="url(#g5)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="90 136"
          />
        </g>

        <g className="r3">
          <circle
            cx="340" cy="340" r="42"
            fill="none"
            stroke="url(#g2)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="150 114"
          />
        </g>

        <g className="r4">
          <circle
            cx="340" cy="340" r="48"
            fill="none"
            stroke="url(#g3)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100 202"
          />
        </g>

        <g className="r5">
          <circle
            cx="340" cy="340" r="54"
            fill="none"
            stroke="url(#g4)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="200 139"
          />
        </g>
      </SpinnerSvg>
    </SpinnerWrapper>
  );
};

export default Spinner;
