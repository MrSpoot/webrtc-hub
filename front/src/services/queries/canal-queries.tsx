import { useQuery } from "@tanstack/react-query";
import { getPrivateChannels, getPrivateMessages } from "../canal-service";

export const usePrivateCanal = () =>
  useQuery({
    queryKey: ["private-canal-list"],
    queryFn: () => getPrivateChannels(),
  });

export const usePrivateMessageList = (canalId: string) =>
  useQuery({
    queryKey: ["canal-messages", canalId],
    queryFn: () => getPrivateMessages(canalId),
  });
