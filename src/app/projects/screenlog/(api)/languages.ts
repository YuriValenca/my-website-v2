import { tmdbFetch } from "./tmdbClient";

export interface Language {
  iso_639_1: string;
  english_name: string;
}

export const getLanguages = async () => {
  const languages = await tmdbFetch<Language[]>("/configuration/languages");
  return [...languages].sort((a, b) => a.english_name.localeCompare(b.english_name));
};
