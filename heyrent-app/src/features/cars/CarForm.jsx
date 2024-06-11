import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCar } from "./useCreateCar";
import { useEditCar } from "./useEditCar";
import { DevTool } from "@hookform/devtools";

export default function CarForm({ carObject = {}, name: modalName }) {
  const { id: editId, ...editValues } = carObject;
  const isEditSession = Boolean(editId);
  const {
    deposit,
    description,
    doors,
    gearbox,
    health,
    image,
    name,
    pricePerDay,
    seat,
    tank,
  } = editValues;

  const { register, handleSubmit, reset, formState, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { createCar, isCreating } = useCreateCar();
  const { editCar, isEditing } = useEditCar();
  const isWorking = isEditing || isCreating;
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // on create
    if (!isEditSession) {
      console.log(data);

      createCar(
        { ...data, image: image },
        {
          onSuccess: () => {
            document
              .getElementById(isEditSession ? modalName : "car_form_modal")
              .classList.remove("modal-open");
            reset();
          },
        }
      );
    }
    // on edit
    else {
      editCar(
        { newCarData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            document
              .getElementById(isEditSession ? modalName : "car_form_modal")
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
        id={isEditSession ? modalName : "car_form_modal"}
        className="modal edit_car_form"
      >
        <div className="max-w-[900px] modal-box">
          <>
            <h3 className="text-2xl font-semibold mb-4">افزودن خودرو</h3>
            <div className="p-2 flex flex-row flex-wrap gap-y-2 justify-between">
              <label className="flex flex-col w-[44%] items-start gap-2 ">
                <span>نام</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="text"
                  // defaultValue={name}
                  placeholder="نام خودرو را وارد کنید"
                  {...register("name", {
                    required: "این فیلد ضروری است",
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.name?.message}
                </span>
              </label>
              <label className="flex flex-col w-[25%] items-start gap-2">
                <span>کرایه روزانه</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  // defaultValue={pricePerDay}
                  placeholder="مقدار کرایه در روزرا وارد کنید"
                  {...register("pricePerDay", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: 1,
                      message: "کرایه نمی‌تواند ۰ باشد",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.pricePerDay?.message}
                </span>
              </label>
              <label className="flex flex-col w-[25%] items-start gap-2">
                <span>بیعانه</span>
                <input
                  disabled={isWorking}
                  // defaultValue={deposit}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  placeholder="مبلغ بیعانه را وارد کنید"
                  {...register("deposit", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: 1,
                      message: "بیعانه نمی‌تواند ۰ باشد",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.deposit?.message}
                </span>
              </label>

              <label className="flex flex-col w-[32%] items-start gap-2">
                <span>تعداد صندلی</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  // defaultValue={seat}
                  placeholder="تعداد صندلی را وارد کنید"
                  {...register("seat", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: 2,
                      message: "تعداد صندلی باید بیش از ۲ باشد",
                    },
                    max: {
                      value: 8,
                      message: "تعداد صندلی باید کمتر از ۸ باشد",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.seat?.message}
                </span>
              </label>
              <label className="flex flex-col w-[32%] items-start gap-2">
                <span>تعداد در</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  // defaultValue={doors}
                  placeholder="تعداد در‌ های خودرو را وارد کنید"
                  {...register("doors", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: 2,
                      message: "تعداد در باید بیش از ۲ باشد",
                    },
                    max: {
                      value: 6,
                      message: "تعداد در باید کمتر از ۶ باشد",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.doors?.message}
                </span>
              </label>
              <label className="flex flex-col w-[32%] items-start gap-2">
                <span>ضرفیت پمپ</span>
                <input
                  disabled={isWorking}
                  className="input input-md transition-all duration-100 input-bordered input-primary w-full max-w-xs"
                  type="number"
                  // defaultValue={tank}
                  placeholder="ظرفیت باک خودرو را وارد کنید"
                  {...register("tank", {
                    required: "این فیلد ضروری است",
                    min: {
                      value: 1,
                      message: "کرایه نمی‌تواند ۰ باشد",
                    },
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.tank?.message}
                </span>
              </label>
              <label className="self-center items-center cursor-pointer w-1/4 flex flex-row gap-2">
                <span className="label-text">دنده اتوماتیک</span>
                <input
                  disabled={isWorking}
                  type="checkbox"
                  // defaultChecked={gearbox}
                  className="checkbox checkbox-primary"
                  {...register("gearbox")}
                />
              </label>
              <div className="flex items-center self-center flex-col w-1/4">
                <span className="text-sm">سلامت خودرو</span>
                <div className="flex gap-2">
                  <div className="self-center form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text ml-1">A</span>
                      <input
                        disabled={isWorking}
                        type="radio"
                        name="carHealth"
                        value="A"
                        // checked={isEditSession && health === "A"}
                        className="radio checked:bg-green-500"
                        {...register("health")}
                      />
                    </label>
                  </div>
                  <div className="self-center form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text ml-1">B</span>
                      <input
                        disabled={isWorking}
                        type="radio"
                        // checked={isEditSession && health === "B"}
                        name="carHealth"
                        value="B"
                        className="radio checked:bg-yellow-500"
                        {...register("health")}
                      />
                    </label>
                  </div>
                  <div className="self-center form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text ml-1">C</span>
                      <input
                        disabled={isWorking}
                        type="radio"
                        // checked={isEditSession && health === "C"}
                        name="carHealth"
                        value="C"
                        className="radio checked:bg-red-500"
                        {...register("health")}
                      />
                    </label>
                  </div>
                </div>
                <span className="text-xs text-red-500">
                  {errors?.health?.message}
                </span>
              </div>
              <label className="flex flex-col w-1/2 items-start gap-2">
                <span className="text-sm">تصویر خودرو</span>
                <input
                  disabled={isWorking}
                  type="file"
                  accept="image/*"
                  // defaultValue={image}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  {...register("image", {
                    required: isEditSession ? false : "این فیلد ضروری است",
                  })}
                />
                <span className="text-xs text-red-500">
                  {errors?.image?.message}
                </span>
              </label>
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">توضیحات خودرو</span>
                </div>
                <textarea
                  disabled={isWorking}
                  // defaultValue={isEditSession ? description : ""}
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
                        isEditSession ? modalName : "car_form_modal"
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
                .getElementById(isEditSession ? modalName : "car_form_modal")
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
