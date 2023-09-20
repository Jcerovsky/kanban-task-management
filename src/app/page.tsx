"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Columns from "@/app/components/Columns";
import ErrorPage from "@/app/Modals/ErrorPage";

export default function Home() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Columns />
      <ErrorPage />
    </div>
  );
}
