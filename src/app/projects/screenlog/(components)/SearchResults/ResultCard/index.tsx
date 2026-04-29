import { formatDate } from "@/shared/utils/stringUtils";
import { Movie } from "../../../(types)/movies";
import { Person } from "../../../(types)/people";
import { MediaType } from "../../../(types)/searchResults";
import { TvShow } from "../../../(types)/tv-shows";
import { MediaDetailContent, MediaDetails, PersonDetails, Poster, PosterWrapper, ResultCardWrapper, ResultDetailsWrapper, ResultTitle } from "./style";
import MediaPlaceholder from "../../../../../../shared/assets/icons/emptyMediaIcon.svg";
import PersonPlaceholder from "../../../../../../shared/assets/icons/emptyPeopleIcon.svg";
import { useRouter } from "next/navigation";

interface ResultCardProps {
  item: Movie | TvShow | Person;
  mediaType: MediaType;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

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

  const handleRoute = () => {
    if (mediaType === "person") {
      return `person/${item.id}`;
    }
    if (mediaType === "tv") {
      return `tv-show/${item.id}`;
    }
    if (mediaType === "movie") {
      return `movie/${item.id}`
    }
    return `/`
  }

  return (
    <ResultCardWrapper
      onClick={() => router.push(handleRoute())}
    >
      <PosterWrapper variant={mediaType}>
        {imagePath
          ? <Poster src={`${TMDB_IMAGE_BASE}${imagePath}`} alt={label} />
          : mediaType === "person" ? <PersonPlaceholder /> : <MediaPlaceholder />
        }
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
            {knownFor?.map((movie) => movie.title || movie.original_name).join(', ') || ''}
          </PersonDetails>
        }
      </ResultDetailsWrapper>
    </ResultCardWrapper>
  )
};

export default ResultCard;
