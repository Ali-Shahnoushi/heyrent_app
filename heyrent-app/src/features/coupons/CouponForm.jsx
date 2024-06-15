import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useCreateCoupon } from "./useCreateCoupon";
import { useEditCoupon } from "./useEditCoupon";
import { DevTool } from "@hookform/devtools";

export default function CouponForm({ couponObject = {}, name: modalName }) {
  const { id: editId, ...editValues } = couponObject;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState,
    control,
    getValues,
    watch,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { editCoupon, isEditing } = useEditCoupon();
  const { createCoupon, isCreating } = useCreateCoupon();
  const isWorking = isEditing || isCreating;
  const { errors } = formState;
  const amount = watch("amount");
  const percent = watch("percent");

  function onSubmit(data) {
    if (!amount && !percent) {
      setError("amount", { message: "Test" });
      setError("percent", { message: "Test" });
      return;
    }

    const finalData = {
      ...data,
      percent: !data.percent ? 0 : data.percent,
      amount: !data.amount ? 0 : data.amount,
    };
    if (!isEditSession) {
      createCoupon(
        { ...finalData },
        {
          onSuccess: () => {
            document
              .getElementById(isEditSession ? modalName : "coupon_form_modal")
              .classList.remove("modal-open");
            reset();
          },
        }
      );
    }
    // on edit
    else {
      editCoupon(
        { newCouponData: finalData, id: editId },
        {
          onSuccess: () => {
            document
              .getElementById(isEditSession ? modalName : "coupon_form_modal")
              .classList.remove("modal-open");
            reset();
          },
        }
      );
    }
  }

  return (
    <>
      <dialog
        id={isEditSession ? modalName : "coupon_form_modal"}
        className="modal edit_car_form"
      >
        <div className="max-w-[900px] modal-box">
          <>
            <h3 className="text-2xl font-semibold mb-4">افزودن کوپن تخفیف</h3>
            <div className="p-2 flex flex-row flex-wrap gap-y-2 justify-between">
              <label className="flex flex-col w-[44%] items-start gap-2 ">
                <span>نام</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="text"
                  placeholder="کد کوپن را وارد کنید"
                  {...register("name", {
                    required: "این فیلد ضروری است",
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.name?.message}
                </span>
              </label>
              <label className="flex flex-col w-[25%] items-start gap-2">
                <span>درصد تخفیف</span>
                <input
                  disabled={isWorking || Boolean(amount)}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  placeholder="مقدار درصد تخفیف را وارد کنید"
                  {...register("percent")}
                />
                <span className="text-xs text-red-500">
                  {errors?.percent?.message}
                </span>
              </label>
              <label className="flex flex-col w-[25%] items-start gap-2">
                <span>مبلغ تخفیف</span>
                <input
                  disabled={isWorking || Boolean(percent)}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  placeholder="مبلغ تخفیف را وارد کنید"
                  {...register("amount")}
                />
                <span className="text-xs text-red-500">
                  {errors?.amount?.message}
                </span>
              </label>

              <label className="flex flex-col w-[32%] items-start gap-2">
                <span>تعداد صندلی</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="date"
                  // defaultValue={seat}
                  {...register("expireDate", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: new Date(),
                      message: "تاریخ کوپن نامعتبر است",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.expireDate?.message}
                </span>
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">توضیحات تخفیف</span>
                </div>
                <textarea
                  disabled={isWorking}
                  className="textarea textarea-bordered textarea-primary transition-all duration-100 h-24"
                  placeholder="توضیحات..."
                  {...register("description")}
                />
                <span className="text-xs text-red-500">
                  {errors?.description?.message}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success text-white font-normal"
                >
                  {isEditSession ? "بروزرسانی" : "افزودن"}
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById(
                        isEditSession ? modalName : "coupon_form_modal"
                      )
                      .classList.remove("modal-open");
                    reset();
                  }}
                  className="btn btn-error text-white font-normal"
                >
                  بستن
                </button>
              </form>
            </div>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              document
                .getElementById(isEditSession ? modalName : "coupon_form_modal")
                .classList.remove("modal-open");
              reset();
            }}
          >
            close
          </button>
        </form>
      </dialog>
      <DevTool placement="top-right" control={control} />
    </>
  );
}
