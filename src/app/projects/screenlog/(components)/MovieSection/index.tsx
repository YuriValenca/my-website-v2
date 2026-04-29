import { MovieList } from "../../(types)/movies";


interface MovieSectionProps {
  title: string;
  data: MovieList | undefined;
}

const MovieSection = ({
  title,
  data
}: MovieSectionProps) => {

  return (
    <div>
      {title}
    </div>
  )
}

export default MovieSection;
