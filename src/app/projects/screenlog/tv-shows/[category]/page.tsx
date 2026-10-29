import { notFound } from "next/navigation";
import MediaList from "../../(components)/MediaList";
import { FilterSearchParams, parseDiscoverFilters } from "../../(helpers)/discoverFilters";
import { isListCategory } from "../../(helpers)/routes";

interface TvShowsListPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<FilterSearchParams>;
}

const TvShowsListPage = async ({ params, searchParams }: TvShowsListPageProps) => {
  const { category } = await params;

  if (!isListCategory(category)) notFound();

  const filters = parseDiscoverFilters("tv-shows", category, await searchParams);
  return <MediaList mediaType="tv-shows" category={category} filters={filters} />;
};

export default TvShowsListPage;
