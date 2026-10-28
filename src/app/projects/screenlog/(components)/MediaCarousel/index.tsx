import PlusIcon from "../../../../../shared/assets/icons/plusIcon.svg";
import { theme } from "@/shared/theme/theme";
import { useGenreNames } from "../../(hooks)/useGenreNames";
import { MediaCardData } from "../../(helpers)/mediaDetails";
import MediaCard from "../MediaCard";
import { MEDIA_CARD_POSTER_HEIGHT } from "../MediaCard/style";
import PagedRow from "../PagedRow";
import { SeeAllCard, SeeAllFrame, SeeAllLabel } from "./style";

interface MediaCarouselProps {
  items: MediaCardData[];
  isTVShow: boolean;
  seeAllHref?: string;
}

const MediaCarousel = ({ items, isTVShow, seeAllHref }: MediaCarouselProps) => {
  const getGenreNames = useGenreNames(isTVShow);

  return (
    <PagedRow
      gap={theme.spacing.default}
      paddingBlock={`${theme.spacing.small} ${theme.spacing.xsmall}`}
      controlsTop={theme.spacing.small}
      controlsHeight={`${MEDIA_CARD_POSTER_HEIGHT}px`}
    >
      {items.map(({ id, href, title, posterPath, releaseDate, vote, genreIds }) => (
        <MediaCard
          key={id}
          href={href}
          title={title}
          posterPath={posterPath}
          releaseDate={releaseDate}
          vote={vote}
          genre={getGenreNames(genreIds)[0]}
        />
      ))}
      {seeAllHref &&
        <SeeAllCard href={seeAllHref}>
          <SeeAllFrame>
            <PlusIcon />
          </SeeAllFrame>
          <SeeAllLabel>See all</SeeAllLabel>
        </SeeAllCard>
      }
    </PagedRow>
  );
};

export default MediaCarousel;
