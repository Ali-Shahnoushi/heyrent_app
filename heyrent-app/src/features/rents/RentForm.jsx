import { useState } from "react";
import useMultistepForm from "./useMultistepForm";
import RentDataForm from "./RentDataForm";
import CarSelection from "./CarSelection";
import FinalSubmitForm from "./FinalSubmitForm";
import CustomerForm from "./CustomerForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useCreateRent } from "./useCreateRent";

export default function RentForm() {
  const MySwal = withReactContent(Swal);
  const INITIAL_DATA = {
    customer_name: "",
    customer_phone: "",
    carId: "",
    startDate: "",
    endDate: "",
    daysCount: 0,
    carPrice: 0,
    totalPrice: 0,
    status: "unconfirmed",
    isPaid: false,
    deposit: 0,
  };

  const { createRent, isCreating } = useCreateRent();

  const [data, setData] = useState(INITIAL_DATA);
  const [carData, setCarData] = useState(null);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function updateCar(carData) {
    setCarData((prev) => {
      return { ...prev, ...carData };
    });
  }

  const { steps, currentStepIndex, step, back, next, goTo } = useMultistepForm([
    <CustomerForm {...data} updateFields={updateFields} />,
    <CarSelection
      updateCar={setCarData}
      {...data}
      updateFields={updateFields}
    />,
    <RentDataForm {...data} updateFields={updateFields} />,

    <FinalSubmitForm {...data} carData={carData} updateFields={updateFields} />,
  ]);

  console.log(data);

  function submitHandle(e) {
    e.preventDefault();
    next();
    if (currentStepIndex == steps.length - 1) {
      createRent(data);
      // MySwal.fire({
      //   title: "آیا از ثبت اجاره مطمئنید؟",
      //   icon: "success",
      //   showCancelButton: true,
      //   confirmButtonColor: "#0fb098",
      //   cancelButtonColor: "#c33c3c",
      //   confirmButtonText: "بله، ثبت کن",
      //   cancelButtonText: "بیخیال",
      //   background: "var(--fallback-b1,oklch(var(--b1)/1))",
      //   color: "var(--fallback-bc,oklch(var(--bc)/1))",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     createRent(data);
      //   }
      // });
    }
  }

  return (
    <dialog id="rent_modal" className="modal">
      <div className="modal-box max-w-[45rem]">
        <form
          onSubmit={submitHandle}
          className="flex flex-col justify-between min-h-80"
        >
          <ul dir="ltr" className="steps w-full">
            {steps.map((obj, i) => (
              <li
                className={`step ${
                  i <= currentStepIndex ? "step-primary" : ""
                }`}
              ></li>
            ))}
          </ul>

          <div>{step}</div>

          <div className="flex justify-between">
            <button type="submit" className="btn btn-sm font-light btn-success">
              {currentStepIndex == steps.length - 1 ? "ثبت اجاره" : "بعدی"}
            </button>
            <button
              type="button"
              onClick={back}
              disabled={currentStepIndex == 0}
              className="btn btn-sm font-light btn-outline btn-error"
            >
              قبلی
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            setData(INITIAL_DATA);
            goTo(0);
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}
