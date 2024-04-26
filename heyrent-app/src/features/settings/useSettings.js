import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
