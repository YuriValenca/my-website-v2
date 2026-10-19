import { theme } from "@/shared/theme/theme";

export const getRatingColor = (vote: number | undefined): string => {
  if (!vote) return theme.colors.feedback.badRating;
  if (vote >= 7) return theme.colors.feedback.goodRating;
  if (vote >= 5) return theme.colors.feedback.avgRating;
  if (vote >= 3) return theme.colors.feedback.badRating;
  return theme.colors.feedback.horribleRating;
};
