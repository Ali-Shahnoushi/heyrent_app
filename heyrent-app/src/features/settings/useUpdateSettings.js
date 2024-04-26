import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editSettings as updateSettingsAPI } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingsAPI,
    onSuccess: () => {
      toast.success("تنظیمات با موفقیت بروزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => toast.error("اشکالی در بروزرسانی بوجود آمد. مجدد تلاش کنید"),
  });

  return { isUpdating, updateSettings };
}
