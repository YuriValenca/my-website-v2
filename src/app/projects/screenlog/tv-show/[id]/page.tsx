import MediaDetails from "../../(components)/MediaDetails";

interface TVShowDetailsPageProps {
  params: Promise<{ id: string }>;
}

const TVShowDetailsPage = async ({ params }: TVShowDetailsPageProps) => {
  const { id } = await params;
  return <MediaDetails id={Number(id)} isTVShow />;
};

export default TVShowDetailsPage;
