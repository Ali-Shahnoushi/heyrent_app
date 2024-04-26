import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
