"use client";

import React, { FC, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LATEST_VOTE_TIMESTAMP_KEY } from "@/constants";
import { VoteInputProps } from "@/components/votes/types";
import usePersistedState from "@/hooks/use-persisted-state";
import dayjs from "dayjs";
import { CountdownTimer } from "@/components/votes/CountdownTimer";
import { CircleCheckBig, Tally5 } from "lucide-react";
import { VoteInputOverlay } from "@/components/votes/VoteInputOverlay";
import { Button } from "@/components/ui/button";

const REPEATED_VOTE_WAITING_TIME_MINUTES = 5;

export const VoteInput: FC<VoteInputProps> = ({ location, locales }) => {
  const { content, voteToast, countdown, title, submitText, placeholderText } =
    locales;

  const [overlayOpen, setOverlayOpen] = useState(false);

  const [latestVote, setLatestVote] = usePersistedState<number | undefined>(
    LATEST_VOTE_TIMESTAMP_KEY,
    undefined,
  );

  const countdownEndTime = useMemo(() => {
    if (!latestVote) {
      return undefined;
    }

    const ret = dayjs
      .unix(latestVote)
      .add(REPEATED_VOTE_WAITING_TIME_MINUTES, "minutes");

    if (ret.isBefore(dayjs())) {
      return undefined;
    }

    return ret;
  }, [latestVote]);

  return (
    <Card id={"vote"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"relative"}>
          <div className={"flex flex-col gap-2"}>
            <div className={"w-full md:justify-center hidden md:flex"}>
              <Tally5 className={"w-16 h-16 my-0 md:my-4"} />
            </div>
            <hr className={"my-4"} />
            <div className={"text-gray-800 font-bold"}>{content.title}</div>
            <div className={"text-gray-500"}>{content.content}</div>
          </div>
          {countdownEndTime && (
            <div
              className={
                "w-full h-full flex flex-col items-center justify-center gap-4 absolute top-0 left-0 backdrop-blur-sm bg-white/80"
              }
            >
              <CircleCheckBig className={"w-20 h-20"} />
              <div className={"text-2xl"}>{countdown.title}</div>
              <div className={"text-gray-600 text-xl"}>
                <CountdownTimer
                  endDate={countdownEndTime}
                  onCountdownComplete={() => setLatestVote(undefined)}
                />
              </div>
              <div className={"text-gray-600"}>{countdown.additionalText}</div>
            </div>
          )}
        </div>
      </CardContent>
      {!countdownEndTime && (
        <CardFooter>
          <VoteInputOverlay
            open={overlayOpen}
            onClose={() => setOverlayOpen(false)}
            locales={locales}
            location={location}
            setLatestVote={setLatestVote}
          >
            <Button onClick={() => setOverlayOpen(true)} className={"w-full"}>
              {locales.voteText}
            </Button>
          </VoteInputOverlay>
        </CardFooter>
      )}
    </Card>
  );
};
