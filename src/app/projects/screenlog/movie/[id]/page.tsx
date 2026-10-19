import MediaDetails from "../../(components)/MediaDetails";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params;
  return <MediaDetails id={Number(id)} />;
};

export default MovieDetailsPage;
