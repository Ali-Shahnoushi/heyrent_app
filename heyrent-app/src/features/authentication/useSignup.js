import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "کاربر با موفقیت ساخته شد. برای تایید ایمیل خود را بررسی کنید "
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isSigningUp };
}
