"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/shared/components/Spinner";
import Button from "@/shared/components/Button";
import { theme } from "@/shared/theme/theme";
import { formatDate } from "@/shared/utils/stringUtils";
import PlayIcon from "../../../../../shared/assets/icons/playIcon.svg";
import { useGetMovie } from "../../(hooks)/useMovies";
import { useGetTvShow } from "../../(hooks)/useTVShows";
import { getMediaSections, getTrailerUrl } from "../../(helpers)/mediaDetails";
import { TvShowDetails } from "../../(types)/tv-shows";
import { MovieDetails } from "../../(types)/movies";
import { Rating, RatingWrapper, Tag, Tags, Title } from "../MovieHighlight/style";
import CastList from "../CastList";
import KeyCrew from "../KeyCrew";
import DetailStats from "../DetailStats";
import Recommendations from "../Recommendations";
import {
  ActionsWrapper, BackdropFade, BackdropImage, BackdropWrapper, Certification, HeroSection,
  InfoWrapper, MediaDetailWrapper, OverviewContent, PosterImage, RatingCount, SectionTitle,
  SectionWrapper, Tagline, TextInfo } from "./style";

interface MediaDetailsProps {
  id: number;
  isTVShow?: boolean;
}

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

const MIN_STATS_TO_SHOW = 2;

const DetailSection = ({ title, children }: DetailSectionProps) => (
  <SectionWrapper>
    <SectionTitle>{title}</SectionTitle>
    <hr />
    {children}
  </SectionWrapper>
);

const MediaDetails = ({ id, isTVShow = false }: MediaDetailsProps) => {
  const router = useRouter();
  const movieQuery = useGetMovie(id, !isTVShow);
  const tvQuery = useGetTvShow(id, isTVShow);
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

  const { certification, stats, keyCrew, recommendations } = getMediaSections(data, isTVShow);
  const trailerUrl = getTrailerUrl(data.videos);

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
          {data.tagline && <Tagline>&ldquo;{data.tagline}&rdquo;</Tagline>}
          <TextInfo>
            {certification && <Certification>{certification}</Certification>}
            {displayTextInfo()}
          </TextInfo>
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
          {trailerUrl &&
            <ActionsWrapper>
              <Button
                bg={theme.colors.neutral.gray100}
                textColor={theme.colors.text.dark}
                text="Watch trailer"
                icon={<PlayIcon />}
                onClick={() => window.open(trailerUrl, "_blank", "noopener,noreferrer")}
              />
            </ActionsWrapper>
          }
        </InfoWrapper>
      </HeroSection>
      {data.overview &&
        <DetailSection title="Overview">
          <OverviewContent>{data.overview}</OverviewContent>
        </DetailSection>
      }
      {stats.length >= MIN_STATS_TO_SHOW &&
        <DetailSection title="Details">
          <DetailStats stats={stats} />
        </DetailSection>
      }
      {data.credits.cast.length > 0 &&
        <DetailSection title="Cast">
          <CastList cast={data.credits.cast} />
        </DetailSection>
      }
      {keyCrew.length > 0 &&
        <DetailSection title="Key crew">
          <KeyCrew crew={keyCrew} />
        </DetailSection>
      }
      {recommendations.length > 0 &&
        <DetailSection title="More like this">
          <Recommendations items={recommendations} isTVShow={isTVShow} />
        </DetailSection>
      }
    </MediaDetailWrapper>
  );
};

export default MediaDetails;
