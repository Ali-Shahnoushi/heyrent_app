import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "../../services/apiCoupons";

export function useGetCoupons() {
  const {
    isLoading,
    data: coupons,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
  });

  return { isLoading, error, coupons };
}
