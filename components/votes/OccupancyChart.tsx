import React, { FC, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import dayjs, { Dayjs } from "dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurfLocation } from "@/types";
import { Button } from "@/components/ui/button";
import { OccupancyChartLocales } from "@/components/votes/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePicker } from "@/components/common/DatePicker";
import { NoDataWrapper } from "@/components/layout/NoDataWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVotes } from "@/hooks/use-votes";

const formatXAxis = (label: number) => {
  return dayjs.unix(label).format("HH:mm");
};

const getTicks = (initialDateUnix: number, hourStepSize: number): number[] => {
  return Array.from(Array(24 / hourStepSize)).map((_, i) => {
    return (
      dayjs.unix(initialDateUnix).set("minute", 0).set("seconds", 0).unix() +
      i * hourStepSize * 60 * 60
    );
  });
};

interface OccupancyChartProps {
  location: SurfLocation;
  locales: OccupancyChartLocales;
}

const OccupancyChart: FC<OccupancyChartProps> = ({ location, locales }) => {
  const { surfers, title, actions, emptyText, past24h } = locales;

  const { data: votes, loading, date, setDate } = useVotes(location);

  const dateRange: [Dayjs, Dayjs] = useMemo(
    () => [date.subtract(24, "hours"), date],
    [date],
  );

  const data = useMemo(
    () =>
      votes?.map((vote) => {
        const ret = { ...vote };
        // @ts-ignore
        ret[surfers] = vote.count;
        return ret;
      }) ?? [],
    [votes],
  );

  const maxValue = useMemo(
    () => Math.max(...data?.map((entry) => entry.count)),
    [data],
  );

  const domain = useMemo(
    () => [dateRange[0].unix(), dateRange[1].unix()],
    [dateRange],
  );

  const ticks = useMemo(() => getTicks(domain[0], 2), [domain[0]]);

  const isPast24h = date.isSame(dayjs(), "date");

  const titleAddition = isPast24h
    ? past24h
    : `${dateRange[0].format("DD.MM.YY HH:mm")} - ${dateRange[1].format("DD.MM.YY HH:mm")}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{titleAddition}</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className={"h-[200px] w-full"} />
        ) : (
          <div className={"flex flex-col gap-4"}>
            <div className={"h-[200px] w-full"}>
              <NoDataWrapper
                noDataText={emptyText}
                noData={!loading && !data?.length}
              >
                <ChartContainer
                  className={"h-[200px] w-full"}
                  config={{
                    count: {
                      label: surfers,
                    },
                  }}
                >
                  <AreaChart data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      ticks={ticks}
                      type={"number"}
                      dataKey="unixTimestamp"
                      tickFormatter={formatXAxis}
                      domain={domain}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          indicator="line"
                          labelFormatter={(label, payload) => {
                            const timestamp = payload[0].payload
                              ?.unixTimestamp as number;
                            if (timestamp) {
                              return (
                                <span>
                                  {dayjs
                                    .unix(timestamp)
                                    .format("DD.MM.YYYY HH:mm")}
                                </span>
                              );
                            }
                            return "?";
                          }}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey={surfers}
                      stroke={"#212121"}
                      fill={"#999999"}
                    />
                  </AreaChart>
                </ChartContainer>
              </NoDataWrapper>
            </div>
            <div className={"flex justify-between items-center"}>
              <Button
                variant={"ghost"}
                onClick={() => setDate((old) => old.subtract(1, "day"))}
              >
                <ChevronLeft /> {actions.prev}
              </Button>
              <DatePicker
                disabledDate={(date) => date.isAfter(dayjs(), "date")}
                date={date}
                setDate={(value) => {
                  const now = dayjs();
                  let date = (value ?? now)
                    .set("hour", now.hour())
                    .set("minute", now.minute());

                  setDate(date);
                }}
              />
              <Button
                variant={"ghost"}
                disabled={date.isSame(dayjs(), "date")}
                onClick={() => setDate((old) => old.add(1, "day"))}
              >
                {actions.next} <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
