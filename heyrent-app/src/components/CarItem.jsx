import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const healths = {
  A: {
    color: "bg-lime-600",
  },
  B: {
    color: "bg-yellow-500",
  },
  C: {
    color: "bg-orange-500",
  },
};

export default function CarItem({ icon, label, value, itemType }) {
  if (itemType == "gearbox")
    return (
      <div className="flex items-center justify-between px-10">
        <span className="text-primary">{label}</span>
        <span className="text-2xl">
          {value ? (
            <FaCheckCircle color="green" />
          ) : (
            <ImCancelCircle color="red" />
          )}
        </span>
      </div>
    );
  if (itemType == "health")
    return (
      <div className="flex items-center justify-between px-10">
        <span className="text-primary">{label}</span>
        <span
          className={`rounded-badge brand font-black text-white w-7 h-7 flex items-center justify-center ${healths[value].color}`}
        >
          {value}
        </span>
      </div>
    );
  else
    return (
      <>
        {itemType}
        <div className="flex items-center justify-between px-10">
          <span className="text-primary">{label}</span>

          <span className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <span className="text-xl font-[iranyekanxfanum]">
              {typeof value === "number" && value > 1000
                ? value.toLocaleString() + " تومان "
                : value}
            </span>
          </span>
        </div>
      </>
    );
}
