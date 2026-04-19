export const capitalizeString = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1)
};

const DATE_FORMATS: Record<string, Intl.DateTimeFormatOptions> = {
  default: { month: "2-digit", day: "2-digit", year: "numeric" },
  brazil: { month: "2-digit", day: "2-digit", year: "numeric" },
  yearOnly: { year: "numeric" },
  long: { month: "long", day: "numeric", year: "numeric" },
  monthYear: { month: "long", year: "numeric" },
};

export const formatDate = (date: string | undefined, format: keyof typeof DATE_FORMATS = "default", locale = "en-US") => {
  if (!date) return null;
  const options = DATE_FORMATS[format] ?? DATE_FORMATS.default;
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};
