import React from "react";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";

export default function Account() {
  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/2">
        <h2 className="text-2xl">بروزرسانی اطلاعات حساب</h2>
        <UpdateUserDataForm />
      </div>
      <div className="w-1/2 flex flex-col">
        <h2 className="text-2xl">ویرایش رمزعبور</h2>
        <UpdateUserPasswordForm />
      </div>
    </div>
  );
}
