"use client";

import React, { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { OccupancyClassification } from "@/types";
import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

interface VoteGaugeProps {
  loading: boolean;
  value: number | undefined;
  classifications: OccupancyClassification[];
}

export const VoteGauge: FC<VoteGaugeProps> = ({
  loading,
  value,
  classifications,
}) => {
  return loading ? (
    <Skeleton
      className="h-[230px] w-full
            rounded-tl-full rounded-tr-full"
    />
  ) : (
    <GaugeComponent
      type="semicircle"
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        subArcs: classifications.map((classification) => ({
          limit: classification.upperLimit,
          color: classification.color,
          showTick: true,
          tooltip: { text: classification.label },
        })),
      }}
      pointer={{
        color: "#8f8f8f",
        length: 0.8,
        width: 15,
      }}
      labels={{
        tickLabels: {
          type: "outer",
        },
        valueLabel: {
          style: {
            fontWeight: "lighter",
            fill: "black",
            outline: "none",
          },
        },
      }}
      value={value ?? 0}
      minValue={0}
      maxValue={35}
    />
  );
};
