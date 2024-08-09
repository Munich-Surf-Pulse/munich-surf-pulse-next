import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { getI18n } from "@/locales/server";
import { Route } from "@/types";
import CookieConsentProvider from "@/providers/CookieConsentProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Munich Surf Pulse",
  description:
    "Real time occupancy for river surfing sites in and around Munich",
};

const routes: Route[] = [
  {
    nameKey: "home",
    path: "/",
    visibleInHeader: true,
  },
  {
    nameKey: "locations",
    path: "/#locations",
    visibleInHeader: true,
  },
  {
    nameKey: "about",
    path: "/about",
    visibleInHeader: true,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getI18n();

  const resolvedRoutes = routes.map((route) => ({
    ...route,
    // @ts-ignore
    name: t(`navigation.${route.nameKey}`),
  }));

  return (
    <html>
      <body className={inter.className}>
        <Header
          routes={resolvedRoutes.filter((route) => route.visibleInHeader)}
        />
        <main className={"mt-[60px] py-8 bg-pageBg"}>{children}</main>
        <Footer routes={resolvedRoutes} />
        <Toaster />
        <CookieConsentProvider />
      </body>
    </html>
  );
}
