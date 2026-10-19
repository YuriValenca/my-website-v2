import { useState } from "react";
import NoImageIcon from "../../../../../shared/assets/icons/noimage.svg";
import PersonPlaceholder from "../../../../../shared/assets/icons/emptyPeopleIcon.svg";
import { tmdbImage, TmdbImageSize } from "../../(helpers)/tmdbImage";
import { ImageFallback } from "./style";

interface TmdbImageProps {
  path: string | null;
  size: TmdbImageSize;
  alt: string;
  variant?: "media" | "person";
  loading?: "lazy" | "eager";
  className?: string;
  onClick?: () => void;
}

const FALLBACK_ICON = {
  media: <NoImageIcon />,
  person: <PersonPlaceholder />,
};

const TmdbImage = ({
  path,
  size,
  alt,
  variant = "media",
  loading = "lazy",
  className,
  onClick,
}: TmdbImageProps) => {
  // Tracking the failed path (instead of a boolean) resets the fallback when the same component receives a new image
  const [failedPath, setFailedPath] = useState<string | null>(null);

  if (!path || failedPath === path) {
    return (
      <ImageFallback
        className={className}
        onClick={onClick}
        role="img"
        aria-label={alt || undefined}
        aria-hidden={!alt || undefined}
      >
        {FALLBACK_ICON[variant]}
      </ImageFallback>
    );
  }

  return (
    <img
      className={className}
      src={tmdbImage(path, size)}
      alt={alt}
      loading={loading}
      onClick={onClick}
      onError={() => setFailedPath(path)}
    />
  );
};

export default TmdbImage;
