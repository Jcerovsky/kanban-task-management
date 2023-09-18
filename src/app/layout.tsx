import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import ContextProvider from "@/app/context/Context";

const jakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban Task Management",
  description:
    "Agile task management app suitable for any and all requirements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.className} dark:text-white dark:bg-slate-900 box-border bg-neutral-100 font-semibold`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
