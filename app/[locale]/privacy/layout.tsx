import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy",
};

const PrivacyLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

export default PrivacyLayout;
