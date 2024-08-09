import React, { FC } from "react";
import { Drum } from "lucide-react";
import { ComingSoonCardLocales } from "@/components/votes/types";

interface ComingSoonProps {
  locales: ComingSoonCardLocales;
}

export const ComingSoon: FC<ComingSoonProps> = ({ locales }) => {
  const { title, stayTunedText } = locales;
  return (
    <div className={"flex items-center gap-3 mt-8"}>
      <Drum className={"w-8 h-8"} />
      <div className={"text-gray-600"}>{stayTunedText}</div>
    </div>
  );
};
