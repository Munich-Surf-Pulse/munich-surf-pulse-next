import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStatistics } from "@/hooks/use-statistics";
import { SurfLocation } from "@/types";
import { VoteStatisticsLocales } from "@/components/votes/types";
import { HeartCrack } from "lucide-react";
import { NoDataWrapper } from "@/components/layout/NoDataWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoteStatisticsProps {
  locales: VoteStatisticsLocales;
  location?: SurfLocation;
}

export const VoteStatistics: FC<VoteStatisticsProps> = ({
  locales,
  location,
}) => {
  const {
    totalCount,
    title,
    empty,
    dayOfWeekMap,
    averageVotesPerDay,
    leastCrowded,
    mostCrowded,
    description,
    avg,
  } = locales;

  const { data, loading } = useStatistics(location);

  const descriptionText = location ? `${location} ${description}` : description;

  const elements: Omit<VoteStatisticElementProps, "empty">[] = [
    {
      content: data?.averageVotesPerDay
        ? data.averageVotesPerDay.toFixed(2)
        : undefined,
      title: averageVotesPerDay,
    },
    {
      content: data?.totalCount,
      title: totalCount,
    },
    {
      content: data?.leastCrowdedDay?.dayOfWeek
        ? dayOfWeekMap.get(data.leastCrowdedDay.dayOfWeek)
        : undefined,
      title: leastCrowded,
      tooltip: `${avg} ${data?.leastCrowdedDay?.average}`,
    },
    {
      content: data?.mostCrowdedDay?.dayOfWeek
        ? dayOfWeekMap.get(data.mostCrowdedDay.dayOfWeek)
        : undefined,
      title: mostCrowded,
      tooltip: `${avg} ${data?.mostCrowdedDay?.average}`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent>
        <NoDataWrapper noDataText={empty} noData={!loading && !data}>
          <div
            className={
              "grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 divide-x"
            }
          >
            {elements.map((element, index) => (
              <VoteStatisticElement key={index} empty={empty} {...element} />
            ))}
          </div>
        </NoDataWrapper>
      </CardContent>
    </Card>
  );
};

interface VoteStatisticElementProps {
  content?: React.ReactNode;
  title: string;
  tooltip?: string;
  empty: string;
}

const VoteStatisticElement: FC<VoteStatisticElementProps> = ({
  content,
  title,
  tooltip,
  empty,
}) => {
  return (
    <div className={"flex flex-col gap-2 items-center"}>
      <div className={"text-3xl flex"}>
        {content ? (
          tooltip ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={"text-3xl flex cursor-pointer"}>
                    {content}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            content
          )
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HeartCrack className={"inline w-12 h-12 text-gray-600"} />
              </TooltipTrigger>
              <TooltipContent>{empty}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className={"text-center text-sm text-gray-600"}>{title}</div>
    </div>
  );
};
