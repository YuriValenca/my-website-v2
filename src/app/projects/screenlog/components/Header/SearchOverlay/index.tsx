import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import { useSearchMulti } from "../../../hooks/useSearch";
import { SearchResultItem } from "../../../types/searchResults";
import PersonIcon from "../../../../../../shared/assets/icons/personIcon.svg";
import MovieIcon from "../../../../../../shared/assets/icons/movieIcon.svg";
import SearchIcon from "../../../../../../shared/assets/icons/searchIcon.svg";
import CloseIcon from "../../../../../../shared/assets/icons/closeIcon.svg";
import {
  Overlay,
  OverlayHeader,
  CloseButton,
  Dropdown,
  DropdownItem,
  ItemLabel,
  ItemCategory,
  EmptyQuery,
  SeeAllItem,
} from "./style";

interface SearchOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const RESULTS_LIMIT = 8;
const MIN_QUERY_LENGTH = 2;

const getItemLabel = (item: SearchResultItem) => "title" in item ? item.title : item.name;

const getItemRoute = (item: SearchResultItem) => item.media_type === "person"
  ? `/projects/screenlog/people/${item.id}`
  : `/projects/screenlog/movie/${item.id}`;

const filterAndRankResults = (results: SearchResultItem[]): SearchResultItem[] =>
  results
    .filter((item) => item.media_type !== "tv")
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, RESULTS_LIMIT);

const SearchOverlay = ({ visible, onClose }: SearchOverlayProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchMulti(query);

  const isOpen = query.length > MIN_QUERY_LENGTH;
  const results = filterAndRankResults(data?.results ?? []);

  useEffect(() => {
    if (!visible) setQuery("");
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible, onClose]);

  const handleItemClick = (item: SearchResultItem) => {
    onClose();
    router.push(getItemRoute(item));
  };

  const handleSeeAll = () => {
    onClose();
    router.push(`/projects/screenlog/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <Overlay visible={visible}>
      <OverlayHeader>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or person..."
        />
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </OverlayHeader>
      {isOpen && !isFetching && (
        <Dropdown>
          {results.length === 0 && (
            <EmptyQuery>No results matched your query</EmptyQuery>
          )}
          {results.map((item) => (
            <DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
              {item.media_type === "person" ? <PersonIcon /> : <MovieIcon />}
              <ItemLabel>{getItemLabel(item)}</ItemLabel>
              <ItemCategory>
                {item.media_type === "person" ? "People" : "Movies"}
              </ItemCategory>
            </DropdownItem>
          ))}
          <SeeAllItem onClick={handleSeeAll}>
            <SearchIcon />
            <ItemLabel>
              See all results for <strong>{query}</strong>
            </ItemLabel>
          </SeeAllItem>
        </Dropdown>
      )}
    </Overlay>
  );
};

export default SearchOverlay;
