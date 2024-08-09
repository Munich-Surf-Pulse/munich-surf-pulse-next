import React, { FC } from "react";
import { getI18n } from "@/locales/server";
import dayjs from "dayjs";
import { ResolvedRoute } from "@/types";
import { Github, Instagram, Linkedin } from "lucide-react";
import { SupportButton } from "@/components/common/SupportButton/SupportButton";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export const Footer: FC<{ routes: ResolvedRoute[] }> = async ({ routes }) => {
  const t = await getI18n();

  const version = process.env.version;

  return (
    <div className={"w-full bg-primaryColor"}>
      <div
        className={
          "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 text-white"
        }
      >
        <div className={"flex flex-col gap-8 py-8"}>
          <div>
            <div className={"w-full text-xl"}>Munich Surf Pulse</div>
            <div className={"w-full"}>
              Copyright © {dayjs().year()}{" "}
              <a
                href={
                  "https://www.linkedin.com/in/gerald-mahlknecht-084074181/"
                }
                target={"_blank"}
              >
                Gerald Mahlknecht
              </a>
            </div>
          </div>

          <div className={"grid grid-cols-1 gap-y-8 md:grid-cols-4"}>
            <div>
              <ul>
                <li>
                  <a href={"/privacy"}>{t("footer.privacy")}</a>
                </li>
                <li>
                  <a href={"/terms-of-use"}>{t("footer.terms-of-use")}</a>
                </li>
              </ul>
              <LanguageSwitcher />
            </div>

            <div className={"flex flex-col gap-2"}>
              <b>{t("footer.navigation.title")}</b>
              <ul>
                {routes.map((route, index) => (
                  <li key={index}>
                    <a href={route.path}>{route.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={"flex flex-col gap-2"}>
              <b>{t("footer.social")}</b>
              <div className={"flex gap-4"}>
                <a
                  href={"https://www.instagram.com/mahlknecht_/"}
                  target={"_blank"}
                >
                  <Instagram />
                </a>
                <a
                  href={
                    "https://www.linkedin.com/in/gerald-mahlknecht-084074181/"
                  }
                  target={"_blank"}
                >
                  <Linkedin />
                </a>
                <a href={"https://github.com/Kn3cht"} target={"_blank"}>
                  <Github />
                </a>
              </div>
            </div>
            <div>
              <SupportButton />
            </div>
          </div>
        </div>
        <div className={"text-sm w-full flex justify-center pb-8"}>
          v{version}
        </div>
      </div>
    </div>
  );
};
