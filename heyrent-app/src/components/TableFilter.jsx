import React from "react";
import { BiSearch } from "react-icons/bi";

export default function TableFilter({ columnFilters, setColumnFilters }) {
  const carName = columnFilters.find((f) => f.id === "name")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div className="w-1/3 flex flex-row items-center relative">
      {/* <input
        type="text"
        value={carName}
        onChange={(e) => onFilterChange("name", e.target.value)}
        className="w-full text-lg bg-base-200 outline-none px-3 py-2 rounded-lg pr-10"
      />
      <BiSearch className="text-xl right-3 absolute" /> */}
      <label className="input input-primary transition-all duration-100 input-bordered flex items-center gap-2 mr-3">
        <input
          value={carName}
          onChange={(e) => onFilterChange("name", e.target.value)}
          type="text"
          className="grow "
          placeholder="جستجو کن..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 h-6 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}
