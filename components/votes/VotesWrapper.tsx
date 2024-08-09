"use client";

import React, { FC } from "react";
import OccupancyChart from "@/components/votes/OccupancyChart";
import { CurrentVote } from "@/components/votes/CurrentVote";
import { VoteInput } from "@/components/votes/VoteInput";
import {
  ComingSoonCardLocales,
  CurrentVoteLocales,
  DayOfWeekChartLocales,
  OccupancyChartLocales,
  VoteInputLocales,
  VoteStatisticsLocales,
} from "@/components/votes/types";
import { VoteStatistics } from "@/components/votes/VoteStatistics";
import { OccupancyClassification, SurfLocation } from "@/types";
import { ComingSoon } from "@/components/common/ComingSoon";
import { DayOfWeekChart } from "@/components/votes/DayOfWeekChart";

interface VotesWrapperProps {
  location: SurfLocation;
  classifications: OccupancyClassification[];
  locales: {
    currentVoteLocales: CurrentVoteLocales;
    occupancyChartLocales: OccupancyChartLocales;
    voteInputLocales: VoteInputLocales;
    voteStatisticsLocales: VoteStatisticsLocales;
    comingSoonCardLocales: ComingSoonCardLocales;
    dayOfWeekChartLocales: DayOfWeekChartLocales;
  };
}

export const VotesWrapper: FC<VotesWrapperProps> = ({
  location,
  locales,
  classifications,
}) => {
  const { currentVoteLocales, occupancyChartLocales, dayOfWeekChartLocales } =
    locales;

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <VoteInput location={location} locales={locales.voteInputLocales} />
        <CurrentVote
          location={location}
          locales={currentVoteLocales}
          classifications={classifications}
        />
      </div>
      <div className={"flex flex-col gap-4"}>
        <OccupancyChart location={location} locales={occupancyChartLocales} />
        <DayOfWeekChart location={location} locales={dayOfWeekChartLocales} />
      </div>
      <div className={"grid grid-cols-1 gap-4"}>
        <VoteStatistics
          locales={locales.voteStatisticsLocales}
          location={location}
        />
        <ComingSoon locales={locales.comingSoonCardLocales} />
      </div>
    </div>
  );
};
