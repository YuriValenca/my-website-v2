import { getAbbreviation } from "../../(helpers)/getAbbreviation";
import { tmdbImage } from "../../(helpers)/tmdbImage";
import { AvatarImage, AvatarInitials } from "./style";

interface PersonAvatarProps {
  name: string;
  profilePath: string | null;
  diameter: number;
}

const PersonAvatar = ({ name, profilePath, diameter }: PersonAvatarProps) => {
  if (!profilePath) {
    return <AvatarInitials diameter={diameter} aria-hidden>{getAbbreviation(name)}</AvatarInitials>;
  }

  return (
    <AvatarImage
      diameter={diameter}
      src={tmdbImage(profilePath, "w185")}
      alt=""
      loading="lazy"
    />
  );
};

export default PersonAvatar;
