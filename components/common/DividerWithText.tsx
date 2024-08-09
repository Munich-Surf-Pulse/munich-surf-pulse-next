import { FC } from "react";

export const DividerWithText: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative flex py-2 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};
