import React, { useEffect } from "react";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard | HEYRENT!`;
  }, []);
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-5xl font-semibold">داشبورد</h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </>
  );
}
