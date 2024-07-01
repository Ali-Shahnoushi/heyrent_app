import React, { useRef, useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { useLogin } from "./useLogin";

export default function LoginForm() {
  const inputRef = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { isLoggingIn, login } = useLogin();

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: function () {
          setEmail("");
          setPassword("");
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);
        },
      }
    );
  }

  return (
    <div
      style={{ backgroundColor: "#1d232ab2", backdropFilter: "blur(6px)" }}
      className="z-10 rounded-lg p-4 w-[400px]"
    >
      <div className="text-center">
        <BrandLogo className="self-center" showSlogan={false} />
        <h4 className="mt-2">وارد حساب‌کاربری خود شوید</h4>
      </div>
      <form onSubmit={handleLogin}>
        <label className="flex flex-col w-full items-start gap-2">
          <span>ایمیل</span>
          <input
            ref={inputRef}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="username"
            className="input input-md transition-all duration-100 input-bordered input-primary w-full"
            type="email"
            placeholder="ایمیل خودرو را وارد کنید"
          />
          {/* <span className="text-xs text-red-500">{errors?.name?.message}</span> */}
        </label>
        <label className="mt-4 flex flex-col w-full items-start gap-2">
          <span>رمزعبور</span>
          <input
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
            className="input input-md transition-all duration-100 input-bordered input-primary w-full"
            type="password"
            placeholder="رمزعبور خودرو را وارد کنید"
          />
          {/* <span className="text-xs text-red-500">{errors?.name?.message}</span> */}
        </label>
        <div>
          <input
            className="mt-4 btn btn-primary text-white font-normal w-full"
            type="submit"
            value="ورود"
          />
        </div>
      </form>
    </div>
  );
}
