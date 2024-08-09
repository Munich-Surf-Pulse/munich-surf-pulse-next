"use client";

import * as React from "react";
import { Dispatch, FC, SetStateAction } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  date: Dayjs | undefined;
  setDate: (value: Dayjs | undefined) => void;
  disabledDate?: (date: Dayjs) => boolean;
  placeholder?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  date,
  setDate,
  disabledDate,
  placeholder = "Pick a date",
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.format("DD.MM.YYYY") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          disabled={
            disabledDate ? (date) => disabledDate?.(dayjs(date)) : undefined
          }
          selected={date?.toDate()}
          onSelect={(value) => setDate(dayjs(value))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
