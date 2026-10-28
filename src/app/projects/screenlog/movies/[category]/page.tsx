import { notFound } from "next/navigation";
import MediaList from "../../(components)/MediaList";
import { isListCategory } from "../../(helpers)/routes";

interface MoviesListPageProps {
  params: Promise<{ category: string }>;
}

const MoviesListPage = async ({ params }: MoviesListPageProps) => {
  const { category } = await params;

  if (!isListCategory(category)) notFound();

  return <MediaList mediaType="movies" category={category} />;
};

export default MoviesListPage;
