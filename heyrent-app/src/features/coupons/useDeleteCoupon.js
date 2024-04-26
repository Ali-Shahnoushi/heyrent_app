import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCoupon as deleteCouponAPI } from "../../services/apiCoupons";
import toast from "react-hot-toast";

export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCoupon } = useMutation({
    mutationFn: deleteCouponAPI,
    onSuccess: () => {
      toast.success("کوپن مورد نظر حذف شد");
      // alert("Cabin successfuly deleted.");

      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
    onError: () => {
      toast.error("اشکالی در حذف کوپن پیش آمد. مجدد تلاش کنید");
    },
  });

  return { isDeleting, deleteCoupon };
}
