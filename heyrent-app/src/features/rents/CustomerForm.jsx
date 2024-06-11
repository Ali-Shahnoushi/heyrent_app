import React from "react";

export default function CustomerForm({
  customer_phone,
  customer_name,
  updateFields,
}) {
  return (
    <>
      <h2 className="text-primary text-3xl font-semibold text-center mb-8">
        اطلاعات مشتری
      </h2>
      <div className="flex flex-col items-center gap-2">
        <div className="w-1/2">
          <label htmlFor="fullName" className="block  font-normal mb-2">
            نام و نام‌خانوادگی مشتری
          </label>
          <input
            value={customer_name}
            onChange={(e) => updateFields({ customer_name: e.target.value })}
            autoFocus
            required
            type="text"
            id="fullName"
            placeholder="نام کامل مشتری را وارد کنید"
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="phone" className="block  font-normal mb-2">
            شماره تماس مشتری
          </label>
          <input
            value={customer_phone}
            onChange={(e) => updateFields({ customer_phone: e.target.value })}
            required
            dir="rtl"
            type="tel"
            id="phone"
            placeholder="شماره تماس مشتری را وارد کنید"
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </>
  );
}
