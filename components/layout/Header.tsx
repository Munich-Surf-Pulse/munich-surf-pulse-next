"use client";

import React from "react";
import Image from "next/image";
import { ResolvedRoute } from "@/types";
import { Menu, X } from "lucide-react";

export default function Header({ routes }: { routes: ResolvedRoute[] }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full z-30 transition duration-300 ease-in-out bg-primaryColor text-white">
      <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline flex items-center gap-4"
          >
            <div className={"w-[50px] h-[50px] relative m-1"}>
              <Image
                src={"/logo.png"}
                alt={"Munich SurfPulse Logo"}
                layout="fill"
                priority={true}
              />
            </div>
            <div className={"text-sm"}>
              <div>Munich</div>
              <div>SurfPulse</div>
            </div>
          </a>
          <button
            className="text-white cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none "
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? (
              <X className={"w-[24px] h-[24px]"} />
            ) : (
              <Menu className={"w-[24px] h-[24px]"} />
            )}
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex h-screen flex-col" : " hidden")
          }
        >
          <nav
            className={
              "flex-col flex-grow" + (navbarOpen ? " w-full pt-8" : "")
            }
          >
            <ul
              className={
                "flex flex-grow justify-end flex-wrap" +
                (navbarOpen ? " flex-col items-end" : " items-center")
              }
            >
              {routes
                .filter((route) => route.visibleInHeader)
                .map((route) => (
                  <li key={route.path}>
                    <a
                      href={route.path}
                      className={
                        " px-5 py-3 flex items-center transition duration-150 ease-in-out" +
                        (route.primary
                          ? " text-accentOrange font-bold"
                          : " font-medium")
                      }
                    >
                      {route.name}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
