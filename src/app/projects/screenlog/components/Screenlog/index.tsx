"use client";

import MovieSection from "../MovieSection";
import { ScreenlogWrapper } from "./style";


const Screenlog = () => {
  return (
    <ScreenlogWrapper>      
      <MovieSection title="Latest" hook="latest" />
      <MovieSection title="Popular" hook="popular" />
      <MovieSection title="Top Rated" hook="top-rated" />
    </ScreenlogWrapper>
  )
}

export default Screenlog;
