import React, { useEffect } from "react";
import { useRent } from "../features/rents/useRent";
import moment from "jalali-moment";
import Spinner from "../components/Spinner";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useCheckin } from "../features/check-in-out/useCheckin";
import { useCheckout } from "../features/check-in-out/useCheckout";
import { useNavigate } from "react-router-dom";
import { useDeleteRent } from "../features/rents/useDeleteRent";

export default function SingleRent() {
  const { isLoading, rent } = useRent();
  useEffect(() => {
    document.title = `Rent ID #${rent?.id} | HEYRENT!`;
  }, []);
  const { checkin, isCheckingIn } = useCheckin();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteRent, isDeleting } = useDeleteRent();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  function handleDeleteRent(rentId) {
    deleteRent(rentId);
    navigate(-1);
  }

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
      <div>
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm font-normal mb-4"
            onClick={() => {
              navigate(-1);
            }}
          >
            بازگشت
          </button>
          <button
            className="btn btn-outline btn-error btn-sm font-normal mb-4"
            onClick={() => {
              handleDeleteRent(rent.id);
            }}
          >
            حذف اجاره
          </button>
        </div>
        <img
          src={rent.cars.image}
          className="w-full rounded-t-lg h-[55vh] object-cover"
        />
        <div className="flex flex-row">
          <section className="w-1/2 space-y-1 bg-gray-100 dark:bg-slate-700 text-black dark:text-white/80 rounded-lg py-2 mt-5">
            <div className="px-2">اجاره کننده: {rent.customer_name}</div>
            <div className="px-2">شماره تماس: {rent.customer_phone}</div>
            <div className="px-2">
              تاریخ شروع اجاره:{" "}
              {moment(rent.startDate, "YYYY/MM/DD")
                .locale("fa")
                .format("YYYY/MM/DD")}
            </div>
            <div className="px-2">
              مدت اجاره: {rent.daysCount.toLocaleString("fa-IR")} روز
            </div>
            <div className="px-2">نام خودرو: {rent.cars.name}</div>
          </section>
          <section className="w-1/4 flex flex-col items-center justify-center gap-3">
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
              مبلغ کل: {rent.totalPrice.toLocaleString("fa-IR")} تومان
            </div>
          </section>
          <section className="w-1/4 flex flex-col gap-2 justify-center">
            {rent.status == "checked" ? (
              <div className="tooltip" data-tip="اجاره تایید شده">
                <button
                  disabled
                  className="btn w-full btn-outline font-light border-2 btn-warning"
                >
                  تایید شده
                </button>
              </div>
            ) : !rent.isPaid ? (
              <div className="tooltip" data-tip="ابتدا باید هزینه پرداخت شود">
                <button
                  disabled
                  className="btn w-full btn-outline font-light border-2 btn-warning"
                >
                  تایید اجاره
                </button>
              </div>
            ) : (
              <button
                disabled={isCheckingOut}
                onClick={() => checkout(rent.id)}
                className="btn w-full btn-outline font-light border-2 btn-secondary"
              >
                تایید اجاره
              </button>
            )}
            {rent.isPaid ? (
              <div className="tooltip" data-tip="مبلغ پرداخت شده">
                <button
                  disabled
                  className="btn w-full btn-outline font-light border-2 btn-warning"
                >
                  پرداخت شده
                </button>
              </div>
            ) : (
              <button
                disabled={isCheckingIn}
                onClick={() => checkin(rent.id)}
                className="btn w-full btn-outline font-light border-2 btn-warning"
              >
                پرداخت اجاره
              </button>
            )}
          </section>
        </div>
      </div>
    );
}
