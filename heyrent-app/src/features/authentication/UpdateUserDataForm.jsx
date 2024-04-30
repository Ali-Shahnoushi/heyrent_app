import React from "react";
import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

export default function UpdateUserDataForm() {
  const { isUpdatingUser, updateUser } = useUpdateUser();
  const {
    isLoading,
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState(currentFullName);

  function updateUserDataHandle(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function cancelUpdate(e) {
    e.preventDefault();
    setFullName(currentFullName);
    setAvatar(null);
  }

  const isWorking = isUpdatingUser || isLoading;
  return (
    <div>
      <form onSubmit={updateUserDataHandle} className="pt-4">
        <div className="gap-6 flex flex-col">
          <div className="w-1/2 mb-4">
            <label htmlFor="email" className="block  font-light mb-2">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-3 bg-transparent py-2 border border-primary rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-1/2 mb-4">
            <label htmlFor="fullname" className="block font-light mb-2">
              نام و نام خانوادگی
            </label>
            <input
              disabled={isWorking}
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              id="fullname"
              className="w-full px-3 bg-transparent py-2 border focus:ring-4 transition-all duration-100 ring-neutral border-primary rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-1/2 mb-4">
            <label htmlFor="inputField" className="block font-light mb-2">
              تصویر کاربر
            </label>
            <input
              disabled={isWorking}
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/*"
              className="px-3 bg-transparent py-2 transition-all duration-100"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            disabled={isWorking}
            className="btn btn-primary btn-sm font-light"
            type="submit"
          >
            بروزرسانی
          </button>
          <button
            disabled={isWorking}
            onClick={cancelUpdate}
            className="btn btn-error btn-outline btn-sm font-light"
            type="reset"
          >
            بیخیال
          </button>
        </div>
      </form>
    </div>
  );
}
