import { DetailStat } from "../../(helpers)/mediaDetails";
import { StatCard, StatLabel, StatsGrid, StatSub, StatValue } from "./style";

interface DetailStatsProps {
  stats: DetailStat[];
}

const DetailStats = ({ stats }: DetailStatsProps) => (
  <StatsGrid>
    {stats.map(({ label, value, sub }) => (
      <StatCard key={label}>
        <StatLabel>{label}</StatLabel>
        <StatValue>{value}</StatValue>
        {sub && <StatSub>{sub}</StatSub>}
      </StatCard>
    ))}
  </StatsGrid>
);

export default DetailStats;
