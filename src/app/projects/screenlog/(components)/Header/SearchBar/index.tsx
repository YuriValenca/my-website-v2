import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import { useSearchMulti } from "../../../(hooks)/useSearch";
import { SearchResultItem } from "../../../(types)/searchResults";
import PersonIcon from "../../../../../../shared/assets/icons/personIcon.svg";
import MovieIcon from "../../../../../../shared/assets/icons/movieIcon.svg";
import SearchIcon from "../../../../../../shared/assets/icons/searchIcon.svg";
import TVIcon from "../../../../../../shared/assets/icons/tvIcon.svg"
import {
  SearchBarWrapper,
  Dropdown,
  DropdownItem,
  ItemLabel,
  ItemCategory,
  EmptyQuery,
  SeeAllItem,
} from "./style";

interface SearchBarProps {
  visible: boolean;
  onClose: () => void;
}

const RESULTS_LIMIT = 8;
const MIN_QUERY_LENGTH = 2;
const MEDIA_TYPE_CONFIG = {
  tv:     { label: "TV Show", icon: <TVIcon /> },
  movie:  { label: "Movie",   icon: <MovieIcon /> },
  person: { label: "People",  icon: <PersonIcon /> },
} satisfies Record<string, { label: string; icon: React.ReactNode }>;

const getItemLabel = (item: SearchResultItem) => "title" in item ? item.title : item.name;

const getItemRoute = (item: SearchResultItem) => {
  if (item.media_type === "person") return `/projects/screenlog/people/${item.id}`;
  if (item.media_type === "tv") return `/projects/screenlog/tv-show/${item.id}`;
  return `/projects/screenlog/movie/${item.id}`;
};

const filterAndRankResults = (results: SearchResultItem[]): SearchResultItem[] =>
  results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, RESULTS_LIMIT);

const SearchBar = ({ visible, onClose }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchMulti(query);

  const isOpen = query.length > MIN_QUERY_LENGTH;
  const results = filterAndRankResults(data?.results ?? []);

  const handleItemClick = (item: SearchResultItem) => {
    setQuery("");
    onClose();
    router.push(getItemRoute(item));
  };

  const handleSeeAll = () => {
    setQuery("");
    onClose();
    router.push(`/projects/screenlog/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <SearchBarWrapper visible={visible}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie or person..."
      />
      {isOpen && !isFetching && (
        <Dropdown>
          {results.length === 0 && (
            <EmptyQuery>No results matched your query</EmptyQuery>
          )}
          {results.map((item) => {
            const { label, icon } = MEDIA_TYPE_CONFIG[item.media_type];
            return (
              <DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
                {icon}
                <ItemLabel>{getItemLabel(item)}</ItemLabel>
                <ItemCategory>
                  {label}
                </ItemCategory>
              </DropdownItem>
            )
          })}
          <SeeAllItem onClick={handleSeeAll}>
            <SearchIcon />
            <ItemLabel>
              See all results for <strong>{query}</strong>
            </ItemLabel>
          </SeeAllItem>
        </Dropdown>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
