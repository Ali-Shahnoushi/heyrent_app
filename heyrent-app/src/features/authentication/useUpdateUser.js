import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success("کاربر با موفقیت بروزرسانی شد");
      queryClient.setQueryData("user", data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      if (
        err.message ===
        "New password should be different from the old password."
      ) {
        toast.error("رمزعبور جدید باید متفاوت باشد");
      } else {
        toast.error("بروزرسانی کاربر با خطا مواجه شد");
      }
    },
  });

  return { updateUser, isUpdatingUser };
}
