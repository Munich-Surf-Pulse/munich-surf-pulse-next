import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "About",
  description: "About Munich Surf Pulse",
};

const AboutLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

export default AboutLayout;
