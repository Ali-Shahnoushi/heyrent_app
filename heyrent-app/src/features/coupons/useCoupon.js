// import { useQuery } from "@tanstack/react-query";
// import { useCoupon as useCouponAPI } from "../../services/apiCoupons";

// export function useCoupon() {
//   const { isLoading, data, error } = useQuery({
//     queryKey: ["coupon"],
//     queryFn: useCouponAPI,
//   });

//   return { isLoading, error, data };
// }
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCoupon as useCouponAPI } from "../../services/apiCoupons";

export default function useCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCouponAPI,
    onSuccess: () => {
      toast.success("تخفیف با موفقیت اعمال شد");
      queryClient.invalidateQueries({ queryKey: ["coupon"] });
    },
    onError: () =>
      toast.error("اشکالی در استفاده از کدتخفیف بوجود آمد. مجدد تلاش کنید"),
  });

  //   return { isloading, mutate };
}
