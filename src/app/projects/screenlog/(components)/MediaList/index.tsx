"use client";

import { useState } from "react";
import Spinner from "@/shared/components/Spinner";
import { TOP_RATED_MIN_VOTES } from "../../(api)/movies";
import { TOP_RATED_TV_MIN_VOTES } from "../../(api)/tv-shows";
import { flattenUniqueItems, useMediaList } from "../../(hooks)/useMediaList";
import { useGenreNames } from "../../(hooks)/useGenreNames";
import { useInfiniteScroll } from "../../(hooks)/useInfiniteScroll";
import { LIST_CATEGORIES, ListCategory, ListMediaType, screenlogRoutes } from "../../(helpers)/routes";
import MediaCard from "../MediaCard";
import MediaListRow from "../MediaListRow";
import {
  CategoryTab, CategoryTabs, ListDescription, ListTitle, ListToolbar, MediaGrid, MediaListWrapper,
  MediaRows, TotalCount, ViewOption, ViewToggle,
} from "./style";

interface MediaListProps {
  mediaType: ListMediaType;
  category: ListCategory;
}

type ViewMode = "grid" | "list";

interface ListCopy {
  title: string;
  noun: string;
  tabs: Record<ListCategory, string>;
  descriptions: Record<ListCategory, string>;
}

const LIST_COPY: Record<ListMediaType, ListCopy> = {
  movies: {
    title: "Movies",
    noun: "movies",
    tabs: { popular: "Popular", "now-playing": "Now playing", "top-rated": "Top rated", discover: "Discover" },
    descriptions: {
      popular: "What everyone is watching right now.",
      "now-playing": "Released in theatres over the last six weeks.",
      "top-rated": `The highest rated movies with at least ${TOP_RATED_MIN_VOTES.toLocaleString("en-US")} votes.`,
      discover: "Browse the whole movie catalog.",
    },
  },
  "tv-shows": {
    title: "TV Shows",
    noun: "shows",
    tabs: { popular: "Popular", "now-playing": "On the air", "top-rated": "Top rated", discover: "Discover" },
    descriptions: {
      popular: "What everyone is watching right now.",
      "now-playing": "Shows with a new episode airing this week.",
      "top-rated": `The highest rated shows with at least ${TOP_RATED_TV_MIN_VOTES.toLocaleString("en-US")} votes.`,
      discover: "Browse the whole TV show catalog.",
    },
  },
};

const VIEW_MODES: { mode: ViewMode; label: string }[] = [
  { mode: "grid", label: "Grid" },
  { mode: "list", label: "List" },
];

const MediaList = ({ mediaType, category }: MediaListProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const getGenreNames = useGenreNames(mediaType === "tv-shows");
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMediaList(mediaType, category);
  const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage);

  const copy = LIST_COPY[mediaType];
  const items = flattenUniqueItems(data);
  const totalResults = data?.pages[0]?.totalResults;

  const renderResults = () => {
    if (isLoading) return <Spinner />;
    // TODO: Swap for the EmptyState planned in P1
    if (isError) return <div>Error</div>;

    if (viewMode === "list") {
      return (
        <MediaRows>
          {items.map((item, index) => (
            <MediaListRow key={item.id} rank={index + 1} item={item} genres={getGenreNames(item.genreIds)} />
          ))}
        </MediaRows>
      );
    }

    return (
      <MediaGrid>
        {items.map(({ id, href, title, posterPath, releaseDate, vote, genreIds }) => (
          <MediaCard
            key={id}
            href={href}
            title={title}
            posterPath={posterPath}
            releaseDate={releaseDate}
            vote={vote}
            genre={getGenreNames(genreIds)[0]}
          />
        ))}
      </MediaGrid>
    );
  };

  return (
    <MediaListWrapper>
      <ListTitle>{copy.title}</ListTitle>
      <CategoryTabs>
        {LIST_CATEGORIES.map((tabCategory) => (
          <CategoryTab
            key={tabCategory}
            href={screenlogRoutes.list(mediaType, tabCategory)}
            isActive={tabCategory === category}
          >
            {copy.tabs[tabCategory]}
          </CategoryTab>
        ))}
      </CategoryTabs>
      <ListToolbar>
        <ListDescription>
          {copy.descriptions[category]}
          {!!totalResults && <TotalCount>{totalResults.toLocaleString("en-US")} {copy.noun}</TotalCount>}
        </ListDescription>
        <ViewToggle>
          {VIEW_MODES.map(({ mode, label }) => (
            <ViewOption key={mode} isActive={viewMode === mode} onClick={() => setViewMode(mode)}>
              {label}
            </ViewOption>
          ))}
        </ViewToggle>
      </ListToolbar>
      {renderResults()}
      <div ref={sentinelRef} />
      {isFetchingNextPage && <Spinner />}
    </MediaListWrapper>
  );
};

export default MediaList;
