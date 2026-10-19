import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import { useSearchMulti } from "../../../(hooks)/useSearch";
import { SearchResultItem } from "../../../(types)/searchResults";
import { screenlogRoutes } from "../../../(helpers)/routes";
import SearchIcon from "../../../../../../shared/assets/icons/searchIcon.svg";
import CloseIcon from "../../../../../../shared/assets/icons/closeIcon.svg";
import { getItemLabel, getItemRoute, MEDIA_TYPE_CONFIG, MIN_QUERY_LENGTH, rankResults } from "../searchSuggestions";
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

const SearchOverlay = ({ visible, onClose }: SearchOverlayProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchMulti(query);

  const isOpen = query.length > MIN_QUERY_LENGTH;
  const results = rankResults(data?.results ?? []);

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
    router.push(screenlogRoutes.search(query));
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
          {results.map((item) => {
            const { label, icon } = MEDIA_TYPE_CONFIG[item.media_type];
            return (
              <DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
                {icon}
                <ItemLabel>{getItemLabel(item)}</ItemLabel>
                <ItemCategory>{label}</ItemCategory>
              </DropdownItem>
            );
          })}
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
