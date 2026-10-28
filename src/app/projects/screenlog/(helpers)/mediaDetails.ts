import { formatCompactCurrency, formatDate } from "@/shared/utils/stringUtils";
import { CrewMember, Movie, MovieDetails, VideoList } from "../(types)/movies";
import { Creator, EpisodeSummary, TvShow, TvShowDetails } from "../(types)/tv-shows";
import { screenlogRoutes } from "./routes";

export interface DetailStat {
  label: string;
  value: string;
  sub?: string;
}

export interface KeyCrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  roles: string[];
}

export interface MediaCardData {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  vote: number;
  voteCount: number;
  overview: string;
  genreIds: number[];
  href: string;
}

const CERTIFICATION_REGION = "US";
const KEY_CREW_LIMIT = 6;
const KEY_JOBS = [
  "Director",
  "Screenplay",
  "Writer",
  "Original Music Composer",
  "Director of Photography",
  "Producer",
];

const buildStat = (label: string, value: string | null | undefined, sub?: string): DetailStat | null =>
  value ? { label, value, sub } : null;

const isStat = (stat: DetailStat | null): stat is DetailStat => stat !== null;

const getLanguageName = (code: string) => {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
};

const formatEpisode = ({ season_number, episode_number }: EpisodeSummary) =>
  `S${season_number} · E${episode_number}`;

const getEpisodeStat = ({ next_episode_to_air, last_episode_to_air }: TvShowDetails) => {
  if (next_episode_to_air) {
    return buildStat("Next episode", formatDate(next_episode_to_air.air_date, "long"), formatEpisode(next_episode_to_air));
  }
  if (last_episode_to_air) {
    return buildStat("Last aired", formatDate(last_episode_to_air.air_date, "long"), formatEpisode(last_episode_to_air));
  }
  return null;
};

const getMovieStats = (movie: MovieDetails): DetailStat[] => [
  buildStat("Release date", formatDate(movie.release_date, "long")),
  buildStat("Original language", getLanguageName(movie.original_language)),
  buildStat("Budget", movie.budget ? formatCompactCurrency(movie.budget) : null),
  buildStat("Revenue", movie.revenue ? formatCompactCurrency(movie.revenue) : null, "worldwide"),
].filter(isStat);

const getTvShowStats = (tvShow: TvShowDetails): DetailStat[] => [
  buildStat("Network", tvShow.networks[0]?.name),
  buildStat("First aired", formatDate(tvShow.first_air_date, "long")),
  getEpisodeStat(tvShow),
  buildStat("Original language", getLanguageName(tvShow.original_language)),
].filter(isStat);

const getMovieCertification = (movie: MovieDetails) =>
  movie.release_dates?.results
    .find(({ iso_3166_1 }) => iso_3166_1 === CERTIFICATION_REGION)
    ?.release_dates.find(({ certification }) => certification)
    ?.certification;

const getTvShowCertification = (tvShow: TvShowDetails) =>
  tvShow.content_ratings?.results
    .find(({ iso_3166_1 }) => iso_3166_1 === CERTIFICATION_REGION)
    ?.rating;

const toKeyCrewEntries = (crew: CrewMember[], creators: Creator[]) => [
  ...creators.map((creator) => ({ ...creator, job: "Creator" })),
  ...crew
    .filter(({ job }) => KEY_JOBS.includes(job))
    .sort((a, b) => KEY_JOBS.indexOf(a.job) - KEY_JOBS.indexOf(b.job)),
];

// The same person often holds several key jobs (e.g. Director and Screenplay), so they're merged into one entry
const getKeyCrew = (crew: CrewMember[], creators: Creator[] = []): KeyCrewMember[] => {
  const people = new Map<number, KeyCrewMember>();

  toKeyCrewEntries(crew, creators).forEach(({ id, name, profile_path, job }) => {
    const person = people.get(id);
    if (!person) {
      people.set(id, { id, name, profile_path, roles: [job] });
      return;
    }
    if (!person.roles.includes(job)) person.roles.push(job);
  });

  return [...people.values()].slice(0, KEY_CREW_LIMIT);
};

export const toMovieCard = (movie: Movie): MediaCardData => ({
  id: movie.id,
  title: movie.title,
  posterPath: movie.poster_path,
  releaseDate: movie.release_date,
  vote: movie.vote_average,
  voteCount: movie.vote_count,
  overview: movie.overview,
  genreIds: movie.genre_ids,
  href: screenlogRoutes.movie(movie.id),
});

export const toTvShowCard = (tvShow: TvShow): MediaCardData => ({
  id: tvShow.id,
  title: tvShow.name,
  posterPath: tvShow.poster_path,
  releaseDate: tvShow.first_air_date,
  vote: tvShow.vote_average,
  voteCount: tvShow.vote_count,
  overview: tvShow.overview,
  genreIds: tvShow.genre_ids,
  href: screenlogRoutes.tvShow(tvShow.id),
});

export const getMediaSections = (data: MovieDetails | TvShowDetails, isTVShow: boolean) => {
  if (isTVShow) {
    const tvShow = data as TvShowDetails;
    return {
      certification: getTvShowCertification(tvShow),
      stats: getTvShowStats(tvShow),
      keyCrew: getKeyCrew(tvShow.credits.crew, tvShow.created_by),
      recommendations: (tvShow.recommendations?.results ?? []).map(toTvShowCard),
    };
  }

  const movie = data as MovieDetails;
  return {
    certification: getMovieCertification(movie),
    stats: getMovieStats(movie),
    keyCrew: getKeyCrew(movie.credits.crew),
    recommendations: (movie.recommendations?.results ?? []).map(toMovieCard),
  };
};

export const getTrailerUrl = (videos: VideoList | undefined) => {
  const trailers = videos?.results.filter(({ site, type }) => site === "YouTube" && type === "Trailer") ?? [];
  const trailer = trailers.find(({ official }) => official) ?? trailers[0];
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
