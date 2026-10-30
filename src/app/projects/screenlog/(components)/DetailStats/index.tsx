import { DetailStat } from "../../(helpers)/mediaDetails";
import { StatCard, StatLabel, StatsGrid, StatSub, StatValue } from "./style";

interface DetailStatsProps {
  stats: DetailStat[];
  columns?: number;
}

const DetailStats = ({ stats, columns = 2 }: DetailStatsProps) => (
  <StatsGrid columnCount={columns}>
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
