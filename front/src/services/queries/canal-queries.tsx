import { useQuery } from "@tanstack/react-query";
import { getPrivateCanals, getPrivateMessages } from "../canal-service";

export const usePrivateCanal = () =>
  useQuery({
    queryKey: ["private-canal-list"],
    queryFn: () => getPrivateCanals(),
  });

export const usePrivateMessageList = (canalId: string) =>
  useQuery({
    queryKey: ["canal", canalId],
    queryFn: () => getPrivateMessages(canalId),
  });
