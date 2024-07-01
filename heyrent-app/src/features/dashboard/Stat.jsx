import "./Stat.css";

export default function Stat({ icon, title, value, color, size, char }) {
  return (
    <div className="bg-gray-200 dark:bg-slate-800 rounded-md p-6 flex flex-row gap-x-[1rem] gap-y-[0.4rem]">
      <div
        className={`icons h-16 w-16 rounded-full flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <h5 className="text-right text-lg text-gray-500">{title}</h5>
        <p className={`${size ? size : "text-4xl"}`}>
          {value.toLocaleString("fa-IR") + `${char ? char : ""}`}
        </p>
      </div>
    </div>
  );
}
