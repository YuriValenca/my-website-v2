"use client";

import { useState } from "react";
import HeaderOption from "./HeaderOption";
import SearchIcon from "../../../../../shared/assets/icons/searchIcon.svg";
import { HeaderWrapper, OptionsContainer, SearchContainer, Title } from "./style";
import SearchBar from "./SearchBar";

const ScreenlogHeader = () => {
  const [showSearchBar, setshowSearchBar] = useState(false);

  return (
    <HeaderWrapper>
      <OptionsContainer>
        <Title>Screenlog</Title>
        <HeaderOption
          category="Movies"
          options={[
            { text: 'Popular', to: '/popular' },
            { text: 'Now playing', to: '/now-playing' },
            { text: 'Top rated', to: '/top-rated' },
          ]}
        />
        <HeaderOption
          category="People"
          options={[
            { text: 'Popular', to: '/people/popular' },
          ]}
        />
      </OptionsContainer>
      <SearchContainer>
        <SearchBar visible={showSearchBar} />
        <SearchIcon onClick={() => setshowSearchBar(!showSearchBar)} />
      </SearchContainer>
    </HeaderWrapper>
  )
}

export default ScreenlogHeader;
