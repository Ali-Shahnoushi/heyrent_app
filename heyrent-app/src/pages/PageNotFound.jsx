import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex items-center flex-col">
        <h1 className="text-9xl font-semibold">خطای ۴۰۴</h1>
        <h3 className="text-2xl mt-4">صفحه مورد نظر یافت نشد</h3>
        <Link to="/" className="btn btn-primary font-normal mt-4">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
