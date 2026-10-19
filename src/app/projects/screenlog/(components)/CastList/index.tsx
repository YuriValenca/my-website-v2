import { CastMember } from "../../(types)/movies";
import { screenlogRoutes } from "../../(helpers)/routes";
import PersonAvatar from "../PersonAvatar";
import { CastListWrapper, CastMemberItem, CastMemberName, CastMemberCharacter } from "./style";

interface CastListProps {
  cast: CastMember[];
}

const CAST_LIMIT = 15;
const AVATAR_DIAMETER = 56;

const getTopCast = (cast: CastMember[]) =>
  [...cast].sort((a, b) => a.order - b.order).slice(0, CAST_LIMIT);

const CastList = ({ cast }: CastListProps) => (
  <CastListWrapper>
    {getTopCast(cast).map(({ id, name, character, profile_path }) => (
      <CastMemberItem key={id} href={screenlogRoutes.person(id)}>
        <PersonAvatar name={name} profilePath={profile_path} diameter={AVATAR_DIAMETER} />
        <CastMemberName>{name}</CastMemberName>
        <CastMemberCharacter>{character}</CastMemberCharacter>
      </CastMemberItem>
    ))}
  </CastListWrapper>
);

export default CastList;
