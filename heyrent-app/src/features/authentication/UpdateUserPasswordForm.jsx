import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

export default function UpdateUserPasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isUpdatingUser: isUpdatingPassword, updateUser } = useUpdateUser();

  function updatePasswordHandle({ password }) {
    console.log(password);
    updateUser({ password }, { onSuccess: reset() });
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit(updatePasswordHandle)}>
      <div className="gap-6 flex flex-col">
        <div className="w-1/2 mb-4">
          <label htmlFor="email" className="block font-light mb-2">
            رمزعبور جدید (حداقل ۸ کاراکتر)
          </label>
          <input
            className="w-full px-3 bg-transparent py-2 border focus:ring-4 transition-all duration-100 ring-neutral border-primary rounded-lg focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            autoComplete="current-password"
            // disabled={isUpdating}
            {...register("password", {
              required: "این فیلد الزامی است",
              minLength: {
                value: 8,
                message: "رمزعبور باید حداقل ۸ کاراکتر باشد",
              },
            })}
          />
          <span className="text-sm">{errors?.password?.message}</span>
        </div>
        <div className="w-1/2 mb-4">
          <label htmlFor="fullname" className="block font-light mb-2">
            تکرار رمزعبور جدید
          </label>
          <input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            // disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "این فیلد الزامی است",
              validate: (value) =>
                getValues().password === value ||
                "رمزعبور ها با هم تطابق ندارد",
            })}
            className="w-full px-3 bg-transparent py-2 border focus:ring-4 transition-all duration-100 ring-neutral border-primary rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <span className="text-sm">{errors?.passwordConfirm?.message}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          disabled={isUpdatingPassword}
          className="btn btn-primary btn-sm font-light"
          type="submit"
        >
          بروزرسانی
        </button>
        <button
          disabled={isUpdatingPassword}
          className="btn btn-error btn-outline btn-sm font-light"
          type="reset"
          onClick={reset}
        >
          بیخیال
        </button>
      </div>
    </form>
  );
}
