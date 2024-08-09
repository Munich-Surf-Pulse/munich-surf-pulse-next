import React, { FC } from "react";
import { HeartCrack } from "lucide-react";

interface NoDataWrapperProps {
  children: React.ReactNode;
  noDataText: string;
  noData: boolean;
}

export const NoDataWrapper: FC<NoDataWrapperProps> = ({
  children,
  noData,
  noDataText,
}) => {
  return (
    <div className={"relative"}>
      {children}
      {noData && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-white/40 flex flex-col gap-4 justify-center items-center text-3xl"
          }
        >
          <HeartCrack className={"h-20 w-20 text-gray-600"} />
          {noDataText}
        </div>
      )}
    </div>
  );
};
