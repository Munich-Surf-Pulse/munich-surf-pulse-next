"use client";

import React, { FC } from "react";
import { SurfLocation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVotes } from "@/hooks/use-votes";
import dayjs from "dayjs";
import { HeartCrack } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationCardProps {
  locales: {
    title: string;
    description: string;
    noData: string;
    currently: string;
  };
  location: SurfLocation;
}

export const LocationCard: FC<LocationCardProps> = ({ location, locales }) => {
  const { title, description, noData, currently } = locales;

  const { data, loading } = useVotes(location);

  const lastMeasurement = data?.[data.length - 1];

  return (
    <a href={`/${location}`}>
      <Card>
        <CardContent
          className={"py-4 flex  justify-between items-center min-h-[120px]"}
        >
          <div className={"flex flex-col gap-3"}>
            <h3 className={"text-2xl"}>{title}</h3>
            <h3 className={"text-gray-600"}>{description}</h3>
          </div>
          <hr className={"inline md:hidden"} />
          {loading ? (
            <div className={"flex flex-col gap-2 items-center"}>
              <Skeleton className={"w-[50px] h-10"} />
              <Skeleton className={"w-[120px] h-5"} />
            </div>
          ) : (
            <div className={"min-w-32 flex items-center"}>
              {lastMeasurement ? (
                <div className={"w-full flex flex-col gap-2 items-center"}>
                  <div className={"text-sm text-gray-600"}>{currently}</div>
                  <div className={"text-2xl font-bold"}>
                    {lastMeasurement?.count ?? "-"}
                  </div>
                  <div className={"text-xs text-gray-600"}>
                    {dayjs
                      .unix(lastMeasurement?.unixTimestamp)
                      .format("DD.MM.YYYY HH:mm") ?? "-"}
                  </div>
                </div>
              ) : (
                <div className={"w-full text-center"}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HeartCrack
                          className={"inline w-8 h-8 text-gray-600"}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{noData}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  );
};
