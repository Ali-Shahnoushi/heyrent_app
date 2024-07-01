import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRentsAfterDate } from "../../services/apiRents";

export function useRecentRents() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: rents } = useQuery({
    queryFn: () => getRentsAfterDate(queryDate),
    queryKey: ["rents", `last-${numDays}`],
  });

  return { isLoading, rents };
}
