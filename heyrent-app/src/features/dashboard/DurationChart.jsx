import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";

// const ChartBox = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);

//   padding: 2.4rem 3.2rem;
//   grid-column: 3 / span 2;

//   & > *:first-child {
//     margin-bottom: 1.6rem;
//   }

//   & .recharts-pie-label-text {
//     font-weight: 600;
//   }
// `;

const startDataLight = [
  {
    duration: "1 night",
    label: " ۱ شب ",
    value: 0,
    color: "#ef4444",
  },
  {
    label: " ۲ شب ",
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    label: " ۳ شب ",
    value: 0,
    color: "#eab308",
  },
  {
    label: " ۴ الی ۵ شب ",
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    label: " ۶ الی ۷ شب ",
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    label: " ۸ الی ۱۴ شب ",
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    label: " ۱۵ الی ۲۱ شب ",
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    label: " بیش از ۲۱ شب ",
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    label: " ۱ شب ",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    label: " ۲ شب ",
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    label: " ۳ شب ",
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    label: " ۴ الی ۵ شب ",
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    label: " ۶ الی ۷ شب ",
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    label: " ۸ الی ۱۴ شب ",
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    label: " ۱۵ الی ۲۱ شب ",
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    label: " بیش از ۲۱ شب ",
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.daysCount;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();

  const tooltipColors = isDarkMode
    ? {
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        text: "#374151",
        background: "#fff",
      };

  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(startData, confirmedStays);

  return (
    <div className="border border-gray-500 rounded-md py-6 px-8 col-span-2 col-start-3">
      <h2 className="text-2xl font-medium">خلاصه اجاره‌ها</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip
            itemStyle={{
              color: tooltipColors.text,
            }}
            contentStyle={{
              backgroundColor: tooltipColors.background,
            }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={12}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
