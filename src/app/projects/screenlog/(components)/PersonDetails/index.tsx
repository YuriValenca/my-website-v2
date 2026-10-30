"use client";

import Spinner from "@/shared/components/Spinner";
import { useGetPerson } from "../../(hooks)/usePeople";
import { getBiographyText, getLifeSummary, getPersonSections, getRoleLabel } from "../../(helpers)/personDetails";
import DetailSection from "../DetailSection";
import DetailStats from "../DetailStats";
import MediaCarousel from "../MediaCarousel";
import PersonBiography from "./PersonBiography";
import PersonFilmography from "./PersonFilmography";
import {
  LifeSummary, PersonHero, PersonInfo, PersonName, PersonPhoto, PersonRole, PersonStats, PersonWrapper,
} from "./style";

interface PersonDetailsProps {
  id: number,
}

const STATS_COLUMNS = 3;

const PersonDetails = ({ id }: PersonDetailsProps) => {
  const { data, isLoading } = useGetPerson(id);

  if (isLoading) return <Spinner />;
  if (!data) return null;

  const { stats, knownFor, filmography } = getPersonSections(data);
  const lifeSummary = getLifeSummary(data);

  return (
    <PersonWrapper>
      <PersonHero>
        <PersonPhoto path={data.profile_path} size="w500" alt={data.name} variant="person" loading="eager" />
        <PersonInfo>
          <PersonRole>{getRoleLabel(data.known_for_department)}</PersonRole>
          <PersonName>{data.name}</PersonName>
          {lifeSummary && <LifeSummary>{lifeSummary}</LifeSummary>}
          {data.biography && <PersonBiography biography={getBiographyText(data)} />}
          {knownFor.length > 0 &&
            <PersonStats>
              <DetailStats stats={stats} columns={STATS_COLUMNS} />
            </PersonStats>
          }
        </PersonInfo>
      </PersonHero>
      {knownFor.length > 0 &&
        <DetailSection title="Known for">
          <MediaCarousel items={knownFor} />
        </DetailSection>
      }
      {filmography.length > 0 &&
        <PersonFilmography credits={filmography} mainDepartment={data.known_for_department} />
      }
    </PersonWrapper>
  );
};

export default PersonDetails;
