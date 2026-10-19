

interface PersonDetailsProps {
  id: number,
}

const PersonDetails = ({
  id,
}:PersonDetailsProps) => {
  return (
    <>
      {id}
    </>
  )
}

export default PersonDetails;
