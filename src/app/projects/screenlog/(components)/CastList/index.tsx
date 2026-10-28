import { theme } from "@/shared/theme/theme";
import { CastMember } from "../../(types)/movies";
import { screenlogRoutes } from "../../(helpers)/routes";
import PersonAvatar from "../PersonAvatar";
import PagedRow from "../PagedRow";
import { CastMemberItem, CastMemberName, CastMemberCharacter } from "./style";

interface CastListProps {
  cast: CastMember[];
}

const CAST_LIMIT = 30;
const AVATAR_DIAMETER = 72;

const getTopCast = (cast: CastMember[]) =>
  [...cast].sort((a, b) => a.order - b.order).slice(0, CAST_LIMIT);

const CastList = ({ cast }: CastListProps) => (
  <PagedRow
    gap={theme.spacing.micro}
    controlsTop={theme.spacing.xsmall}
    controlsHeight={`${AVATAR_DIAMETER}px`}
  >
    {getTopCast(cast).map(({ id, name, character, profile_path }) => (
      <CastMemberItem key={id} href={screenlogRoutes.person(id)}>
        <PersonAvatar name={name} profilePath={profile_path} diameter={AVATAR_DIAMETER} />
        <CastMemberName>{name}</CastMemberName>
        <CastMemberCharacter>{character}</CastMemberCharacter>
      </CastMemberItem>
    ))}
  </PagedRow>
);

export default CastList;
