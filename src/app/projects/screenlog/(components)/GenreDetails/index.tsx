
interface GenreDetailsProps {
  name: string,
}

const GenreDetails = ({
  name
}:GenreDetailsProps) => {
  return (
    <>
      {name}
    </>
  )
}

export default GenreDetails;
