import { formatDate } from "@/shared/utils/stringUtils";
import { Movie } from "../../../(types)/movies";
import { Person } from "../../../(types)/people";
import { MediaType } from "../../../(types)/searchResults";
import { TvShow } from "../../../(types)/tv-shows";
import { MediaDetailContent, MediaDetails, PersonDetails, Poster, PosterWrapper, ResultCardWrapper, ResultDetailsWrapper, ResultTitle } from "./style";
import { useRouter } from "next/navigation";
import { screenlogRoutes } from "../../../(helpers)/routes";

interface ResultCardProps {
  item: Movie | TvShow | Person;
  mediaType: MediaType;
}

const ROUTE_BY_MEDIA_TYPE: Record<MediaType, (id: number) => string> = {
  movie: screenlogRoutes.movie,
  tv: screenlogRoutes.tvShow,
  person: screenlogRoutes.person,
};

const normalizeItem = (item: Movie | TvShow | Person, mediaType: MediaType) => {
  if (mediaType === "person") {
    const person = item as Person;
    return {
      label: person.name,
      imagePath: person.profile_path,
      department: person.known_for_department,
      knownFor: person.known_for
    };
  }
  if (mediaType === "movie") {
    const movie = item as Movie;
    return {
      label: movie.title,
      imagePath: movie.poster_path,
      releaseDate: movie.release_date,
      overview: movie.overview
    };
  }
  const show = item as TvShow;
  return {
    label: show.name,
    imagePath: show.poster_path,
    releaseDate: show.first_air_date,
    overview: show.overview
  };
};

const ResultCard = ({ item, mediaType }: ResultCardProps) => {
  const router = useRouter();
  const { label, imagePath, releaseDate, overview, department, knownFor } = normalizeItem(item, mediaType);

  const knownForRender = () => {
    return knownFor?.map((entry) => {
      const isMovie = 'title' in entry;
      return isMovie ? entry.title : entry.name;
    }).join(', ') || ''
  }

  return (
    <ResultCardWrapper
      onClick={() => router.push(ROUTE_BY_MEDIA_TYPE[mediaType](item.id))}
    >
      <PosterWrapper variant={mediaType}>
        <Poster
          path={imagePath}
          size="w185"
          alt={label}
          variant={mediaType === "person" ? "person" : "media"}
        />
      </PosterWrapper>
      <ResultDetailsWrapper>
        <ResultTitle>
          {label}
        </ResultTitle>
        {mediaType !== "person" &&
          <MediaDetails>
            <MediaDetailContent>
              {formatDate(releaseDate, "long")}
            </MediaDetailContent>
            <MediaDetailContent>
              {overview}
            </MediaDetailContent>
          </MediaDetails>
        }
        {mediaType === "person" && 
          <PersonDetails>
            {department}
            &nbsp;•&nbsp;
            {knownForRender()}
          </PersonDetails>
        }
      </ResultDetailsWrapper>
    </ResultCardWrapper>
  )
};

export default ResultCard;
