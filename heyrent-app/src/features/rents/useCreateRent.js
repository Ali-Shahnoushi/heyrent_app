import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createRent as createRentAPI } from "../../services/apiRents";

export function useCreateRent() {
  const queryClient = useQueryClient();

  const { mutate: createRent, isPending: isCreating } = useMutation({
    mutationFn: createRentAPI,
    onSuccess: () => {
      toast.success("اجاره جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["rents"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createRent };
}
