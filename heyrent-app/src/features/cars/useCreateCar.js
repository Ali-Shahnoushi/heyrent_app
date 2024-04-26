import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCar as createCarAPI } from "../../services/apiCars";

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCar, isPending: isCreating } = useMutation({
    mutationFn: createCarAPI,
    onSuccess: () => {
      toast.success("ماشین جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCar };
}
