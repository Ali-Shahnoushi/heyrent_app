import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSignup } from "./useSignup";

export default function UserForm({ userObject = {}, name: modalName }) {
  const { id: editId, ...editValues } = userObject;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { isSigningUp, signup } = useSignup();
  const isWorking = isSigningUp;
  const { errors } = formState;

  function onSubmit({ fullName, password, email }) {
    signup({ fullName, email, password }, { onSettled: () => reset });

    // createCar(
    //   { ...data },
    //   {
    //     onSuccess: () => {
    //       document
    //         .getElementById(isEditSession ? modalName : "car_form_modal")
    //         .classList.remove("modal-open");
    //       reset();
    //     },
    //   }
    // );
  }

  console.log(control._defaultValues);

  return (
    <form>
      <div className="max-w-[700px]">
        <h3 className="text-2xl font-semibold mb-4">افزودن کاربر</h3>
        <div className="p-2 flex flex-col flex-wrap gap-y-2 justify-between">
          <label className="flex flex-col w-full items-start gap-2 ">
            <span>نام و نام خانوادگی</span>
            <input
              disabled={isWorking}
              className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
              type="text"
              placeholder="نام خود را وارد کنید"
              {...register("fullName", {
                required: "این فیلد ضروری است",
              })}
            />
            <span className="text-xs text-red-500">
              {errors?.fullName?.message}
            </span>
          </label>
          <label className="flex flex-col w-full items-start gap-2">
            <span>ایمیل</span>
            <input
              disabled={isWorking}
              className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              {...register("email", {
                required: "این فیلد ضروری است",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "لطفا ایمیل معتبر وارد کنید",
                },
              })}
            />
            <span className="text-xs text-red-500">
              {errors?.email?.message}
            </span>
          </label>
          <label className="flex flex-col w-full items-start gap-2">
            <span>رمزعبور</span>
            <input
              disabled={isWorking}
              className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
              type="password"
              placeholder="رمزعبور را وارد کنید"
              {...register("password", {
                required: "این فیلد ضروری است",
                min: {
                  value: 8,
                  message: "رمزعبور باید بیش از ۸ کاراکتر باشد",
                },
                validate: (value) =>
                  value === getValues().password || "رمز عبور مطاقبت ندارد",
              })}
            />
            <span className="text-xs text-red-500">
              {errors?.password?.message}
            </span>
          </label>

          <label className="flex flex-col w-full   items-start gap-2">
            <span>تکرار رمزعبور</span>
            <input
              disabled={isWorking}
              className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
              type="password"
              // defaultValue={seat}
              placeholder="رمزعبور را وارد کنید"
              {...register("passwordRepeat", {
                required: "این فیلد ضروری است",
                min: {
                  value: 8,
                  message: "رمزعبور باید بیش از ۸ کاراکتر باشد",
                },
                validate: (value) =>
                  value === getValues().password || "رمز عبور مطاقبت ندارد",
              })}
            />
            <span className="text-xs text-red-500">
              {errors?.passwordRepeat?.message}
            </span>
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="btn-sm btn btn-success text-white font-normal"
          >
            افزودن
          </button>
          <button
            onClick={() => {
              document
                .getElementById(isEditSession ? modalName : "car_form_modal")
                .classList.remove("modal-open");
              reset();
            }}
            className="btn-sm btn btn-error btn-outline text-white font-normal"
            type="reset"
          >
            انصراف
          </button>
        </div>
      </div>
      <DevTool placement="top-right" control={control} />
    </form>
  );
}
