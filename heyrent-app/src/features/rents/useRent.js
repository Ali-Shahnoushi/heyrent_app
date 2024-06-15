import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRent } from "../../services/apiRents";

export function useRent() {
  const { rentId } = useParams();

  const {
    isLoading,
    data: rent,
    error,
  } = useQuery({
    queryKey: ["rents", rentId],
    queryFn: () => getRent(rentId),
    retry: false,
  });

  return { isLoading, error, rent };
}
