import { notFound } from "next/navigation";
import MediaList from "../../(components)/MediaList";
import { isListCategory } from "../../(helpers)/routes";

interface TvShowsListPageProps {
  params: Promise<{ category: string }>;
}

const TvShowsListPage = async ({ params }: TvShowsListPageProps) => {
  const { category } = await params;

  if (!isListCategory(category)) notFound();

  return <MediaList mediaType="tv-shows" category={category} />;
};

export default TvShowsListPage;
