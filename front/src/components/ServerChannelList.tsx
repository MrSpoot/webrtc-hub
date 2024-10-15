import { useServer } from "@/services/queries/server-queries";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PrivateCanalCard from "./PrivateCanalCard";
import { SpinningLoader } from "./spinning-loader";

export default function ServerChannelList() {
  const { data: servers, isLoading } = useServer();

  const { serverId, channelId } = useParams<{
    serverId: string;
    channelId: string;
  }>();

  const [server] = useState(servers?.find((s) => s.id === serverId));

  return isLoading || !server ? (
    <SpinningLoader />
  ) : (
    <div className="flex flex-col text-white p-2 gap-1 items-center">
      <div className="w-full flex flex-col gap-1 justify-center">
        {server.channels.map((c) => (
          <PrivateCanalCard key={c.id} canal={c} />
        ))}
      </div>
    </div>
  );
}
