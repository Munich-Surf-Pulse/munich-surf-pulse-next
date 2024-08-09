import { useCallback, useEffect, useMemo, useState } from "react";
import { SurfLocation, Vote } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import { useVoteSubscription } from "@/hooks/use-vote-subscription";

const OCCUPANCY_URL = `${process.env.NEXT_PUBLIC_REST_ENDPOINT}/occupancy`;

export const useVotes = (location: SurfLocation) => {
  const [date, setDate] = useState(() => dayjs());

  const dateRange: [Dayjs, Dayjs] = useMemo(
    () => [date.subtract(24, "hours"), date],
    [date],
  );

  const [votes, setVotes] = useState<Vote[]>();

  const [occupancyLoading, setOccupancyLoading] = useState(true);

  const fetchVotes = useCallback(() => {
    const getVotesUrl = new URL(OCCUPANCY_URL);
    getVotesUrl.searchParams.append("start", dateRange[0].toISOString());
    getVotesUrl.searchParams.append("end", dateRange[1].toISOString());
    getVotesUrl.searchParams.append("location", location);
    setOccupancyLoading(true);

    fetch(getVotesUrl)
      .then((res) => res.json())
      .then((data) => {
        const cleanVotes = data
          .map((d: any) => ({
            ...d,
            unixTimestamp: dayjs(d.timestamp).unix(),
          }))
          .sort((a: Vote, b: Vote) => a.unixTimestamp - b.unixTimestamp);

        setVotes(cleanVotes);
      })
      .catch((err) => console.error(err))
      .finally(() => setOccupancyLoading(false));
  }, [dateRange]);

  useEffect(() => {
    fetchVotes();
  }, [dateRange]);

  useVoteSubscription({
    location,
    onVoteReceived: (vote) => {
      setVotes((old) => [...(old ?? []), vote]);
    },
  });

  return {
    data: votes,
    loading: occupancyLoading,
    date,
    setDate,
  };
};
