import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../services/apiCars";

export function useGetCars() {
  const {
    isLoading,
    data: cars,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  return { isLoading, error, cars };
}
