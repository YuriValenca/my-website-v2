import SearchResults from "../(components)/SearchResults";


interface SearchResultsPageProps {
  searchParams: Promise<{ query?: string }>;
}

const SearchResultsPage = async ({ searchParams }: SearchResultsPageProps) => {
  const { query = "" } = await searchParams;

  return <SearchResults query={query} />
}

export default SearchResultsPage;
