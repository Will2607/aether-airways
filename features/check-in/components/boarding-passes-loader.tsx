"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { BoardingPassesPage } from "./boarding-passes-page";

type Props = ComponentProps<typeof BoardingPassesPage>;

export const BoardingPassesLoader = dynamic<Props>(
  () => import("./boarding-passes-page").then((m) => ({ default: m.BoardingPassesPage })),
  { ssr: false }
);
