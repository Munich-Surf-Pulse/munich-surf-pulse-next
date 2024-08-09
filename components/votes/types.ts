import { SurfLocation } from "@/types";

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface DayOfWeekStats {
  dayOfWeek: DayOfWeek;
  average: number;
  max: number;
  min: number;
}

export interface CurrentVoteLocales {
  title: string;
  emptyText: string;
  avgCountText: string;
  maxCountText: string;
  minCountText: string;
  countsText: string;
}

export interface OccupancyChartLocales {
  title: string;
  surfers: string;
  past24h: string;
  emptyText: string;
  actions: {
    next: string;
    prev: string;
  };
}

export interface VoteInputLocales {
  title: string;
  submitText: string;
  cancelText: string;
  voteText: string;
  placeholderText: string;
  description: string;
  content: {
    title: string;
    content: string;
  };
  voteToast: {
    title: string;
  };
  countdown: {
    title: string;
    additionalText: string;
  };
}

export interface VoteInputProps {
  location: SurfLocation;
  locales: VoteInputLocales;
}

export interface Statistics {
  totalCount: number;
  averageVotesPerDay: number;
  dayOfWeekStats: DayOfWeekStats[];
  leastCrowdedDay: { dayOfWeek: DayOfWeek; average: number } | null;
  mostCrowdedDay: { dayOfWeek: DayOfWeek; average: number } | null;
}

export interface ComingSoonCardLocales {
  title: string;
  stayTunedText: string;
}

export interface DayOfWeekChartLocales {
  title: string;
  description: string;
  avg: string;
  min: string;
  max: string;
  dayOfWeekMap: Map<DayOfWeek, string>;
}

export interface VoteStatisticsLocales {
  title: string;
  description: string;
  totalCount: string;
  empty: string;
  dayOfWeekMap: Map<DayOfWeek, string>;
  leastCrowded: string;
  mostCrowded: string;
  averageVotesPerDay: string;
  avg: string;
}
