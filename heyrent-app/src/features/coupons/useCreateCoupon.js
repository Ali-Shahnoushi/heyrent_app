import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCoupon as createCouponAPI } from "../../services/apiCoupons";
export function useCreateCoupon() {
  const queryClient = useQueryClient();

  const { mutate: createCoupon, isPending: isCreating } = useMutation({
    mutationFn: createCouponAPI,
    onSuccess: () => {
      toast.success("کوپن جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCoupon };
}
