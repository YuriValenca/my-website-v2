import { useState } from "react";
import { getAbbreviation } from "../../(helpers)/getAbbreviation";
import { tmdbImage } from "../../(helpers)/tmdbImage";
import { AvatarImage, AvatarInitials } from "./style";

interface PersonAvatarProps {
  name: string;
  profilePath: string | null;
  diameter: number;
}

const PersonAvatar = ({ name, profilePath, diameter }: PersonAvatarProps) => {
  const [failedPath, setFailedPath] = useState<string | null>(null);

  if (!profilePath || failedPath === profilePath) {
    return <AvatarInitials diameter={diameter} aria-hidden>{getAbbreviation(name)}</AvatarInitials>;
  }

  return (
    <AvatarImage
      diameter={diameter}
      src={tmdbImage(profilePath, "w185")}
      alt=""
      loading="lazy"
      onError={() => setFailedPath(profilePath)}
    />
  );
};

export default PersonAvatar;
