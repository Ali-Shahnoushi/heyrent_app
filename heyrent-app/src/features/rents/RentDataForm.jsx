import React, { useRef } from "react";
import { useGetSettings } from "../settings/useSettings";
import { toast } from "react-hot-toast";

export default function RentDataForm({
  startDate,
  endDate,
  updateFields,
  carPrice,
  deposit,
}) {
  const dateStartInput = useRef(null);
  const dateEndInput = useRef(null);
  const { error, isLoadingSetting, settings } = useGetSettings();
  function submitData() {
    const date1 = new Date(dateStartInput.current.value);
    const date2 = new Date(dateEndInput.current.value);
    const rentDays = Math.abs(date2.getDate() - date1.getDate());

    const totalPrice = carPrice * rentDays + deposit;

    updateFields({
      endDate: dateEndInput.current.value,
      startDate: dateStartInput.current.value,
      daysCount: rentDays,
      totalPrice,
    });

    if (date2 < date1) dateEndInput.current.value = null;

    if (rentDays <= settings.minRentDay) {
      console.log("date error");

      toast.error(
        `حداقل تعداد روز برای ثبت اجاره ${settings.minRentDay} روز است`,
        {
          duration: 3000,
        }
      );
      dateEndInput.current.value = null;

      return;
    }
  }

  return (
    <>
      <h2 className="text-primary text-3xl font-semibold text-center mb-8">
        اطلاعات اجاره خودرو
      </h2>
      <div className="flex flex-col items-center gap-2">
        <div className="w-1/2">
          <label htmlFor="startDate" className="block font-normal mb-2">
            تاریخ شروع
          </label>
          <input
            autoFocus
            required
            type="date"
            ref={dateStartInput}
            defaultValue={startDate}
            onChange={submitData}
            id="startDate"
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="endDate" className="block font-normal mb-2">
            تاریخ اتمام
          </label>
          <input
            required
            type="date"
            ref={dateEndInput}
            defaultValue={endDate}
            onChange={submitData}
            id="endDate"
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </>
  );
}
