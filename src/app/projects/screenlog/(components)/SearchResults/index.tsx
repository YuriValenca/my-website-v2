"use client";

import { useState } from "react";
import { CategoriesWrapper, Category, CategoryAmount, ResultsTitle, ResultsWrapper, SearchResultsWrapper } from "./style";
import { useSearchByCategory } from "../../(hooks)/useSearch";
import Spinner from "@/shared/components/Spinner";
import ResultCard from "./ResultCard";
import Pagination from "@/shared/components/Pagination";

interface SearchResultsProps {
  query: string;
}

type MediaType = "movie" | "tv" | "person";

const CATEGORIES: { key: MediaType; label: string }[] = [
  { key: "movie", label: "Movies" },
  { key: "tv", label: "TV Shows" },
  { key: "person", label: "People" },
];

const SearchResults = ({ query }: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState<MediaType>("movie");
  const [page, setPage] = useState<Record<MediaType, number>>({
    movie: 1,
    tv: 1,
    person: 1,
  });

  const { movies, tv, people } = useSearchByCategory(query, page);

  const categoryData = { movie: movies, tv: tv, person: people };
  const active = categoryData[activeTab];

  const handlePageChange = (newPage: number) => {
    setPage(prev => ({ ...prev, [activeTab]: newPage }));
  }

  if (active.isFetching) return <Spinner />

  return (
    <SearchResultsWrapper>
      <CategoriesWrapper>
        <ResultsTitle>Search Results</ResultsTitle>
        {CATEGORIES.map(({ key, label }) => (
          <Category
            key={key}
            active={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {label}
            <CategoryAmount>{categoryData[key].data?.total_results}</CategoryAmount>
          </Category>
        ))}
      </CategoriesWrapper>

      {CATEGORIES.map(({ key }) => {
        const tab = categoryData[key];
        return (
          <ResultsWrapper key={key} style={{ display: activeTab === key ? "flex" : "none" }}>
            {tab.data?.results.map((item) => (
              <ResultCard
                key={item.id}
                item={item}
                mediaType={key}
              />
            ))}
            {tab.data && (
              <Pagination
                currentPage={page[key]}
                totalResults={tab.data.total_results}
                onPageChange={handlePageChange}
              />
            )}
          </ResultsWrapper>
        );
      })}
    </SearchResultsWrapper>
  );
};

export default SearchResults;
