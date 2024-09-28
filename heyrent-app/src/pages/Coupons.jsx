import React, { useEffect } from "react";
import CouponsTable from "../features/coupons/CouponsTable";

export default function Coupons() {
  useEffect(() => {
    document.title = `Coupons | HEYRENT!`;
  }, []);
  return (
    <>
      <CouponsTable />
    </>
  );
}
