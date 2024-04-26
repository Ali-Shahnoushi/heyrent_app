import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editCar as editCarAPI } from "../../services/apiCars";

export function useEditCar() {
  const queryClient = useQueryClient();

  const { mutate: editCar, isPending: isEditing } = useMutation({
    mutationFn: ({ newCarData, id }) => editCarAPI(newCarData, id),
    onSuccess: () => {
      toast.success("خودرو با موفقیت آپدیت شد");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isEditing, editCar };
}
