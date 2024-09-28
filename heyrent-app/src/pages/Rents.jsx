import { useEffect } from "react";
import RentsTable from "./../features/rents/RentsTable";

export default function Rents() {
  useEffect(() => {
    document.title = `Rents | HEYRENT!`;
  }, []);
  return (
    <div>
      <RentsTable />
    </div>
  );
}
