import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useServer } from "@/services/queries/server-queries";
import { Settings } from "lucide-react";
import { useState } from "react";

interface ChannelListHeaderProps {
  serverId: string;
}

export default function ChannelListHeader({
  serverId,
}: ChannelListHeaderProps) {
  const { data: servers } = useServer();

  const [server] = useState(servers?.find((s) => s.id === serverId));

  return (
    <div className="flex w-full p-5 border-b border-muted-foreground">
      {server && (
        <div className="flex justify-between items-center h-full w-full">
          <div className="flex gap-2 h-full flex-1 font-semibold">
            <Avatar className="h-full aspect-square">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{server.name}</AvatarFallback>
            </Avatar>
            <div>{server.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
