"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; 
import HeaderOption from "./HeaderOption";
import SearchIcon from "../../../../../shared/assets/icons/searchIcon.svg";
import { HeaderWrapper, OptionsContainer, SearchContainer, Title } from "./style";
import SearchBar from "./SearchBar";

const ScreenlogHeader = () => {
  const router = useRouter();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <OptionsContainer>
        <Title onClick={() => router.push('/projects/screenlog')}>Screenlog</Title>
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
        {/* <HeaderOption
          category="TV Shows"
          options={[
            { text: 'Popular', to: '/popular' },
            { text: 'Now playing', to: '/now-playing' },
            { text: 'Top rated', to: '/top-rated' },
          ]}
        /> */}
      </OptionsContainer>
      <SearchContainer ref={searchContainerRef}>
        <SearchBar visible={showSearchBar} onClose={() => setShowSearchBar(false)} />
        <SearchIcon onClick={() => setShowSearchBar((prev) => !prev)} />
      </SearchContainer>
    </HeaderWrapper>
  )
}

export default ScreenlogHeader;
