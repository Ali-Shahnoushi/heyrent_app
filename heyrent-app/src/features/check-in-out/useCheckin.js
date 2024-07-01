import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateRent } from "../../services/apiRents";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (rentID) =>
      updateRent(rentID, {
        status: "paid",
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`اجاره#${data.id} با موفقیت پرداخت شد`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error("مشکلی در حین پرداخت اجاره بوجود آمد. لطفا مجدد تلاش کنید"),
        console.log(err);
    },
  });

  return { checkin, isCheckingIn };
}
