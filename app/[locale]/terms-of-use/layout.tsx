import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use of Munich Surf Pulse",
};

const TermsOfUseLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

export default TermsOfUseLayout;
