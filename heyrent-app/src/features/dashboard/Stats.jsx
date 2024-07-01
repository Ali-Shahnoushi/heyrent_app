import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

export default function Stats({ rents, confirmedStays, numDays, carCount }) {
  const numBookings = rents.length;

  const totalSales = rents.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const totalCheckins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.daysCount, 0) /
    (numDays * carCount);

  return (
    <>
      <Stat
        color="bg-blue-600"
        title="اجاره ها"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        color="bg-green-600"
        title="فروش"
        size="text-xl"
        icon={<HiOutlineBanknotes />}
        value={totalSales}
      />
      <Stat
        color="bg-indigo-600"
        title="ثبت‌شده ها"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        color="bg-yellow-600"
        title="نمره اشتغال"
        char="%"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100)}
      />
    </>
  );
}
