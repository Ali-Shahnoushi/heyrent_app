import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <main className="grid h-screen grid-cols-[17rem,1fr] grid-rows-[auto,1fr]">
      <Header />
      <Sidebar />
      <main className="p-[4rem 4.8rem 6.4rem] overflow-y-auto">
        <section className="max-w-[120rem] mx-auto h-full flex flex-col gap-[3.2rem] p-6">
          <Outlet />
        </section>
      </main>
    </main>
  );
}
