"use client";

import Spinner from "@/shared/components/Spinner";
import { useGetMovie } from "../../(hooks)/useMovies";
import { useGetTvShow } from "../../(hooks)/useTVShows";
import {
  BackdropFade, BackdropImage, BackdropWrapper, CastListWrapper, HeroSection,
  InfoWrapper, MediaDetailWrapper, OverviewContent, OverviewWrapper,
  PosterImage, RatingCount, SectionTitle, Tagline, TextInfo } from "./style";
import { Rating, RatingWrapper, Tag, Tags, Title } from "../MovieHighlight/style";
import { useRouter } from "next/navigation";
import { TvShowDetails } from "../../(types)/tv-shows";
import { MovieDetails } from "../../(types)/movies";
import { formatDate } from "@/shared/utils/stringUtils";

interface MediaDetailsProps {
  id: number;
  isTVShow?: boolean;
}

const MediaDetails = ({ id, isTVShow = false }: MediaDetailsProps) => {
  const router = useRouter();
  const movieQuery = useGetMovie(id);
  const tvQuery = useGetTvShow(id);
  const { data, isLoading } = isTVShow ? tvQuery : movieQuery;

  const mediaTitle = isTVShow ? (data as TvShowDetails)?.name : (data as MovieDetails)?.title;

  const displayTextInfo = () => {
    const textInfo: string[] = [];

    if (isTVShow) {
      const tvShow = data as TvShowDetails;
      if (tvShow.first_air_date) textInfo.push(formatDate(tvShow.first_air_date, 'yearOnly') ?? '');
      if (tvShow.episode_run_time?.[0]) textInfo.push(`${tvShow.episode_run_time[0]}min / ep`);
      if (tvShow.number_of_seasons) textInfo.push(`${tvShow.number_of_seasons} seasons`);
      if (tvShow.number_of_episodes) textInfo.push(`${tvShow.number_of_episodes} eps`);
    } else {
      const movie = data as MovieDetails;
      if (movie.release_date) textInfo.push(formatDate(movie.release_date, 'yearOnly') ?? '');
      if (movie.runtime) textInfo.push(`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`);
      if (movie.status) textInfo.push(movie.status);
    }

    return textInfo.join(' • ');
  };

  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <MediaDetailWrapper>
      <BackdropWrapper>
        {data?.backdrop_path ? <BackdropImage
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        /> : null}
        <BackdropFade />
      </BackdropWrapper>
      <HeroSection>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={mediaTitle}
        />
        <InfoWrapper>
          <Tags>
            {data.genres.map(genre => (
              <Tag
                key={genre.id}
                onClick={() => router.push(`genre/${genre.name.toLowerCase()}`)}
              >
                {genre.name}
              </Tag>
            ))}
          </Tags>
          <Title>{mediaTitle}</Title>
          {data.tagline && <Tagline>"{data.tagline}"</Tagline>}
          <TextInfo>{displayTextInfo()}</TextInfo>
          <RatingWrapper>
            <Rating voteValue={data.vote_average}>
              {data.vote_average.toFixed(1)}
            </Rating>
            /10
          </RatingWrapper>
          {!!data?.vote_count &&
            <RatingCount>
              {'Averaged from ' + data.vote_count + ' users'}
            </RatingCount>
          }
          {/* Control buttons to be implemented after login */}
        </InfoWrapper>
      </HeroSection>
      {data.overview &&
        <OverviewWrapper>
          <SectionTitle>Overview</SectionTitle>
          <hr />
          <OverviewContent>
            {data.overview}
          </OverviewContent>
        </OverviewWrapper>
      }
      <CastListWrapper>
        {data.credits.cast.map((cast) => {
          console.log(cast)
          return (
            <></>
          )
        })}
      </CastListWrapper>
    </MediaDetailWrapper>
  );
};

export default MediaDetails;
