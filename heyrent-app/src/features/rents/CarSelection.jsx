import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useGetCars } from "../cars/useCars";
import "./CarSelection.css";

export default function CarSelection({ carId, updateFields, updateCar }) {
  const { cars, isLoading } = useGetCars();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <h2 className="text-primary text-3xl font-semibold text-center my-6">
        خودرو موردنظر را انتخاب کنید
      </h2>
      <ul className="h-52 overflow-y-scroll mb-4">
        {cars.map((car) => (
          <>
            <input
              required
              checked={car.id === carId}
              onChange={(e) => {
                updateFields({
                  carId: car.id,
                  carPrice: car.pricePerDay,
                  deposit: car.deposit,
                });
                updateCar({
                  name: car.name,
                  image: car.image,
                });
              }}
              type="radio"
              name="carData"
              id={`car-${car.id}`}
            />
            <label
              htmlFor={`car-${car.id}`}
              className="aria-selected:bg-primary"
            >
              <li className="bg-neutral mb-2 flex rounded-md flex-row items-center justify-between gap-4 p-2">
                <span className="flex gap-2 items-center">
                  <img
                    className="w-[128px] rounded-lg"
                    src={car.image}
                    alt={car.name}
                  />
                  <div dir="ltr" className="flex items-end flex-col">
                    <span>
                      <h3 className="text-lg brand">{car.name}</h3>
                    </span>
                    <div className="flex gap-2 mt-2">
                      <span className="badge badge-secondary">
                        {car.seat} نفره
                      </span>
                      {car.gearbox && (
                        <span className="badge badge-accent">
                          {car.gearbox && "اتوماتیک"}
                        </span>
                      )}
                      <span className="badge badge-info">
                        {car.heath === "A"
                          ? "عالی"
                          : car.heath === "B"
                          ? "متوسط"
                          : "ضعیف"}
                      </span>
                    </div>
                  </div>
                </span>
                {/* <button type="button" className="btn btn-success font-light">
                  انتخاب کنید
                </button> */}
              </li>
            </label>
          </>
        ))}
      </ul>
    </div>
  );
}
