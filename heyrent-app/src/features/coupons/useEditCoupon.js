import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editCoupon as editCouponAPI } from "../../services/apiCoupons";

export function useEditCoupon() {
  const queryClient = useQueryClient();

  const { mutate: editCoupon, isPending: isEditing } = useMutation({
    mutationFn: ({ newCouponData, id }) => editCouponAPI(newCouponData, id),
    onSuccess: () => {
      toast.success("کوپن با موفقیت آپدیت شد");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isEditing, editCoupon };
}
