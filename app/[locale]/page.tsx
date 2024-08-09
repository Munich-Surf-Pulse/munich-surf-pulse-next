import { getI18n } from "@/locales/server";
import React from "react";
import { SurfLocation } from "@/types";
import { LocationCard } from "@/components/votes/LocationCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Drum, PartyPopper } from "lucide-react";

export default async function Home() {
  const t = await getI18n();

  return (
    <div className="flex flex-col items-center">
      <div
        className={
          "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        }
      >
        <div className={"flex flex-col gap-10 pb-8"}>
          <h1 className={"text-3xl"}>Munich Surf Pulse</h1>

          <section className={"flex flex-col gap-4"}>
            <h2 className={"text-2xl text-gray-600"}>{t("home.s1.title")}</h2>
            <p>{t("home.s1.p1")}</p>
            <p>{t("home.s1.p2")}</p>
          </section>
          <hr />
          <div
            id={"locations"}
            className={"grid grid-cols-1 md:grid-cols-1 gap-4"}
          >
            <h2 className={"text-2xl text-gray-600"}>{t("home.s2.title")}</h2>

            {Object.keys(SurfLocation).map((location) => (
              <LocationCard
                key={location}
                locales={{
                  currently: t("currently"),
                  // @ts-ignore
                  title: t(`${location}.title`),
                  // @ts-ignore
                  description: t(`${location}.description-short`),
                  noData: t("empty"),
                }}
                location={location as SurfLocation}
              />
            ))}
            <div
              className={
                "w-full flex gap-4 items-center text-center my-4 text-sm text-gray-600"
              }
            >
              <Drum className={"w-8 h-8"} />
              {t("home.s2.footer")}
            </div>
          </div>
          <hr />

          <section className={"flex flex-col gap-4"}>
            <h2 className={"text-2xl text-gray-600"}>{t("home.s3.title")}</h2>
            <Accordion type="single" collapsible>
              {Array.from(Array(3)).map((_, index) => (
                <AccordionItem key={index} value={`${index}`}>
                  <AccordionTrigger>
                    {/* @ts-ignore */}
                    {t(`home.s3.step${index + 1}.title`)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* @ts-ignore */}
                    {t(`home.s3.step${index + 1}.content`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
}
