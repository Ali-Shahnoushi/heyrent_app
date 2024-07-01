import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateRent } from "../../services/apiRents";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (rentID) =>
      updateRent(rentID, {
        status: "checked",
      }),

    onSuccess: (data) => {
      toast.success(`اجاره #${data.id} با موفقیت تایید شد`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () =>
      toast.error("مشکلی در حین تایید اجاره بوجود آمد. لطفا مجدد تلاش کنید"),
  });

  return { checkout, isCheckingOut };
}
