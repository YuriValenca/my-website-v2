import { useRouter } from "next/navigation";
import { Genre } from "../../(types)/movies";
import { screenlogRoutes } from "../../(helpers)/routes";
import { Tag, Tags } from "./style";

interface GenreTagsProps {
  genres: Genre[];
}

const GenreTags = ({ genres }: GenreTagsProps) => {
  const router = useRouter();

  return (
    <Tags>
      {genres.map(genre => (
        <Tag
          key={genre.id}
          onClick={() => router.push(screenlogRoutes.genre(genre.name))}
        >
          {genre.name}
        </Tag>
      ))}
    </Tags>
  );
};

export default GenreTags;
