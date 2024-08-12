import { NextPage } from "next";
import { getI18n } from "@/locales/server";
import Image from "next/image";
import { SupportButton } from "@/components/common/SupportButton/SupportButton";
import Link from "next/link";
import {Github} from "lucide-react";

const AboutPage: NextPage = async () => {
  const t = await getI18n();

  return (
    <div
      className={
        "w-screen max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      }
    >
      <div className={"flex flex-col gap-8"}>
        <h1 className={"text-3xl"}>{t("about.title")}</h1>

        <div className={"flex flex-col md:flex-row gap-8"}>
          <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative">
            <Image
                src={"/logo_black.png"}
                alt="Munich Surf Pulse Logo"
                layout="fill"
                objectFit="cover"
            />
          </div>
          <div className={"flex-1 flex flex-col gap-4"}>
            <p>{t("about.project.p1")}</p>
            <p>{t("about.project.p2")}</p>
          </div>
        </div>
        <hr/>
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-2xl"}>{t("about.myself.title")}</h2>
          <div className={"flex flex-col md:flex-row gap-8"}>
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative">
              <Image
                  src={"/pb.JPG"}
                  alt="Profile Image"
                  layout="fill"
                  objectFit="cover"
              />
            </div>
            <div className={"flex-1 flex flex-col gap-4"}>
              <p>{t("about.myself.content")}</p>
              <div className={"flex flex-col gap-2"}>
                <h2>{t("about.myself.contact.title")}</h2>
                <a
                    href={
                      "mailto:g.mahlknecht@gmail.com?subject=Munich%20Surf%20Pulse"
                    }
                    target={"_blank"}
                >
                  g.mahlknecht@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-2xl"}>{t("about.disclaimer.title")}</h2>
          <p>{t("about.disclaimer.p1")}</p>
          <p>{t("about.disclaimer.p2")}</p>
        </div>
        <hr/>
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-2xl"}>{t("about.support.title")}</h2>
          <p>{t("about.support.p1")}</p>
          <p>{t("about.support.p2")}</p>
          <SupportButton/>
        </div>
        <hr/>
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-2xl"}>{t("about.contribution.title")}</h2>
          <p>{t("about.contribution.p1")}</p>
          <p>{t("about.contribution.p2")}</p>
          <Link href={"https://github.com/Munich-Surf-Pulse"} target={"_blank"}><div className={"flex gap-2"}><Github /> Munich-Surf-Pulse</div></Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
