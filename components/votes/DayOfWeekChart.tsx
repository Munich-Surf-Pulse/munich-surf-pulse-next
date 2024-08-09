import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { SurfLocation } from "@/types";
import { useStatistics } from "@/hooks/use-statistics";
import { DayOfWeek, DayOfWeekChartLocales } from "@/components/votes/types";
import { Skeleton } from "@/components/ui/skeleton";

interface DayOfWeekChartProps {
  location: SurfLocation;
  locales: DayOfWeekChartLocales;
}

export const DayOfWeekChart: FC<DayOfWeekChartProps> = ({
  location,
  locales,
}) => {
  const { data, loading } = useStatistics(location);

  const { dayOfWeekMap, min, max, title, avg, description } = locales;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className={"h-[200px] w-full"} />
        ) : (
          <ChartContainer
            className={"h-[200px] w-full"}
            config={{
              min: {
                label: min,
              },
              max: {
                label: max,
              },
              average: {
                label: avg,
              },
            }}
          >
            <BarChart
              width={500}
              height={300}
              data={data?.dayOfWeekStats ?? []}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="dayOfWeek"
                tickFormatter={(tick) =>
                  dayOfWeekMap.get(tick as DayOfWeek) ?? ""
                }
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(label) =>
                      dayOfWeekMap.get(label as DayOfWeek)
                    }
                  />
                }
              />
              <Bar dataKey="average" fill={"#1f1f1f"} />
              <Bar dataKey="min" fill={"#6b6b6b"} />
              <Bar dataKey="max" fill={"#aeaeae"} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
