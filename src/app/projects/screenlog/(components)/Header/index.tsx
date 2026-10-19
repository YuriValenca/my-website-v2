"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { screenlogRoutes } from "../../(helpers)/routes";
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
          <Title onClick={() => router.push(screenlogRoutes.home())}>Screenlog</Title>
          <HeaderOption
            category="Movies"
            options={[
              { text: 'Popular', to: screenlogRoutes.list('movies', 'popular') },
              { text: 'Now playing', to: screenlogRoutes.list('movies', 'now-playing') },
              { text: 'Top rated', to: screenlogRoutes.list('movies', 'top-rated') },
            ]}
          />
          <HeaderOption
            category="TV Shows"
            options={[
              { text: 'Popular', to: screenlogRoutes.list('tv-shows', 'popular') },
              { text: 'Now playing', to: screenlogRoutes.list('tv-shows', 'now-playing') },
              { text: 'Top rated', to: screenlogRoutes.list('tv-shows', 'top-rated') },
            ]}
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
