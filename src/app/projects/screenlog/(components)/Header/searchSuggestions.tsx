import { ReactNode } from "react";
import PersonIcon from "../../../../../shared/assets/icons/personIcon.svg";
import MovieIcon from "../../../../../shared/assets/icons/movieIcon.svg";
import TVIcon from "../../../../../shared/assets/icons/tvIcon.svg";
import { screenlogRoutes } from "../../(helpers)/routes";
import { MediaType, SearchResultItem } from "../../(types)/searchResults";

const RESULTS_LIMIT = 8;
export const MIN_QUERY_LENGTH = 2;

export const MEDIA_TYPE_CONFIG = {
  tv:     { label: "TV Show", icon: <TVIcon /> },
  movie:  { label: "Movie",   icon: <MovieIcon /> },
  person: { label: "People",  icon: <PersonIcon /> },
} satisfies Record<MediaType, { label: string; icon: ReactNode }>;

const ROUTE_BY_MEDIA_TYPE: Record<MediaType, (id: number) => string> = {
  movie: screenlogRoutes.movie,
  tv: screenlogRoutes.tvShow,
  person: screenlogRoutes.person,
};

export const getItemLabel = (item: SearchResultItem) => "title" in item ? item.title : item.name;

export const getItemRoute = (item: SearchResultItem) => ROUTE_BY_MEDIA_TYPE[item.media_type](item.id);

// Copies before sorting: sort() mutates, and these results live in the React Query cache
export const rankResults = (results: SearchResultItem[]): SearchResultItem[] =>
  [...results]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, RESULTS_LIMIT);
