import "./Filter.css";
import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="rounded-md bg-slate-200 dark:bg-slate-800 shadow-sm p-2 flex gap-1">
      {options.map((option, id) => (
        <button
          className={`btn-filter btn btn-sm border-none rounded-md py-2 px-4 font-normal bg-slate-400 hover:opacity-80 hover:text-white hover:bg-primary dark:bg-slate-700 ${
            option.value === currentFilter ? "active" : ""
          }`}
          key={id}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
