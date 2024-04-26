import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      queryClient.removeQueries();
      navigate("/dashboard", { replace: true });
      toast.success("ورود با موفقیت انجام شد");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
}
