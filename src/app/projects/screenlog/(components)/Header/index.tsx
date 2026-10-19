"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import HeaderOption from "./HeaderOption";
import SearchIcon from "../../../../../shared/assets/icons/searchIcon.svg";
import { HeaderWrapper, OptionsContainer, SearchContainer, Title } from "./style";
import SearchBar from "./SearchBar";
import SearchOverlay from "./SearchOverlay";

const ScreenlogHeader = () => {
  const router = useRouter();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isMobile = useBreakpoint("tablet");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  return (
    <>
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
            link="movies/"
          />
          <HeaderOption
            category="People"
            options={[
              { text: 'Popular', to: '/people/popular' },
            ]}
            link="people/"
          />
          <HeaderOption
            category="TV Shows"
            options={[
              { text: 'Popular', to: '/popular' },
              { text: 'Now playing', to: '/now-playing' },
              { text: 'Top rated', to: '/top-rated' },
            ]}
            link="tv-shows/"
          />
        </OptionsContainer>
        <SearchContainer ref={searchContainerRef}>
          {!isMobile && (
            <SearchBar visible={showSearchBar} onClose={() => setShowSearchBar(false)} />
          )}
          <SearchIcon onClick={() => setShowSearchBar((prev) => !prev)} />
        </SearchContainer>
      </HeaderWrapper>
      {isMobile && (
        <SearchOverlay visible={showSearchBar} onClose={() => setShowSearchBar(false)} />
      )}
    </>
  );
};

export default ScreenlogHeader;
