import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiRents";

export function useTodayActivity() {
  const { data: stays, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  console.log(stays);

  return { stays, isLoading };
}
