import { useQuery } from "@tanstack/react-query";
import { getUserServers } from "../server-service";

export const useServer = () =>
  useQuery({
    queryKey: ["server-list"],
    queryFn: () => getUserServers(),
  });
