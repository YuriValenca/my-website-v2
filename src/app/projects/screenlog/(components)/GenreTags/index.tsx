import { useRouter } from "next/navigation";
import { Genre } from "../../(types)/movies";
import { getCategoryFilters, toFilterSearchParams } from "../../(helpers)/discoverFilters";
import { ListMediaType, screenlogRoutes } from "../../(helpers)/routes";
import { Tag, Tags } from "./style";

interface GenreTagsProps {
  genres: Genre[];
  mediaType: ListMediaType;
}

const getGenreRoute = (mediaType: ListMediaType, genreId: number) => {
  const filters = { ...getCategoryFilters(mediaType, "popular"), genres: [genreId] };
  return screenlogRoutes.list(mediaType, "popular", toFilterSearchParams(filters));
};

const GenreTags = ({ genres, mediaType }: GenreTagsProps) => {
  const router = useRouter();

  return (
    <Tags>
      {genres.map(genre => (
        <Tag
          key={genre.id}
          onClick={() => router.push(getGenreRoute(mediaType, genre.id))}
        >
          {genre.name}
        </Tag>
      ))}
    </Tags>
  );
};

export default GenreTags;
