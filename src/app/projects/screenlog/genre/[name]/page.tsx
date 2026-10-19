import GenreDetails from "../../(components)/GenreDetails";

interface MovieDetailsPageProps {
  params: Promise<{ name: string }>;
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { name } = await params;
  return <GenreDetails name={name} />;
};

export default MovieDetailsPage;
