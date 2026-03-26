import { Press_Start_2P, Noto_Sans } from "next/font/google";

const pressStartFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansFont = Noto_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export const theme = {
  colors: {
    background: {
      page: "#101833",
      surface: "#1a2444",
      surfaceHover: "#243058",
      overlay: "rgba(0, 0, 0, 0.6)",
    },
    border: {
      default: "#2e3f6e",
      input: "#3a4f7a",
      error: "#e53935",
      focus: "#5c7ec7",
    },
    text: {
      primary: "#e8eaf6",
      secondary: "#8892b0",
      dark: "#1d1d1d",
      placeholder: "#5a6a8a",
      error: "#e53935",
    },
    feedback: {
      correct: "#4caf7d",
      wrong: "#e05c5c",
    },
    accent: {
      yellow: "#f6c90e",
      red: "#CC2C21",
    },
    neutral: {
      white: "#ffffff",
      gray100: "#ebebeb",
      gray200: "#d4d4d4",
      gray400: "#787878",
      gray600: "#515151",
      black: "#000000",
    },
  },
  spacing: {
    none: "0",
    nano: "2px",
    micro: "4px",
    xsmall: "8px",
    small: "12px",
    default: "16px",
    medium: "24px",
    large: "32px",
    xlarge: "36px",
    xxlarge: "40px",
    xxxlarge: "48px",
    huge: "56px",
    enormous: "64px",
    100: "100px",
    HUEG: "256px",
  },
  borderRadius: {
    none: "0",
    small: "4px",
    medium: "8px",
    circle: "50%",
  },
  fontFamily: {
    ps2p: pressStartFont.style.fontFamily,
    noto: notoSansFont.style.fontFamily,
  },
  fontSize: {
    tooltip: "10px",
    sm: "12px",
    md: "14px",
    normal: "16px",
    h5: "20px",
    h4: "24px",
    h3: "28px",
    h2: "32px",
    h1: "36px",
  },
  breakpoints: {
    xs: "360px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
  }
} as const;
