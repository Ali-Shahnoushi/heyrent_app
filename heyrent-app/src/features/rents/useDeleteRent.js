import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRent as deleteRentAPI } from "../../services/apiRents";

export function useDeleteRent() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteRent } = useMutation({
    mutationFn: deleteRentAPI,
    onSuccess: () => {
      toast.success("اجاره مورد نظر حذف شد");
      // alert("Cabin successfuly deleted.");

      queryClient.invalidateQueries({
        queryKey: ["rents"],
      });
    },
    onError: () => {
      toast.error("اشکالی در حذف اجاره پیش آمد. مجدد تلاش کنید");
    },
  });

  return { isDeleting, deleteRent };
}
