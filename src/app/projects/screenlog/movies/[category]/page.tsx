import { notFound } from "next/navigation";
import MediaList from "../../(components)/MediaList";
import { FilterSearchParams, parseDiscoverFilters } from "../../(helpers)/discoverFilters";
import { isListCategory } from "../../(helpers)/routes";

interface MoviesListPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<FilterSearchParams>;
}

const MoviesListPage = async ({ params, searchParams }: MoviesListPageProps) => {
  const { category } = await params;

  if (!isListCategory(category)) notFound();

  const filters = parseDiscoverFilters("movies", category, await searchParams);
  return <MediaList mediaType="movies" category={category} filters={filters} />;
};

export default MoviesListPage;
