import React from "react";
import { NextPage } from "next";
import { VotesWrapper } from "@/components/votes/VotesWrapper";
import { getI18n } from "@/locales/server";
import { OccupancyClassification, SurfLocation } from "@/types";
import { DayOfWeek } from "@/components/votes/types";

const LocationPage: NextPage<{ params: { location: SurfLocation } }> = async ({
  params,
}) => {
  const t = await getI18n();

  const { location } = params;

  const occupancyClassifications: OccupancyClassification[] = [
    {
      key: "low",
      label: t("occupancy-chart.occupancy-classification.low"),
      upperLimit: 5,
      color: "#f5f5f5",
    },
    {
      key: "ok",
      label: t("occupancy-chart.occupancy-classification.ok"),
      upperLimit: 10,
      color: "#d9d9d9",
    },
    {
      key: "fair",
      label: t("occupancy-chart.occupancy-classification.fair"),
      upperLimit: 15,
      color: "#838383",
    },
    {
      key: "crowded",
      label: t("occupancy-chart.occupancy-classification.crowded"),
      upperLimit: 20,
      color: "#4a4a4a",
    },
    {
      key: "over-crowded",
      label: t("occupancy-chart.occupancy-classification.over-crowded"),
      upperLimit: 30,
      color: "#111111",
    },
  ];

  const dayOfWeekMap = new Map([
    [DayOfWeek.MONDAY, t("dayOfWeek.monday")],
    [DayOfWeek.TUESDAY, t("dayOfWeek.tuesday")],
    [DayOfWeek.WEDNESDAY, t("dayOfWeek.wednesday")],
    [DayOfWeek.THURSDAY, t("dayOfWeek.thursday")],
    [DayOfWeek.FRIDAY, t("dayOfWeek.friday")],
    [DayOfWeek.SATURDAY, t("dayOfWeek.saturday")],
    [DayOfWeek.SUNDAY, t("dayOfWeek.sunday")],
  ]);

  return (
    <div
      className={
        "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      }
    >
      <div className={"flex flex-col gap-8"}>
        <h1 className={"text-2xl"}>
          {/* @ts-ignore */}
          {t(`${location}.title`)}{" "}
          <span className={"text-gray-600"}>
            • {t(`${location}.description-short`)}
          </span>
        </h1>
        <p className={"text-gray-600"}>{t(`${location}.description`)}</p>
        <VotesWrapper
          classifications={occupancyClassifications}
          location={location}
          locales={{
            voteInputLocales: {
              title: t("vote-input.title"),
              description: t("vote-input.content.description"),
              voteToast: {
                title: t("vote-toast.vote-created"),
              },
              content: {
                title: t("vote-input.content.title"),
                content: t("vote-input.content.content"),
              },
              submitText: t("actions.submit"),
              cancelText: t("actions.cancel"),
              voteText: t("actions.vote"),
              placeholderText: t("placeholder"),
              countdown: {
                title: t("countdown.title"),
                additionalText: t("countdown.additional"),
              },
            },
            occupancyChartLocales: {
              title: t("occupancy-chart.title"),
              past24h: t("occupancy-chart.past-24h"),
              actions: { prev: t("actions.prev"), next: t("actions.next") },
              surfers: t("surfers"),
              emptyText: t("empty"),
            },
            currentVoteLocales: {
              avgCountText: t("current-vote.avg-count"),
              maxCountText: t("current-vote.max-count"),
              minCountText: t("current-vote.min-count"),
              countsText: t("current-vote.number-counts"),
              title: t("current-vote.title"),
              emptyText: t("empty"),
            },
            voteStatisticsLocales: {
              title: t("statistics.title"),
              description: t("statistics.description"),
              totalCount: t("statistics.total-count"),
              empty: t("empty"),
              dayOfWeekMap,
              averageVotesPerDay: t("statistics.average-votes-per-day"),
              leastCrowded: t("statistics.least-crowded"),
              mostCrowded: t("statistics.most-crowded"),
              avg: t("day-of-week-chart.avg"),
            },
            comingSoonCardLocales: {
              title: t("coming-soon.title"),
              stayTunedText: t("coming-soon.stay-tuned"),
            },
            dayOfWeekChartLocales: {
              title: t("day-of-week-chart.title"),
              description: t("day-of-week-chart.description"),
              min: t("day-of-week-chart.min"),
              max: t("day-of-week-chart.max"),
              avg: t("day-of-week-chart.avg"),
              dayOfWeekMap,
            },
          }}
        />
      </div>
    </div>
  );
};

export default LocationPage;
