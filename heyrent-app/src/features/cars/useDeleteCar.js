import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCar as deleteCarAPI } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCar } = useMutation({
    mutationFn: deleteCarAPI,
    onSuccess: () => {
      toast.success("خودرو مورد نظر حذف شد");
      // alert("Cabin successfuly deleted.");

      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: () => {
      toast.error("اشکالی در حذف خودرو پیش آمد. مجدد تلاش کنید");
    },
  });

  return { isDeleting, deleteCar };
}
