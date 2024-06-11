import React, { useMemo } from "react";
import useCoupon from "../coupons/useCoupon";

export default function FinalSubmitForm({
  customer_name,
  customer_phone,
  daysCount,
  carData,
  deposit,
  carPrice,
  totalPrice,
}) {
  const { data, error, isPending: isLoading, mutate } = useCoupon();
  const finalPrice = useMemo(() => {
    if (!data) return totalPrice;
    if (data.percent > 0) {
      return totalPrice - (totalPrice * data.percent) / 100;
    }
    return data.amount;
  }, [data, totalPrice]);

  console.log(carData);

  function handleUseCoupon(e) {
    // const { value } = e.target;
    mutate(e.target.value);
  }

  return (
    <>
      <h2 className="text-primary text-3xl font-semibold text-center my-6">
        ثبت اطلاعات نهایی
      </h2>
      <div className="flex flex-row gap-y-4 flex-wrap items-center">
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">نام مشتری</label>
          <input
            defaultValue={customer_name}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">شماره تماس مشتری</label>
          <input
            defaultValue={customer_phone}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">تعداد روز اجاره</label>
          <input
            defaultValue={daysCount}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">مبلغ بیعانه</label>
          <input
            defaultValue={deposit}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">اجاره روزانه</label>
          <input
            defaultValue={carPrice}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 px-1">
          <label className="block font-normal mb-2">مبلغ کل</label>
          <input
            value={finalPrice}
            disabled
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-1/3 mb-4">
          <img src={carData.image} className="rounded-md" />
        </div>
        <div className="w-1/3 mb-4 flex items-center justify-center">
          <h3 className="text-xl capitalize">{carData.name}</h3>
        </div>
        <div className="w-1/3 mb-4 flex flex-col">
          <label className="block font-normal mb-2">کد تخفیف</label>
          <input
            onBlur={handleUseCoupon}
            disabled={isLoading}
            className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </>
  );
}
