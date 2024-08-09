import { Dayjs } from "dayjs";

export enum SurfLocation {
  E1 = "E1",
  E2 = "E2",
}

export interface Vote {
  id: string;
  count: number;
  unixTimestamp: number;
}

export interface OccupancyStats {
  start: Dayjs;
  end: Dayjs;
  location: SurfLocation;
  averageVote: number;
  maxVote: number;
  minVote: number;
  count: number;
}

export interface OccupancyClassification {
  key: string;
  upperLimit: number;
  label: string;
  color: string;
}

export interface Route {
  nameKey: string;
  path: string;
  visibleInHeader?: boolean;
  primary?: boolean;
}

export interface ResolvedRoute {
  name: string;
  path: string;
  visibleInHeader?: boolean;
  primary?: boolean;
}
