import { ReactNode } from "react";
import { MovieList } from "../../(types)/movies";
import { toMovieCard } from "../../(helpers)/mediaDetails";
import MediaCarousel from "../MediaCarousel";
import { SectionBadge, SectionHeader, SectionTitle, SectionWrapper } from "./style";

interface MovieSectionProps {
  title: string;
  badge: string;
  badgeIcon: ReactNode;
  badgeColor: string;
  seeAllHref: string;
  data: MovieList | undefined;
}

const MovieSection = ({ title, badge, badgeIcon, badgeColor, seeAllHref, data }: MovieSectionProps) => {
  if (!data?.results.length) return null;

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionBadge color={badgeColor}>
          {badgeIcon}
          {badge}
        </SectionBadge>
      </SectionHeader>
      <MediaCarousel items={data.results.map(toMovieCard)} isTVShow={false} seeAllHref={seeAllHref} />
    </SectionWrapper>
  );
};

export default MovieSection;
