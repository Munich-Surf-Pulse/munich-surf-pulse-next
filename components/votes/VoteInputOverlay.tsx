"use client";

import * as React from "react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DividerWithText } from "@/components/common/DividerWithText";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import dayjs from "dayjs";
import { VoteInputProps } from "@/components/votes/types";

const quickSelections = [5, 10, 20, 30];

const MIN_VOTE = 0;
const MAX_VOTE = 40;

interface VoteInputOverlayProps extends VoteInputProps {
  open: boolean;
  onClose: () => void;
  setLatestVote: (unitSeconds: number | undefined) => void;
  children: React.ReactNode;
}

export function VoteInputOverlay({
  location,
  locales,
  setLatestVote,
  open,
  onClose,
  children,
}: VoteInputOverlayProps) {
  const { content, voteToast, countdown, title, submitText, placeholderText } =
    locales;

  const [value, setValue] = useState<number>();

  const submitVote = useCallback((value: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/vote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: value,
        location,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Reset the state
          setLatestVote(dayjs().unix());
          setValue(undefined);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          return data as { timestamp: string };
        }
        return undefined;
      });
  }, []);

  const handleVoteCreated = (vote: { timestamp: string } | undefined) => {
    if (vote) {
      toast(voteToast.title, {
        description: dayjs(vote.timestamp).format("DD.MM.YYYY HH:mm"),
      });
      onClose();
    }
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{locales.title}</DrawerTitle>
            <DrawerDescription>{locales.description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className={"w-full flex flex-col gap-4"}>
              <div className={"flex justify-between gap-4"}>
                {quickSelections.map((quickSelection) => (
                  <Button
                    key={quickSelection}
                    variant={"outline"}
                    className={"w-full"}
                    onClick={() =>
                      submitVote(quickSelection).then(handleVoteCreated)
                    }
                  >
                    {quickSelection}
                  </Button>
                ))}
              </div>
              <DividerWithText text={"OR"} />
              <div className={"flex flex-col gap-4"}>
                <Input
                  placeholder={placeholderText}
                  type={"number"}
                  inputMode="numeric"
                  min={MIN_VOTE}
                  max={MAX_VOTE}
                  value={value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v.length === 0) {
                      setValue(undefined);
                    } else {
                      const value = Number(v);
                      if (value >= MIN_VOTE && value <= MAX_VOTE) {
                        setValue(value);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                if (value) {
                  submitVote(value).then(handleVoteCreated);
                }
              }}
              disabled={!value || value >= MAX_VOTE || value <= MIN_VOTE}
            >
              {submitText}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>
                {locales.cancelText}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
