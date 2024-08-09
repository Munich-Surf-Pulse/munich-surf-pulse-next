"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Languages } from "lucide-react";

export const LanguageSwitcher: FC = () => {
  const router = useRouter();

  const languages: { text: string; lang: string }[] = [
    {
      text: "German",
      lang: "de",
    },
    {
      text: "English",
      lang: "en",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Languages className={"cursor-pointer mt-8"} />
      </PopoverTrigger>
      <PopoverContent className="w-40">
        {languages.map((language) => (
          <div
            onClick={() => router.push(`/${language.lang}`)}
            key={language.lang}
            className={"rounded hover:bg-gray-400 p-2 cursor-pointer"}
          >
            {language.text}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
