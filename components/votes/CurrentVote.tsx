"use client";

import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OccupancyClassification, SurfLocation } from "@/types";
import { CurrentVoteLocales } from "@/components/votes/types";
import { Skeleton } from "@/components/ui/skeleton";
import { NoDataWrapper } from "@/components/layout/NoDataWrapper";
import { useOccupancyStats } from "@/hooks/use-occupancy-stats";
import { VoteGauge } from "@/components/votes/VoteGauge";

interface CurrentVoteProps {
  location: SurfLocation;
  locales: CurrentVoteLocales;
  classifications: OccupancyClassification[];
}

export const CurrentVote: FC<CurrentVoteProps> = ({
  location,
  locales,
  classifications,
}) => {
  const {
    title,
    avgCountText,
    maxCountText,
    minCountText,
    countsText,
    emptyText,
  } = locales;

  const { data, loading } = useOccupancyStats(location);

  const avgCount = Number(data?.averageVote?.toFixed(2));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {loading ? (
            <Skeleton className="h-4 w-full" />
          ) : data?.start && data?.end ? (
            `${data.start.format("DD.MM.YYYY HH:mm")} - ${data.end.format("DD.MM.YYYY HH:mm")}`
          ) : (
            "-"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NoDataWrapper noDataText={emptyText} noData={!loading && !data}>
          <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col gap-4"}>
              {loading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <div>
                  <div className={"flex justify-between"}>
                    <div>
                      <div className={"text-xl"}>
                        {avgCountText}: {avgCount ?? "-"}
                      </div>
                      <div className={"text-gray-400"}>
                        {countsText}: {data?.count ?? "-"}
                      </div>
                    </div>
                    <div className={"text-gray-600"}>
                      <div>
                        {minCountText}: {data?.minVote ?? "-"}
                      </div>
                      <div>
                        {maxCountText}: {data?.maxVote ?? "-"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <VoteGauge
              loading={loading}
              classifications={classifications}
              value={avgCount}
            />
          </div>
        </NoDataWrapper>
      </CardContent>
    </Card>
  );
};
