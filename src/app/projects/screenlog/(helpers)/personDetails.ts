import { formatDate } from "@/shared/utils/stringUtils";
import { CastCredit, CrewCredit, MediaCredit, PersonProfile } from "../(types)/people";
import { buildStat, DetailStat, isStat, KEY_JOBS, MediaCardData, toMovieCard, toTvShowCard } from "./mediaDetails";

interface CreditEntry {
  credit: MediaCredit;
  role: string;
  department: string;
}

export interface PersonCredit extends MediaCardData {
  mediaType: MediaCredit["media_type"];
  posterLabel: string;
  roles: string[];
  departments: string[];
}

const ACTING_DEPARTMENT = "Acting";
const CREATIVE_DEPARTMENTS = ["Directing", "Writing", "Production"];
const TRIBUTE_JOBS = ["Thanks", "In Memory Of"];
const SELF_APPEARANCE = /^(self|himself|herself)\b/i;
const KNOWN_FOR_LIMIT = 15;

const MONTH = "(?:January|February|March|April|May|June|July|August|September|October|November|December)";
const DATE = `(?:${MONTH} \\d{1,2},? \\d{4}|\\d{1,2} ${MONTH} \\d{4})`;
const LIFE_DATES = new RegExp(`(?:^|[;,]\\s*|\\s+on\\s+)(?:born\\s+)?${DATE}(?:\\s*[–—-]\\s*${DATE})?$`);
const FIRST_PARENTHETICAL = /\s*\(([^)]*)\)/;

const ROLE_LABELS: Record<string, string> = {
  Acting: "Actor",
  Directing: "Director",
  Writing: "Writer",
  Production: "Producer",
};

const MEDIA_TYPE_LABELS = {
  movie: "Movie",
  tv: "TV",
};

export const getRoleLabel = (department: string) => ROLE_LABELS[department] ?? department;

// Compares ISO dates as text: "MM-DD" before the birthday's means it hasn't happened that year
const getAge = (birthday: string, deathday: string | null) => {
  const endDate = deathday ?? new Date().toISOString().slice(0, 10);
  const age = Number(endDate.slice(0, 4)) - Number(birthday.slice(0, 4));
  return endDate.slice(5) < birthday.slice(5) ? age - 1 : age;
};

export const getLifeSummary = ({ birthday, deathday, place_of_birth }: PersonProfile) => {
  const age = birthday ? ` (age ${getAge(birthday, deathday)})` : "";
  const born = birthday && `Born ${formatDate(birthday, "long")}${deathday ? "" : age}`;
  const died = deathday && `Died ${formatDate(deathday, "long")}${age}`;

  return [born, died, place_of_birth].filter(Boolean).join(" · ");
};

// Bios usually open with "Name (born May 25, 1976)", which repeats the life summary. Anything else in the
// parenthesis stays, as in "(/ˈɡɒslɪŋ/; born November 12, 1980)", and a bio with no match is left untouched
export const getBiographyText = ({ biography, birthday }: PersonProfile) => {
  if (!birthday) return biography;

  return biography.replace(FIRST_PARENTHETICAL, (parenthetical, content: string) => {
    const remaining = content.replace(LIFE_DATES, "");
    if (remaining === content) return parenthetical;
    return remaining && ` (${remaining})`;
  });
};

const toCard = (credit: MediaCredit) =>
  credit.media_type === "tv" ? toTvShowCard(credit) : toMovieCard(credit);

// Each role is its own entry, so the same title comes repeated once per role
const mergeByTitle = (entries: CreditEntry[]) => {
  const titles = new Map<string, PersonCredit>();

  entries.forEach(({ credit, role, department }) => {
    const card = toCard(credit);
    const title = titles.get(card.href) ?? {
      ...card,
      mediaType: credit.media_type,
      posterLabel: MEDIA_TYPE_LABELS[credit.media_type],
      roles: [],
      departments: [],
    };

    if (role && !title.roles.includes(role)) title.roles.push(role);
    if (!title.departments.includes(department)) title.departments.push(department);
    titles.set(card.href, title);
  });

  return [...titles.values()];
};

// Falls back to everything so that, e.g., a TV host with only "Self" credits doesn't end up with an empty page
const preferMatching = <T>(items: T[], isMatch: (item: T) => boolean) => {
  const matches = items.filter(isMatch);
  return matches.length > 0 ? matches : items;
};

const isActingRole = ({ character }: CastCredit) => !!character && !SELF_APPEARANCE.test(character);

const getJobRank = ({ job }: CrewCredit) => {
  const rank = KEY_JOBS.indexOf(job);
  return rank === -1 ? KEY_JOBS.length : rank;
};

const getActingCredits = (cast: CastCredit[]) =>
  mergeByTitle(preferMatching(cast, isActingRole).map((credit) => ({
    credit,
    role: credit.character,
    department: ACTING_DEPARTMENT,
  })));

const getCrewEntries = (crew: CrewCredit[]): CreditEntry[] =>
  crew
    .filter(({ job }) => !TRIBUTE_JOBS.includes(job))
    .sort((a, b) => getJobRank(a) - getJobRank(b))
    .map((credit) => ({ credit, role: credit.job, department: credit.department }));

const getFilmography = (department: string, { cast, crew }: PersonProfile["combined_credits"]) => {
  const actingCredits = department === ACTING_DEPARTMENT ? preferMatching(cast, isActingRole) : cast.filter(isActingRole);
  const actingEntries = actingCredits.map((credit) => ({
    credit,
    role: credit.character && `as ${credit.character}`,
    department: ACTING_DEPARTMENT,
  }));

  return mergeByTitle([...actingEntries, ...getCrewEntries(crew)])
    .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));
};

export const getCreditDepartments = (credits: PersonCredit[], mainDepartment: string) => {
  const titleCounts = new Map<string, number>();

  credits.flatMap(({ departments }) => departments).forEach((department) => {
    titleCounts.set(department, (titleCounts.get(department) ?? 0) + 1);
  });

  return [...titleCounts.keys()].sort((a, b) =>
    Number(b === mainDepartment) - Number(a === mainDepartment) || titleCounts.get(b)! - titleCounts.get(a)!);
};

const countByMediaType = (credits: PersonCredit[], mediaType: PersonCredit["mediaType"]) =>
  String(credits.filter((credit) => credit.mediaType === mediaType).length);

const getEarliestDate = (credits: PersonCredit[]) =>
  credits.map(({ releaseDate }) => releaseDate).filter(Boolean).sort()[0];

const getCareerStats = (credits: PersonCredit[]): DetailStat[] => [
  buildStat("Movies", countByMediaType(credits, "movie")),
  buildStat("TV shows", countByMediaType(credits, "tv")),
  buildStat("Active since", formatDate(getEarliestDate(credits), "yearOnly")),
].filter(isStat);

const getCreativeStats = (credits: PersonCredit[]): DetailStat[] => [
  { label: "Directed", value: String(credits.filter(({ roles }) => roles.includes("Director")).length) },
  { label: "Written", value: String(credits.filter(({ departments }) => departments.includes("Writing")).length) },
  { label: "Produced", value: String(credits.filter(({ roles }) => roles.some((role) => role.includes("Producer"))).length) },
];

// Sorted by votes: popularity follows current buzz, which ranks talk shows and theme-song credits above a person's main work
const getKnownFor = (credits: PersonCredit[]): MediaCardData[] =>
  [...credits]
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, KNOWN_FOR_LIMIT)
    .map((credit) => ({ ...credit, caption: credit.roles.join(", ") }));

export const getPersonSections = ({ known_for_department: department, combined_credits }: PersonProfile) => {
  const filmography = getFilmography(department, combined_credits);

  if (department === ACTING_DEPARTMENT) {
    const credits = getActingCredits(combined_credits.cast);
    return { stats: getCareerStats(credits), knownFor: getKnownFor(credits), filmography };
  }

  const credits = mergeByTitle(getCrewEntries(combined_credits.crew));
  const mainCredits = preferMatching(credits, ({ departments }) => departments.includes(department));

  return {
    stats: CREATIVE_DEPARTMENTS.includes(department) ? getCreativeStats(credits) : getCareerStats(mainCredits),
    knownFor: getKnownFor(mainCredits),
    filmography,
  };
};
