import { useQuery } from "@tanstack/react-query";
import { getAllRents } from "../../services/apiRents";

export function useGetRents() {
  const {
    isLoading,
    data: rents,
    error,
  } = useQuery({
    queryKey: ["rents"],
    queryFn: getAllRents,
  });

  return { isLoading, error, rents };
}
