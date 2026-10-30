import { useState } from "react";
import { formatDate } from "@/shared/utils/stringUtils";
import { useGenreNames } from "../../../(hooks)/useGenreNames";
import { getCreditDepartments, PersonCredit } from "../../../(helpers)/personDetails";
import DetailSection from "../../DetailSection";
import MediaListRow from "../../MediaListRow";
import SegmentedControl from "../../SegmentedControl";
import {
  CompactHeading, CompactRole, CompactRow, CompactTitle, CompactType, CompactYear, CreditRows, EmptyMessage,
  FilmographyControls,
} from "./style";

interface PersonFilmographyProps {
  credits: PersonCredit[];
  mainDepartment: string;
}

type MediaFilter = "all" | PersonCredit["mediaType"];
type ViewMode = "compact" | "full";

const ALL_DEPARTMENTS = "All";
const MISSING_YEAR = "—";
const MIN_DEPARTMENTS_TO_FILTER = 2;

const MEDIA_FILTERS: { value: MediaFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV shows" },
];

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "full", label: "Full" },
];

const getYear = ({ releaseDate }: PersonCredit) => formatDate(releaseDate, "yearOnly") ?? MISSING_YEAR;

const PersonFilmography = ({ credits, mainDepartment }: PersonFilmographyProps) => {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [department, setDepartment] = useState(ALL_DEPARTMENTS);
  const [viewMode, setViewMode] = useState<ViewMode>("compact");
  const getMovieGenres = useGenreNames(false);
  const getTvGenres = useGenreNames(true);

  const departments = getCreditDepartments(credits, mainDepartment);
  const departmentOptions = [ALL_DEPARTMENTS, ...departments].map((value) => ({ value, label: value }));
  const visibleCredits = credits.filter(({ mediaType, departments: creditDepartments }) =>
    (mediaFilter === "all" || mediaType === mediaFilter)
    && (department === ALL_DEPARTMENTS || creditDepartments.includes(department)));

  const getMeta = ({ mediaType, posterLabel, genreIds }: PersonCredit) => {
    const genres = mediaType === "tv" ? getTvGenres(genreIds) : getMovieGenres(genreIds);
    return [posterLabel, genres.join(", ")].filter(Boolean).join(" · ");
  };

  const renderCredits = () => {
    // TODO: Swap for the EmptyState planned in P1
    if (visibleCredits.length === 0) return <EmptyMessage>No credits match these filters.</EmptyMessage>;

    if (viewMode === "full") {
      return visibleCredits.map((credit) => (
        <MediaListRow
          key={credit.href}
          year={getYear(credit)}
          item={credit}
          meta={getMeta(credit)}
          role={credit.roles.join(", ")}
        />
      ));
    }

    return visibleCredits.map((credit) => (
      <CompactRow key={credit.href} href={credit.href}>
        <CompactYear>{getYear(credit)}</CompactYear>
        <CompactHeading>
          <CompactTitle>{credit.title}</CompactTitle>
          <CompactRole>{credit.roles.join(", ")}</CompactRole>
        </CompactHeading>
        <CompactType>{credit.posterLabel}</CompactType>
      </CompactRow>
    ));
  };

  return (
    <DetailSection
      title="Filmography"
      actions={
        <FilmographyControls>
          <SegmentedControl label="Media type" options={MEDIA_FILTERS} value={mediaFilter} onChange={setMediaFilter} />
          {departments.length >= MIN_DEPARTMENTS_TO_FILTER &&
            <SegmentedControl label="Department" options={departmentOptions} value={department} onChange={setDepartment} />
          }
          <SegmentedControl label="View" options={VIEW_MODES} value={viewMode} onChange={setViewMode} />
        </FilmographyControls>
      }
    >
      <CreditRows>{renderCredits()}</CreditRows>
    </DetailSection>
  );
};

export default PersonFilmography;
