import { useCallback, useEffect, useState } from "react";
import {
  DayOfWeek,
  DayOfWeekStats,
  Statistics,
} from "@/components/votes/types";
import { SurfLocation } from "@/types";
import { useVoteSubscription } from "@/hooks/use-vote-subscription";
import { DayOfWeekMap } from "@/components/votes/helpers";

const GET_STATISTICS_URL = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}/statistics`;

function findHighestAndLowestAvg(stats: DayOfWeekStats[]): {
  highest: DayOfWeekStats | null;
  lowest: DayOfWeekStats | null;
} {
  if (stats.length === 0) {
    return { highest: null, lowest: null };
  }

  let highest: DayOfWeekStats = stats[0];
  let lowest: DayOfWeekStats = stats[0];

  for (let i = 1; i < stats.length; i++) {
    if (stats[i].average > highest.average) {
      highest = stats[i];
    }
    if (stats[i].average < lowest.average) {
      lowest = stats[i];
    }
  }

  return { highest, lowest };
}

export const useStatistics = (location?: SurfLocation) => {
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState<boolean>(false);

  const fetchStatistics = useCallback(() => {
    const getOccupancyStatsUrl = new URL(GET_STATISTICS_URL);
    if (location) {
      getOccupancyStatsUrl.searchParams.append("location", location);
    }
    setStatisticsLoading(true);

    fetch(getOccupancyStatsUrl)
      .then((res) => res.json())
      .then((data) => {
        const dayOfWeekStats = Object.keys(DayOfWeek).map((dayOfWeek) => {
          const value = data.dayOfWeekStats.find(
            (entry: { dayOfWeek: number }) =>
              DayOfWeekMap.get(entry.dayOfWeek as number) === dayOfWeek,
          );

          if (value) {
            return { ...value, dayOfWeek };
          }
          return { dayOfWeek, average: 0, min: 0, max: 0 };
        });

        const { highest, lowest } = findHighestAndLowestAvg(dayOfWeekStats);

        const statistics: Statistics = {
          ...data,
          dayOfWeekStats,
          mostCrowdedDay: highest,
          leastCrowdedDay: lowest,
        };

        setStatistics(statistics);
      })
      .catch((err) => console.error(err))
      .finally(() => setStatisticsLoading(false));
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, []);

  useVoteSubscription({
    location,
    onVoteReceived: (vote) => {
      // refetch
      fetchStatistics();
    },
  });

  return {
    data: statistics,
    loading: statisticsLoading,
  };
};
