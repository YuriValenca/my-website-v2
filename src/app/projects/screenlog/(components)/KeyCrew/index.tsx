import { KeyCrewMember } from "../../(helpers)/mediaDetails";
import { screenlogRoutes } from "../../(helpers)/routes";
import PersonAvatar from "../PersonAvatar";
import { KeyCrewCard, KeyCrewGrid, KeyCrewInfo, KeyCrewName, KeyCrewRoles } from "./style";

interface KeyCrewProps {
  crew: KeyCrewMember[];
}

const AVATAR_DIAMETER = 36;

const KeyCrew = ({ crew }: KeyCrewProps) => (
  <KeyCrewGrid>
    {crew.map(({ id, name, profile_path, roles }) => (
      <KeyCrewCard key={id} href={screenlogRoutes.person(id)}>
        <PersonAvatar name={name} profilePath={profile_path} diameter={AVATAR_DIAMETER} />
        <KeyCrewInfo>
          <KeyCrewName>{name}</KeyCrewName>
          <KeyCrewRoles>{roles.join(", ")}</KeyCrewRoles>
        </KeyCrewInfo>
      </KeyCrewCard>
    ))}
  </KeyCrewGrid>
);

export default KeyCrew;
