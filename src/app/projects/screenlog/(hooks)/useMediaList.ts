"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { discoverMoviePage, discoverTvShowPage } from "../(api)/discover";
import { TMDB_MAX_PAGES, TMDB_TOTAL_RESULTS_CAP } from "../(api)/tmdbClient";
import { DiscoverFilters } from "../(helpers)/discoverFilters";
import { MediaCardData, toMovieCard, toTvShowCard } from "../(helpers)/mediaDetails";
import { ListMediaType } from "../(helpers)/routes";

interface MediaListPage {
  items: MediaCardData[];
  page: number;
  totalPages: number;
  totalResults?: number;
}

interface TmdbPageInfo {
  page: number;
  total_pages: number;
  total_results: number;
}

const toMediaListPage = (list: TmdbPageInfo, items: MediaCardData[]): MediaListPage => ({
  items,
  page: list.page,
  totalPages: Math.min(list.total_pages, TMDB_MAX_PAGES),
  totalResults: list.total_results >= TMDB_TOTAL_RESULTS_CAP ? undefined : list.total_results,
});

const fetchMediaListPage = async (mediaType: ListMediaType, filters: DiscoverFilters, page: number) => {
  if (mediaType === "movies") {
    const list = await discoverMoviePage(filters, page);
    return toMediaListPage(list, list.results.map(toMovieCard));
  }

  const list = await discoverTvShowPage(filters, page);
  return toMediaListPage(list, list.results.map(toTvShowCard));
};

// Popularity shifts between page requests, so the same title can come back on two pages
export const flattenUniqueItems = (data: InfiniteData<MediaListPage> | undefined) => {
  const itemsById = new Map<number, MediaCardData>();
  data?.pages.forEach(({ items }) => items.forEach((item) => {
    if (!itemsById.has(item.id)) itemsById.set(item.id, item);
  }));
  return [...itemsById.values()];
};

export function useMediaList(mediaType: ListMediaType, filters: DiscoverFilters) {
  return useInfiniteQuery({
    queryKey: ["media-list", mediaType, filters],
    queryFn: ({ pageParam }) => fetchMediaListPage(mediaType, filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ page, totalPages }) => (page < totalPages ? page + 1 : undefined),
  });
}
