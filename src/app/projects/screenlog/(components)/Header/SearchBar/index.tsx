import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import { useSearchMulti } from "../../../(hooks)/useSearch";
import { SearchResultItem } from "../../../(types)/searchResults";
import { screenlogRoutes } from "../../../(helpers)/routes";
import SearchIcon from "../../../../../../shared/assets/icons/searchIcon.svg";
import { getItemLabel, getItemRoute, MEDIA_TYPE_CONFIG, MIN_QUERY_LENGTH, rankResults } from "../searchSuggestions";
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

const SearchBar = ({ visible, onClose }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchMulti(query);

  const isOpen = query.length > MIN_QUERY_LENGTH;
  const results = rankResults(data?.results ?? []);

  const handleItemClick = (item: SearchResultItem) => {
    setQuery("");
    onClose();
    router.push(getItemRoute(item));
  };

  const handleSeeAll = () => {
    setQuery("");
    onClose();
    router.push(screenlogRoutes.search(query));
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
