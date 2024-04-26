import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar } from "../../services/apiCars";
export function useCar() {
  const { carID } = useParams();

  const {
    isLoading,
    data: car,
    error,
  } = useQuery({
    queryKey: ["cars", carID],
    queryFn: () => getCar(carID),
    retry: false,
  });

  return { isLoading, error, car };
}
