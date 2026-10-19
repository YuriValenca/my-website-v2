import PersonDetails from "../../(components)/PersonDetails";

interface PersonDetailsPageProps {
  params: Promise<{ id: string }>;
}

const PersonDetailsPage = async ({ params }: PersonDetailsPageProps) => {
  const { id } = await params;
  return <PersonDetails id={Number(id)} />;
};

export default PersonDetailsPage;
