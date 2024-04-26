import React from "react";
import { useGetSettings } from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";
import Spinner from "../../components/Spinner";

const SettingsForm = () => {
  const {
    error,
    isLoading,
    settings: { minRentDay, logoName, slogan } = {},
  } = useGetSettings();

  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSettings({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 w-full rounded-lg">
      <h2 className="text-2xl mb-8 font-semibold">بروزرسانی تنظیمات وب‌سایت</h2>
      <form>
        <div className="gap-6 flex flex-col">
          <div className="w-1/3 mb-4">
            <label htmlFor="inputField" className="block  font-normal mb-2">
              حداقل تعداد روز اجاره
            </label>
            <input
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "minRentDay")}
              defaultValue={minRentDay}
              type="number"
              id="minRentDay"
              className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-1/3 mb-4">
            <label htmlFor="inputField" className="block font-normal mb-2">
              نام داشبورد
            </label>
            <input
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "logoName")}
              defaultValue={logoName}
              type="text"
              id="logoName"
              className="w-full px-3 bg-transparent py-2 border focus:ring-4 transition-all duration-100 ring-neutral border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-1/3 mb-4">
            <label htmlFor="inputField" className="block font-normal mb-2">
              شعار شرکت
            </label>
            <input
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "slogan")}
              defaultValue={slogan}
              type="text"
              id="slogan"
              className="w-full px-3 bg-transparent py-2 border focus:ring-4 transition-all duration-100 ring-neutral border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
