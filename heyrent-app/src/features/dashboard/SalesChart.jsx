import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import moment from "jalali-moment";

export default function SalesChart({ rents, daysCount }) {
  const { isDarkMode } = useDarkMode();

  console.log(useDarkMode());

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), daysCount),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: rents
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  console.log(isDarkMode);

  return (
    <div className="col-span-full border border-gray-500 rounded-md p-12 flex flex-col gap-6">
      <h2 className="text-2xl">
        فروش از{" "}
        {moment(allDates.at(0), "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}{" "}
        تا{" "}
        {moment(allDates.at(-1), "YYYY/MM/DD")
          .locale("fa")
          .format("YYYY/MM/DD")}
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
