import React, { useEffect } from "react";
import CarsTable from "../features/cars/carsTable";

export default function Cars() {
  useEffect(() => {
    document.title = `Cars | HEYRENT!`;
  }, []);
  return (
    <>
      <CarsTable />
    </>
  );
}
