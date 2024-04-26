import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
