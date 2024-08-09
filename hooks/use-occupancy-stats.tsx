import { useCallback, useEffect, useState } from "react";
import { OccupancyStats, SurfLocation } from "@/types";
import dayjs from "dayjs";
import { useVoteSubscription } from "@/hooks/use-vote-subscription";

const GET_OCCUPANCY_STATS_URL = `${process.env.NEXT_PUBLIC_REST_ENDPOINT ?? "http://localhost:8080/api"}/occupancy-stats`;

export const useOccupancyStats = (location: SurfLocation) => {
  const [occupancyStats, setOccupancyStats] = useState<OccupancyStats>();
  const [occupancyStatsLoading, setOccupancyStatsLoading] = useState(true);

  const fetchOccupancyStats = useCallback(() => {
    const now = dayjs();
    const getOccupancyStatsUrl = new URL(GET_OCCUPANCY_STATS_URL);
    getOccupancyStatsUrl.searchParams.append(
      "start",
      now.subtract(1, "hour").toISOString(),
    );
    getOccupancyStatsUrl.searchParams.append("end", now.toISOString());
    getOccupancyStatsUrl.searchParams.append("location", location);
    setOccupancyStatsLoading(true);

    fetch(getOccupancyStatsUrl)
      .then((res) => res.json())
      .then((data) => {
        setOccupancyStats({
          ...data,
          start: dayjs(data.start),
          end: dayjs(data.end),
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setOccupancyStatsLoading(false));
  }, []);

  useEffect(() => {
    fetchOccupancyStats();
  }, []);

  useVoteSubscription({
    location,
    onVoteReceived: (vote) => {
      // refetch occupancy stats
      fetchOccupancyStats();
    },
  });

  return { data: occupancyStats, loading: occupancyStatsLoading };
};
