import { ReactNode, useRef } from "react";
import BackIcon from "../../../../../shared/assets/icons/backIcon.svg";
import { theme } from "@/shared/theme/theme";
import { useCarouselPaging } from "../../(hooks)/useCarouselPaging";
import { PagedRowTrack, PagedRowViewport, PagingButton } from "./style";

interface PagedRowProps {
  children: ReactNode;
  gap: string;
  paddingBlock?: string;
  // Area the paging buttons cover, usually just the items' image so the text below stays readable
  controlsTop: string;
  controlsHeight: string;
}

const PagedRow = ({ children, gap, paddingBlock = theme.spacing.none, controlsTop, controlsHeight }: PagedRowProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { isAtStart, isAtEnd, updateEdges, goToPreviousPage, goToNextPage } = useCarouselPaging(trackRef);

  return (
    <PagedRowViewport>
      <PagingButton
        aria-label="Previous"
        data-available={!isAtStart}
        controlsTop={controlsTop}
        controlsHeight={controlsHeight}
        onClick={goToPreviousPage}
      >
        <BackIcon />
      </PagingButton>
      <PagedRowTrack ref={trackRef} gap={gap} paddingBlock={paddingBlock} onScroll={updateEdges}>
        {children}
      </PagedRowTrack>
      <PagingButton
        aria-label="Next"
        isNext
        data-available={!isAtEnd}
        controlsTop={controlsTop}
        controlsHeight={controlsHeight}
        onClick={goToNextPage}
      >
        <BackIcon />
      </PagingButton>
    </PagedRowViewport>
  );
};

export default PagedRow;
