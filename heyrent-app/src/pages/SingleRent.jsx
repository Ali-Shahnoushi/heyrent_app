import React from "react";
import { useRent } from "../features/rents/useRent";
import moment from "jalali-moment";
import Spinner from "../components/Spinner";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function SingleRent() {
  const { error, isLoading, rent } = useRent();

  if (!rent)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  console.log(rent);
  // const details = {
  //   carId,
  //   carPrice,
  //   cars: { id: 20, name: "mustang 2023", seat: 2, tank: 65, doors: 4 },
  //   created_at,
  //   customer_name,
  //   customer_phone,
  //   daysCount,
  //   deposit,
  //   endDate,
  //   id,
  //   isPaid,
  //   startDate,
  //   status,
  //   totalPrice,
  // };
  if (rent)
    return (
      <div className="flex flex-row">
        <section className="w-1/3 space-y-3 bg-gray-100 dark:bg-slate-700 text-black dark:text-white/80 rounded-lg pb-4">
          <div>
            <img src={rent.cars.image} className="w-full rounded-t-lg" />
          </div>
          <div className="px-2">اجاره کننده: {rent.customer_name}</div>
          <div className="px-2">شماره تماس: {rent.customer_phone}</div>
          <div className="px-2">
            تاریخ شروع اجاره:{" "}
            {moment(rent.startDate, "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD")}
          </div>
          <div className="px-2">مدت اجاره: {rent.daysCount} روز</div>
          <div className="px-2">نام خودرو: {rent.cars.name}</div>
        </section>
        <section className="w-1/3 flex flex-col items-center justify-center gap-3">
          <div className="px-2 flex items-center gap-2">
            <FaRegMoneyBillAlt className="text-xl" />
            {rent.isPaid ? "پرداخت شده" : "پرداخت نشده"}
          </div>
          <div className="px-2 text-md">
            وضعیت{" "}
            {rent.status == "paid" ? (
              <span className="badge badge-warning badge-lg">پرداخت شده</span>
            ) : rent.status == "checked" ? (
              <span className="badge badge-success badge-lg">تایید شده</span>
            ) : (
              <span className="badge badge-error badge-lg">تایید نشده</span>
            )}
          </div>
          <div className="px-2 text-2xl">
            مبلغ کل: {rent.totalPrice.toLocaleString()} تومان
          </div>
        </section>
        <section className="w-1/3">3</section>
      </div>
    );
}
