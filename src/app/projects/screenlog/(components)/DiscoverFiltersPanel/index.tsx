import { useState } from "react";
import Button from "@/shared/components/Button";
import ChipSelect from "@/shared/components/ChipSelect";
import FilterGroup from "@/shared/components/FilterGroup";
import RangeSlider from "@/shared/components/RangeSlider";
import { theme } from "@/shared/theme/theme";
import { useGetGenres } from "../../(hooks)/useMovies";
import { useGetTvGenres } from "../../(hooks)/useTVShows";
import { useLanguages } from "../../(hooks)/useLanguages";
import {
  DiscoverFilters, getDefaultSortOrder, getSortChoices, isFullRange, MIN_VOTES_OPTIONS, MOVIE_CERTIFICATIONS,
  RUNTIME_LIMITS, SCORE_LIMITS, SortOption, SortOrder,
} from "../../(helpers)/discoverFilters";
import { ListMediaType } from "../../(helpers)/routes";
import { DateFields, DateInput, DateLabel, FilterSelect, PanelActions, PanelWrapper } from "./style";

interface DiscoverFiltersPanelProps {
  mediaType: ListMediaType;
  appliedFilters: DiscoverFilters;
  defaultFilters: DiscoverFilters;
  onSearch: (filters: DiscoverFilters) => void;
}

const SCORE_STEP = 0.5;
const DEFAULT_SORT: SortOption = "popularity";
const SORT_SEPARATOR = ".";
const RUNTIME_STEP = 15;

const formatRuntime = (minutes: number) =>
  minutes >= RUNTIME_LIMITS.max ? `${minutes}+ min` : `${minutes} min`;

const formatVotes = (votes: number) => (votes ? `${votes.toLocaleString("en-US")}+` : "Any");

const DiscoverFiltersPanel = ({ mediaType, appliedFilters, defaultFilters, onSearch }: DiscoverFiltersPanelProps) => {
  const [draft, setDraft] = useState(appliedFilters);
  const { data: movieGenres = [] } = useGetGenres();
  const { data: tvGenres = [] } = useGetTvGenres();
  const { data: languages = [] } = useLanguages();

  const genres = mediaType === "movies" ? movieGenres : tvGenres;
  const update = (changes: Partial<DiscoverFilters>) => setDraft((current) => ({ ...current, ...changes }));
  const changeSort = (choice: string) => {
    const [sortBy, sortOrder] = choice.split(SORT_SEPARATOR) as [SortOption, SortOrder];
    update({ sortBy, sortOrder });
  };

  // Groups start collapsed, except the ones already filtering the results
  const isGroupActive = {
    sort: appliedFilters.sortBy !== DEFAULT_SORT || appliedFilters.sortOrder !== getDefaultSortOrder(DEFAULT_SORT),
    genres: appliedFilters.genres.length > 0,
    certification: appliedFilters.certifications.length > 0,
    language: !!appliedFilters.language,
    score: !isFullRange(appliedFilters.score, SCORE_LIMITS),
    minVotes: !!appliedFilters.minVotes,
    runtime: !isFullRange(appliedFilters.runtime, RUNTIME_LIMITS),
    release: !!(appliedFilters.releaseFrom || appliedFilters.releaseTo),
  };

  return (
    <PanelWrapper>
      <FilterGroup title="Sort by" isInitiallyOpen={isGroupActive.sort}>
        <FilterSelect
          aria-label="Sort by"
          value={[draft.sortBy, draft.sortOrder].join(SORT_SEPARATOR)}
          onChange={(event) => changeSort(event.target.value)}
        >
          {getSortChoices(mediaType).map(({ sortBy, sortOrder, label }) => {
            const value = [sortBy, sortOrder].join(SORT_SEPARATOR);
            return <option key={value} value={value}>{label}</option>;
          })}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="Genres" isInitiallyOpen={isGroupActive.genres}>
        <ChipSelect
          options={genres.map(({ id, name }) => ({ value: id, label: name }))}
          selected={draft.genres}
          onChange={(selected) => update({ genres: selected })}
        />
      </FilterGroup>

      {mediaType === "movies" &&
        <FilterGroup title="Certification" isInitiallyOpen={isGroupActive.certification}>
          <ChipSelect
            options={MOVIE_CERTIFICATIONS.map((certification) => ({ value: certification, label: certification }))}
            selected={draft.certifications}
            onChange={(selected) => update({ certifications: selected })}
          />
        </FilterGroup>
      }

      <FilterGroup title="Original language" isInitiallyOpen={isGroupActive.language}>
        <FilterSelect
          aria-label="Original language"
          value={draft.language ?? ""}
          onChange={(event) => update({ language: event.target.value || undefined })}
        >
          <option value="">Any language</option>
          {languages.map(({ iso_639_1, english_name }) => (
            <option key={iso_639_1} value={iso_639_1}>{english_name}</option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title="User score" isInitiallyOpen={isGroupActive.score}>
        <RangeSlider
          label="score"
          limits={SCORE_LIMITS}
          step={SCORE_STEP}
          value={draft.score ?? SCORE_LIMITS}
          onChange={(score) => update({ score })}
        />
      </FilterGroup>

      <FilterGroup title="Minimum votes" isInitiallyOpen={isGroupActive.minVotes}>
        <FilterSelect
          aria-label="Minimum votes"
          value={draft.minVotes ?? 0}
          onChange={(event) => update({ minVotes: Number(event.target.value) || undefined })}
        >
          {MIN_VOTES_OPTIONS.map((votes) => (
            <option key={votes} value={votes}>{formatVotes(votes)}</option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup title={mediaType === "movies" ? "Runtime" : "Episode runtime"} isInitiallyOpen={isGroupActive.runtime}>
        <RangeSlider
          label="runtime"
          limits={RUNTIME_LIMITS}
          step={RUNTIME_STEP}
          value={draft.runtime ?? RUNTIME_LIMITS}
          formatValue={formatRuntime}
          onChange={(runtime) => update({ runtime })}
        />
      </FilterGroup>

      <FilterGroup title={mediaType === "movies" ? "Release date" : "First air date"} isInitiallyOpen={isGroupActive.release}>
        <DateFields>
          <DateLabel>
            From
            <DateInput
              type="date"
              value={draft.releaseFrom ?? ""}
              max={draft.releaseTo}
              onChange={(event) => update({ releaseFrom: event.target.value || undefined })}
            />
          </DateLabel>
          <DateLabel>
            To
            <DateInput
              type="date"
              value={draft.releaseTo ?? ""}
              min={draft.releaseFrom}
              onChange={(event) => update({ releaseTo: event.target.value || undefined })}
            />
          </DateLabel>
        </DateFields>
      </FilterGroup>

      <PanelActions>
        <Button variant="outline" text="Reset" onClick={() => setDraft(defaultFilters)} />
        <Button
          text="Search"
          bg={theme.colors.accent.blue}
          textColor={theme.colors.background.page}
          isBold
          onClick={() => onSearch(draft)}
        />
      </PanelActions>
    </PanelWrapper>
  );
};

export default DiscoverFiltersPanel;
